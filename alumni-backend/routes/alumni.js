const express    = require('express');
const { db }     = require('../db/connection');
const router     = express.Router();


router.get('/search', (req, res) => {
  try {
    const {
      q          = '',
      branch     = '',
      batch      = '',
      location   = '',
      job_type   = '',
      company    = '',
      experience = '',
      page       = 1,
      limit      = 12,
    } = req.query;

    const conditions = [];
    const params     = [];

    if (q.trim()) {
      conditions.push('(LOWER(a.name) LIKE ? OR LOWER(a.company) LIKE ? OR LOWER(a.job_role) LIKE ?)');
      const like = `%${q.trim().toLowerCase()}%`;
      params.push(like, like, like);
    }

    if (branch && branch !== 'All Branches') {
      conditions.push('a.branch = ?');
      params.push(branch);
    }

    if (batch && batch !== 'All Batches') {
      conditions.push('a.batch = ?');
      params.push(parseInt(batch));
    }

    if (location && location !== 'All Locations') {
      conditions.push('a.location = ?');
      params.push(location);
    }

    if (job_type && job_type !== 'Job Type') {
      conditions.push('LOWER(a.job_role) LIKE ?');
      params.push(`%${job_type.toLowerCase()}%`);
    }

    if (company && company !== 'Company') {
      conditions.push('LOWER(a.company) LIKE ?');
      params.push(`%${company.toLowerCase()}%`);
    }

    
    if (experience && experience !== 'Experience') {
      if (experience === '0-2')  { conditions.push('a.experience_years BETWEEN 0 AND 2'); }
      if (experience === '3-5')  { conditions.push('a.experience_years BETWEEN 3 AND 5'); }
      if (experience === '5-10') { conditions.push('a.experience_years BETWEEN 5 AND 10'); }
      if (experience === '10+')  { conditions.push('a.experience_years > 10'); }
    }

    const where  = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const offset = (parseInt(page) - 1) * parseInt(limit);

    
    const totalRow = db.prepare(`
      SELECT COUNT(*) as total
      FROM Alumni_Student a
      ${where}
    `).get(...params);

    const rows = db.prepare(`
      SELECT
        a.rollno,
        a.name,
        a.email,
        a.branch,
        a.batch,
        a.company,
        a.location,
        a.job_role,
        a.experience_years,
        a.num_connections,
        a.is_mentor,
        a.is_hiring,
        a.avatar_color
      FROM Alumni_Student a
      ${where}
      ORDER BY a.num_connections DESC, a.name ASC
      LIMIT ? OFFSET ?
    `).all(...params, parseInt(limit), offset);

    const withChips = rows.map(r => ({
      ...r,
      chips: [
        r.is_mentor  ? 'Mentor'          : null,
        r.is_hiring  ? 'Hiring'          : null,
        r.num_connections > 3 ? 'Open to connect' : null,
      ].filter(Boolean),
      av: r.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
      exp: `${r.experience_years} yr${r.experience_years !== 1 ? 's' : ''}`,
    }));

    res.json({
      data:       withChips,
      total:      totalRow.total,
      page:       parseInt(page),
      limit:      parseInt(limit),
      totalPages: Math.ceil(totalRow.total / parseInt(limit)),
    });

  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed' });
  }
});


router.get('/filters', (_req, res) => {
  try {
    const branches   = db.prepare('SELECT DISTINCT branch   FROM Alumni_Student WHERE branch   IS NOT NULL ORDER BY branch').all().map(r => r.branch);
    const batches    = db.prepare('SELECT DISTINCT batch    FROM Alumni_Student WHERE batch    IS NOT NULL ORDER BY batch DESC').all().map(r => r.batch);
    const locations  = db.prepare('SELECT DISTINCT location FROM Alumni_Student WHERE location IS NOT NULL ORDER BY location').all().map(r => r.location);
    const companies  = db.prepare('SELECT DISTINCT company  FROM Alumni_Student WHERE company  IS NOT NULL ORDER BY company').all().map(r => r.company);
    const job_types  = db.prepare('SELECT DISTINCT job_role FROM Alumni_Student WHERE job_role IS NOT NULL ORDER BY job_role').all().map(r => r.job_role);

    res.json({ branches, batches, locations, companies, job_types });
  } catch (err) {
    console.error('Filters error:', err);
    res.status(500).json({ error: 'Failed to fetch filter options' });
  }
});


router.get('/:rollno', (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM Alumni_Student WHERE rollno = ?').get(req.params.rollno);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

module.exports = router;
