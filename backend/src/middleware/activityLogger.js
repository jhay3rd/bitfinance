const ActivityLog = require('../models/ActivityLog');

function activityLogger(action, details = {}) {
  return async (req, res, next) => {
    const userId = req.user?.id || 'anonymous';
    await ActivityLog.create({ userId, action, details });
    next();
  };
}

module.exports = activityLogger; 