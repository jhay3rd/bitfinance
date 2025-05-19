const express = require('express');
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const adminAuth = require('../middleware/adminAuth');
const activityLogger = require('../middleware/activityLogger');
const SupportMessage = require('../models/SupportMessage');
const Transaction = require('../models/Transaction');

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

// Get user's investment balance
router.get('/users/:id/investment-balance', adminAuth, async (req, res) => {
  const user = await User.findOne({ id: req.params.id }, 'investmentBalance');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ investmentBalance: user.investmentBalance });
});

// Update user's investment balance
router.put('/users/:id/investment-balance', adminAuth, activityLogger('admin_update_investment_balance'), async (req, res) => {
  const { investmentBalance } = req.body;
  if (typeof investmentBalance !== 'number') {
    return res.status(400).json({ error: 'investmentBalance must be a number' });
  }
  const user = await User.findOneAndUpdate(
    { id: req.params.id },
    { investmentBalance },
    { new: true, fields: 'investmentBalance' }
  );
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ investmentBalance: user.investmentBalance });
});

// List support messages
router.get('/support-messages', adminAuth, async (req, res) => {
  const messages = await SupportMessage.find().sort({ createdAt: -1 });
  res.json({ messages });
});

// Respond to a support message
router.put('/support-messages/:id/respond', adminAuth, async (req, res) => {
  const { response } = req.body;
  const message = await SupportMessage.findOneAndUpdate(
    { id: req.params.id },
    { response, status: 'responded' },
    { new: true }
  );
  if (!message) return res.status(404).json({ error: 'Message not found' });
  res.json({ message });
});

// Close a support message
router.put('/support-messages/:id/close', adminAuth, async (req, res) => {
  const message = await SupportMessage.findOneAndUpdate(
    { id: req.params.id },
    { status: 'closed' },
    { new: true }
  );
  if (!message) return res.status(404).json({ error: 'Message not found' });
  res.json({ message });
});

// List transactions
router.get('/transactions', adminAuth, async (req, res) => {
  const transactions = await Transaction.find().sort({ createdAt: -1 });
  res.json({ transactions });
});

// Update transaction status (approve/deny/pending)
router.put('/transactions/:id/status', adminAuth, async (req, res) => {
  const { status } = req.body;
  if (!['pending', 'approved', 'denied'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  const transaction = await Transaction.findOneAndUpdate(
    { id: req.params.id },
    { status },
    { new: true }
  );
  if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
  res.json({ transaction });
});

// User-facing: Send support message
router.post('/support-messages', async (req, res) => {
  const { userId, email, message } = req.body;
  if (!message || (!userId && !email)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const msg = await SupportMessage.create({ userId, email, message });
  res.status(201).json({ message: 'Support message sent', msg });
});

// User-facing: Create transaction
router.post('/transactions', async (req, res) => {
  const { userId, amount, type } = req.body;
  if (!userId || !amount || !type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const tx = await Transaction.create({ userId, amount, type });
  res.status(201).json({ message: 'Transaction created', tx });
});

module.exports = router; 