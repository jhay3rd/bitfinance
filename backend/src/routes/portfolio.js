const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to check JWT
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'No token' });
  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Get portfolio (placeholder)
router.get('/', auth, (req, res) => {
  // TODO: Replace with real DB logic
  res.json({ userId: req.user.id, assets: [], totalValue: 0 });
});

// Update portfolio (placeholder)
router.post('/', auth, (req, res) => {
  // TODO: Replace with real DB logic
  res.json({ message: 'Portfolio updated (not really, this is a placeholder)' });
});

module.exports = router; 