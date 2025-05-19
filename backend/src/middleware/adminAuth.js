const ADMIN_EMAIL = 'jhason3rd@gmail.com';
const ADMIN_PASSWORD = '88888888.Jay';

// Simple session-based admin auth middleware
module.exports = function adminAuth(req, res, next) {
  // For demonstration, check for basic auth header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ message: 'Unauthorized: No credentials provided' });
  }

  // Decode base64 credentials
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [email, password] = credentials.split(':');

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    req.admin = { email };
    return next();
  }

  return res.status(401).json({ message: 'Unauthorized: Invalid credentials' });
} 