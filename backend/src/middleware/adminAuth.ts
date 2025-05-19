
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

// Get admin credentials from environment variables or use default for development only
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Simple session-based admin auth middleware
export default function adminAuth(req: Request, res: Response, next: NextFunction) {
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
    (req as any).admin = { email };
    return next();
  }

  return res.status(401).json({ message: 'Unauthorized: Invalid credentials' });
} 
