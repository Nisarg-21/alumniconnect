const express = require('express');
const { db }  = require('../db/connection');
const router  = express.Router();

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL        = 'llama-3.3-70b-versatile'; // free on Groq, very capable

// ── Helper: pull relevant alumni from DB based on user message ──
function getRelevantAlumni(userMessage) {
  const msg = userMessage.toLowerCase();

  // Extract keywords to search for
  const keywords = msg
    .replace(/[^a-z0-9 ]/g, ' ')
    .split(' ')
    .filter(w => w.length > 3)
    .filter(w => !['what', 'where', 'when', 'who', 'how', 'want', 'need', 'like', 'help', 'tell', 'find', 'looking', 'interested', 'should', 'would', 'could', 'please', 'about', 'with', 'that', 'this', 'they', 'them', 'have', 'from', 'into', 'will'].includes(w));

  // Try DB search across company, job_role, branch, location
  let alumni = [];

  if (keywords.length > 0) {
    const likeConditions = keywords.map(() =>
      `(LOWER(company) LIKE ? OR LOWER(job_role) LIKE ? OR LOWER(branch) LIKE ? OR LOWER(location) LIKE ?)`
    ).join(' OR ');

    const params = keywords.flatMap(k => [`%${k}%`, `%${k}%`, `%${k}%`, `%${k}%`]);

    try {
      alumni = db.prepare(`
        SELECT name, job_role, company, location, branch, batch, experience_years, is_mentor, num_connections
        FROM Alumni_Student
        WHERE ${likeConditions}
        ORDER BY is_mentor DESC, num_connections DESC
        LIMIT 6
      `).all(...params);
    } catch (e) {
      console.error('DB context query failed:', e.message);
    }
  }

  // Fallback: just return top mentors if no keyword match
  if (alumni.length === 0) {
    alumni = db.prepare(`
      SELECT name, job_role, company, location, branch, batch, experience_years, is_mentor, num_connections
      FROM Alumni_Student
      ORDER BY is_mentor DESC, num_connections DESC
      LIMIT 6
    `).all();
  }

  return alumni;
}

// ── Format alumni list for the system prompt ──
function formatAlumniContext(alumni) {
  if (!alumni.length) return 'No alumni data available.';
  return alumni.map(a =>
    `• ${a.name} — ${a.job_role} at ${a.company}, ${a.location} | Branch: ${a.branch}, Batch: ${a.batch} | ${a.experience_years} yrs exp${a.is_mentor ? ' | Available as mentor ✓' : ''}`
  ).join('\n');
}

/**
 * POST /api/chat
 * Body: { messages: [{ role: 'user'|'assistant', content: string }] }
 *
 * Streams are not used here for simplicity — returns full response.
 */
router.post('/', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GROQ_API_KEY not set in .env' });
    }

    // Get the latest user message to build DB context
    const latestUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content || '';
    const relevantAlumni = getRelevantAlumni(latestUserMsg);
    const alumniContext  = formatAlumniContext(relevantAlumni);

    // System prompt — gives the AI its personality + injects live DB data
    const systemPrompt = `You are AlumniConnect AI, a helpful career advisor for a university alumni networking platform.

You have access to the following alumni profiles from the database that are relevant to this conversation:

${alumniContext}

Your job:
1. Help students and alumni with career advice, interview prep, job hunting, skill development, and networking.
2. When recommending alumni to connect with, reference the real profiles above by name.
3. Be warm, encouraging, and specific. Avoid vague advice.
4. Keep responses concise — 3 to 5 sentences max unless the user asks for detail.
5. If asked about alumni not in the list above, say you can search the directory for more profiles.
6. Never make up alumni profiles or companies that aren't in the data provided.`;

    // Call Groq
    const groqRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        model:       MODEL,
        messages:    [{ role: 'system', content: systemPrompt }, ...messages],
        temperature: 0.7,
        max_tokens:  512,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error('Groq API error:', errText);
      return res.status(502).json({ error: 'AI service error', detail: errText });
    }

    const groqData = await groqRes.json();
    const reply    = groqData.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

    res.json({
      reply,
      // Send back which alumni were injected as context (useful for frontend "Recommended" panel)
      context_alumni: relevantAlumni.map(a => ({
        name:    a.name,
        role:    a.job_role,
        company: a.company,
        mentor:  !!a.is_mentor,
      })),
    });

  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Chat failed', detail: err.message });
  }
});

module.exports = router;
