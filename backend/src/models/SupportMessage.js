const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const supportMessageSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },
  userId: { type: String },
  email: { type: String },
  message: { type: String, required: true },
  response: { type: String },
  status: { type: String, enum: ['open', 'responded', 'closed'], default: 'open' },
}, { timestamps: true });

module.exports = mongoose.model('SupportMessage', supportMessageSchema); 