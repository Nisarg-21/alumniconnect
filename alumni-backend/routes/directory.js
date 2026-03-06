const express    = require('express');
const { db }     = require('../db/connection');
const router     = express.Router();

/**
 * GET /api/directory
 *
 * Query params:
 *   sort_by  – "branch" | "batch" | "job_type" (default "batch")
 *   page     – page number (default 1)
 *   limit    – results per page (default 20)
 */
router.get('/', (req, res) => {
  try {
    const { sort_by = 'batch', page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const orderMap = {
      branch:   'a.branch ASC, a.batch DESC',
      batch:    'a.batch DESC, a.name ASC',
      job_type: 'a.job_role ASC, a.name ASC',
    };
    const orderBy = orderMap[sort_by] || orderMap.batch;

    const totalRow = db.prepare('SELECT COUNT(*) as total FROM Alumni_Student').get();

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
        a.avatar_color
      FROM Alumni_Student a
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?
    `).all(parseInt(limit), offset);

    // Branch counts for the top summary row
    const branchCounts = db.prepare(`
      SELECT branch, COUNT(*) as count
      FROM Alumni_Student
      WHERE branch IS NOT NULL
      GROUP BY branch
      ORDER BY count DESC
    `).all();

    const withExtras = rows.map(r => ({
      ...r,
      av:  r.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
      exp: `${r.experience_years} yr${r.experience_years !== 1 ? 's' : ''}`,
    }));

    res.json({
      data:        withExtras,
      total:       totalRow.total,
      page:        parseInt(page),
      limit:       parseInt(limit),
      totalPages:  Math.ceil(totalRow.total / parseInt(limit)),
      branchCounts,
    });

  } catch (err) {
    console.error('Directory error:', err);
    res.status(500).json({ error: 'Failed to fetch directory' });
  }
});

module.exports = router;
