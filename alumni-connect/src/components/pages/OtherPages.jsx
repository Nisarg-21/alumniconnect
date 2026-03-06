// Success Stories
import { stories } from '../../data';

export function Stories({ onOpenModal }) {
  return (
    <div className="page page-enter">
      <div className="sh"><div><div className="sht">Success Stories</div><div className="shs">Celebrating achievements of our alumni</div></div></div>
      <div className="g2" style={{ marginBottom: 20 }}>
        {stories.map(x => (
          <div key={x.n} className="stc">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13, flexWrap: 'wrap' }}>
              <div className="av" style={{ width: 38, height: 38, background: 'var(--forest)' }}>{x.n.split(' ').map(c => c[0]).join('')}</div>
              <div>
                <div style={{ fontWeight: 700 }}>{x.n}</div>
                <div style={{ color: 'var(--muted)', fontSize: '.73rem' }}>{x.r} · Batch {x.b}</div>
              </div>
              <span className="chip cs" style={{ marginLeft: 'auto' }}>🏆 {x.ach}</span>
            </div>
            <div className="stq">"{x.q}"</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ textAlign: 'center', padding: 34 }}>
        <div style={{ fontSize: '2.2rem', marginBottom: 12 }}>🏆</div>
        <div style={{ fontFamily: "'Fraunces',serif", fontSize: '1.3rem', color: 'var(--forest)', marginBottom: 6 }}>Share Your Success</div>
        <p style={{ color: 'var(--muted)', fontSize: '.84rem', maxWidth: 360, margin: '0 auto 16px' }}>Inspire current students by sharing your journey</p>
        <button className="btn bt" onClick={() => onOpenModal('story')}>Share Your Story</button>
      </div>
    </div>
  );
}

