const express = require('express');
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const adminAuth = require('../middleware/adminAuth');
const activityLogger = require('../middleware/activityLogger');

const router = express.Router();

// List all users
router.get('/users', adminAuth, async (req, res) => {
  const users = await User.find({}, '-password -verificationToken -resetToken');
  res.json({ users });
});

// Get user details
router.get('/users/:id', adminAuth, async (req, res) => {
  const user = await User.findOne({ id: req.params.id }, '-password -verificationToken -resetToken');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user });
});

// Update user
router.put('/users/:id', adminAuth, activityLogger('admin_update_user'), async (req, res) => {
  const user = await User.findOneAndUpdate({ id: req.params.id }, req.body, { new: true, fields: '-password -verificationToken -resetToken' });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user });
});

// Delete user
router.delete('/users/:id', adminAuth, activityLogger('admin_delete_user'), async (req, res) => {
  const user = await User.findOneAndDelete({ id: req.params.id });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ message: 'User deleted' });
});

// List activity logs
router.get('/activity-logs', adminAuth, async (req, res) => {
  const logs = await ActivityLog.find().sort({ timestamp: -1 }).limit(100);
  res.json({ logs });
});

// Analytics
router.get('/analytics', adminAuth, async (req, res) => {
  const totalUsers = await User.countDocuments();
  const activeUsers = await ActivityLog.distinct('userId', { action: 'login' }).then(arr => arr.length);
  res.json({ totalUsers, activeUsers });
});

module.exports = router; 