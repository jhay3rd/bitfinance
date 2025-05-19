const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const transactionSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true }, // e.g., 'deposit', 'withdrawal'
  status: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema); 