const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const activityLogSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },
  userId: { type: String, required: true },
  action: { type: String, required: true },
  details: { type: Object },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ActivityLog', activityLogSchema); 