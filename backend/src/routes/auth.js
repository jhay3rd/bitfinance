const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const validator = require('validator');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) return res.status(400).json({ error: 'All fields required' });
    if (!validator.isEmail(email)) return res.status(400).json({ error: 'Invalid email' });
    if (password.length < 6) return res.status(400).json({ error: 'Password too short' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email already registered' });
    const hash = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = await User.create({ fullName, email, password: hash, verificationToken });
    // Send verification email
    const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
    await sendEmail(email, 'Verify your email', `Click to verify: ${verifyUrl}`);
    res.status(201).json({ message: 'Registration successful, check your email to verify.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    if (!user.verified) return res.status(403).json({ error: 'Email not verified' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, fullName: user.fullName, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Verify Email
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;
    const user = await User.findOne({ verificationToken: token });
    if (!user) return res.status(400).json({ error: 'Invalid or expired token' });
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.json({ message: 'Email verified. You can now log in.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: 'If that email is registered, a reset link will be sent.' });
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    await user.save();
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    await sendEmail(email, 'Reset your password', `Click to reset: ${resetUrl}`);
    res.json({ message: 'If that email is registered, a reset link will be sent.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ error: 'All fields required' });
    const user = await User.findOne({ resetToken: token });
    if (!user) return res.status(400).json({ error: 'Invalid or expired token' });
    user.password = await bcrypt.hash(password, 12);
    user.resetToken = undefined;
    await user.save();
    res.json({ message: 'Password reset successful. You can now log in.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 