// Gallery
export function Gallery() {
  const items = [
    { cls: 'gc1', e: '🎓' }, { cls: 'gc2', e: '🎉' }, { cls: 'gc3', e: '🤝' },
    { cls: 'gc4', e: '🏆' }, { cls: 'gc5', e: '💡' }, { cls: 'gc6', e: '🎤' }, { cls: 'gc7', e: '📸' },
  ];
  return (
    <div className="page page-enter">
      <div className="sh">
        <div><div className="sht">Event Gallery</div><div className="shs">Memories from alumni events and reunions</div></div>
        <button className="btn bt">+ Upload Photos</button>
      </div>
      <div className="filters">
        <select className="fs"><option>All Events</option><option>Annual Meet 2024</option><option>Tech Fest 2024</option><option>Sports Day</option></select>
        <select className="fs"><option>All Years</option><option>2025</option><option>2024</option><option>2023</option></select>
      </div>
      <div className="ggrid">
        {items.map((item, i) => (
          <div key={i} className={`gi ${item.cls}`}>
            <div className="gph">{item.e}</div>
            <div className="gov">🔍 View</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Fundraising
import { funds } from '../../data';
function fmt(n) { return n >= 100000 ? '₹' + Math.round(n / 100000) + 'L' : '₹' + Math.round(n / 1000) + 'K'; }

export function Fundraising() {
  return (
    <div className="page page-enter">
      <div className="sh"><div><div className="sht">Fundraising</div><div className="shs">Support scholarships, infrastructure and programs</div></div></div>
      <div className="g4" style={{ marginBottom: 20 }}>
        {[['₹24L','Total Raised'],['842','Donors'],['12','Campaigns'],['48','Scholarships']].map(([n,l]) => (
          <div key={l} className="card sc"><div className="sn">{n}</div><div className="sl">{l}</div></div>
        ))}
      </div>
      <div className="g2">
        {funds.map(x => {
          const p = Math.round(x.raised / x.goal * 100);
          return (
            <div key={x.t} className="fdc">
              <div className="fdh">
                <div style={{ fontWeight: 700 }}>{x.t}</div>
                <div style={{ color: 'var(--muted)', fontSize: '.74rem', marginTop: 3 }}>{x.d}</div>
              </div>
              <div className="fdb">
                <div className="fdr">{fmt(x.raised)}</div>
                <div style={{ color: 'var(--muted)', fontSize: '.74rem', margin: '3px 0 7px' }}>raised of {fmt(x.goal)} goal</div>
                <div className="pbar"><div className="pfill" style={{ width: p + '%' }} /></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.7rem', color: 'var(--muted)', margin: '7px 0 13px' }}>
                  <span>👥 {x.donors} donors</span><span>{p}% funded</span><span>⏰ {x.days} days left</span>
                </div>
                <button className="btn bt" style={{ width: '100%' }} onClick={() => alert('Thank you! Payment integration coming soon.')}>❤️ Donate Now</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── AI Recommender (wired to Groq via backend) ──
import { useState, useRef, useEffect } from 'react';
import { chatApi } from '../../api';

export function AIRecommender() {
  const [messages, setMessages]           = useState([]);  // { role, content }
  const [displayMsgs, setDisplayMsgs]     = useState([
    { role: 'assistant', content: "Hello! I'm your AlumniConnect AI advisor. Tell me your career goals and I'll recommend the best alumni mentors from our network for you. 🎓" }
  ]);
  const [input, setInput]                 = useState('');
  const [loading, setLoading]             = useState(false);
  const [contextAlumni, setContextAlumni] = useState([]);
  const [error, setError]                 = useState(null);
  const boxRef                            = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [displayMsgs, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };

    // Optimistically show user message
    setDisplayMsgs(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setError(null);

    // Build full message history for API
    const newHistory = [...messages, userMsg];

    try {
      const res = await chatApi.send(newHistory);

      const assistantMsg = { role: 'assistant', content: res.reply };
      setMessages([...newHistory, assistantMsg]);
      setDisplayMsgs(prev => [...prev, assistantMsg]);
      if (res.context_alumni?.length) setContextAlumni(res.context_alumni);
    } catch (err) {
      setError(err.message);
      setDisplayMsgs(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ Could not reach the AI. Make sure the backend is running and your GROQ_API_KEY is set in .env'
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page page-enter">
      <div className="sh">
        <div><div className="sht">AI Alumni Recommender</div><div className="shs">Powered by Groq · Llama 3.3 70B</div></div>
      </div>
      <div className="g2">
        {/* Chat panel */}
        <div className="card">
          <div style={{ fontWeight: 700, color: 'var(--forest)', marginBottom: 13, display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ fontSize: '1.3rem' }}>🤖</span> Chat with AI Advisor
            <span style={{ marginLeft: 'auto', fontSize: '.65rem', color: 'var(--muted)', fontWeight: 400, background: 'var(--bg2)', padding: '3px 8px', borderRadius: 99 }}>Groq · Free</span>
          </div>

          {/* Messages */}
          <div className="aimsg" ref={boxRef}>
            {displayMsgs.map((m, i) => (
              <div key={i} className={`msg ${m.role === 'assistant' ? 'mai' : 'mur'}`}
                dangerouslySetInnerHTML={{ __html: m.content.replace(/\n/g, '<br>').replace(/•/g, '&bull;') }}
              />
            ))}
            {loading && (
              <div className="typing-dots"><span /><span /><span /></div>
            )}
          </div>

          {/* Input */}
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              className="fi"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="e.g. I want to get into AI/ML at Google…"
              disabled={loading}
            />
            <button className="btn bt" onClick={sendMessage} disabled={loading}>
              {loading ? '…' : 'Send'}
            </button>
          </div>

          {/* Quick prompts */}
          <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['I want to work at Google', 'How do I become a PM?', 'Tips for FAANG interviews', 'I want to start a startup'].map(prompt => (
              <button key={prompt} className="btn bo bsm" style={{ fontSize: '.68rem' }}
                onClick={() => { setInput(prompt); }}>
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Recommended alumni panel */}
        <div className="card">
          <div style={{ fontWeight: 700, color: 'var(--forest)', marginBottom: 13 }}>✨ Recommended Alumni</div>

          {contextAlumni.length === 0 ? (
            <div>
              <p style={{ color: 'var(--muted)', fontSize: '.82rem', marginBottom: 14 }}>
                Chat to get personalized recommendations based on your goals.
              </p>
              <div style={{ padding: 13, background: 'var(--bg2)', borderRadius: 9, border: '1.5px solid var(--border)' }}>
                <div style={{ fontSize: '.68rem', color: 'var(--muted)', fontWeight: 600, marginBottom: 9, textTransform: 'uppercase', letterSpacing: '.5px' }}>How it works</div>
                <div style={{ fontSize: '.78rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                  1. Tell the AI your career goals<br />
                  2. It searches the alumni database<br />
                  3. Recommends the best matches<br />
                  4. You connect and request mentorship
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: '.72rem', color: 'var(--muted)', marginBottom: 2 }}>Based on your conversation:</div>
              {contextAlumni.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 13px', background: 'var(--bg2)', borderRadius: 10, border: '1.5px solid var(--border)' }}>
                  <div className="av" style={{ width: 36, height: 36, fontSize: '.72rem', background: 'var(--forest)', flexShrink: 0 }}>
                    {a.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '.84rem' }}>{a.name}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '.71rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.role} · {a.company}</div>
                  </div>
                  {a.mentor && <span className="chip cs" style={{ flexShrink: 0 }}>Mentor</span>}
                </div>
              ))}
              <button className="btn bt bsm" style={{ width: '100%', marginTop: 4 }}
                onClick={() => alert('Navigate to Search Alumni to connect!')}>
                🔍 View Full Profiles
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Admin Panel
import { approvals as initialApprovals } from '../../data';

export function Admin() {
  const [pendingApprovals, setPendingApprovals] = useState(initialApprovals);

  function handleApproval(index) {
    setPendingApprovals(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="page page-enter">
      <div className="sh"><div><div className="sht">Admin Panel</div><div className="shs">Platform management and analytics</div></div></div>
      <div className="g4" style={{ marginBottom: 20 }}>
        {[['👥','4,821','Total Users',undefined],['⏳', pendingApprovals.length,'Pending Approvals','rgba(159,103,255,.11)'],['📅','18','Events This Month','rgba(245,158,11,.11)'],['⚠️','4','Reported Content','rgba(180,60,60,.09)']].map(([ic, n, l, bg]) => (
          <div key={l} className="adst">
            <div className="adi" style={{ background: bg }}>{ic}</div>
            <div><div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{n}</div><div style={{ color: 'var(--muted)', fontSize: '.72rem' }}>{l}</div></div>
          </div>
        ))}
      </div>
      <div className="g2" style={{ marginBottom: 18 }}>
        <div className="card">
          <div style={{ fontWeight: 700, color: 'var(--forest)', marginBottom: 13 }}>Pending Approvals</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {pendingApprovals.length === 0 && (
              <div style={{ color: 'var(--muted)', fontSize: '.82rem', textAlign: 'center', padding: '16px 0' }}>✅ All caught up! No pending approvals.</div>
            )}
            {pendingApprovals.map((x, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: 9, background: 'var(--bg2)', borderRadius: 8 }}>
                <div className="av" style={{ width: 28, height: 28, fontSize: '.68rem', background: 'var(--forest)' }}>{x.av}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '.82rem' }}>{x.n}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '.7rem' }}>{x.s}</div>
                </div>
                <button className="btn bsa bsm" onClick={() => handleApproval(i)}>✓</button>
                <button className="btn bo bsm" style={{ color: '#c44', borderColor: '#c44' }} onClick={() => handleApproval(i)}>✕</button>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, color: 'var(--forest)', marginBottom: 13 }}>Quick Admin Actions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {['📧 Send Newsletter to All Alumni','📊 Export Alumni Data (CSV)','🗃️ Manage Branches & Batches','🔒 User Permissions & Roles','⚙️ Platform Settings'].map(a => (
              <button key={a} className="btn bo" style={{ justifyContent: 'flex-start', padding: '10px 13px', width: '100%' }}>{a}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--forest)', borderBottom: '1px solid var(--border)' }}>User Management</div>
        <table>
          <thead><tr><th>User</th><th>Role</th><th>Joined</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {[['Priya Sharma','Alumni','ct','Jan 2025'],['Rahul Kumar','Alumni','ct','Dec 2024'],['Arjun Patel','Student','cf','Feb 2025'],['Dr. Meena Rao','Faculty','cw','Aug 2024']].map(([n, r, rc, d]) => (
              <tr key={n}>
                <td style={{ fontWeight: 600 }}>{n}</td>
                <td><span className={`chip ${rc}`}>{r}</span></td>
                <td>{d}</td>
                <td><span className="chip cs">Active</span></td>
                <td><button className="btn bo bsm">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
