const express    = require('express');
const crypto     = require('crypto');
const { db }     = require('../db/connection');
const router     = express.Router();

/**
 * POST /api/auth/login
 * Body: { email, password }
 *
 * Uses SHA-256 as documented in the DB README.
 */
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Hash the incoming password with SHA-256 (matches DB hashing method)
    const hash = crypto.createHash('sha256').update(password).digest('hex');

    const loginRow = db.prepare('SELECT * FROM Login WHERE email = ?').get(email);

    if (!loginRow || loginRow.password_hash !== hash) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Fetch the user's profile based on role
    let profile = null;
    if (loginRow.role === 'Student' || loginRow.role === 'Alumni') {
      profile = db.prepare('SELECT * FROM Alumni_Student WHERE rollno = ?').get(loginRow.id);
    } else if (loginRow.role === 'Faculty') {
      profile = db.prepare('SELECT * FROM Faculty WHERE id = ?').get(loginRow.id);
    }

    res.json({
      success: true,
      user: {
        id:    loginRow.id,
        email: loginRow.email,
        role:  loginRow.role,
        name:  profile?.name || 'User',
        ...(profile || {}),
        // Never send the hash back
        password_hash: undefined,
      },
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
