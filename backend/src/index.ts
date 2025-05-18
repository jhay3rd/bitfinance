import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
const jwt_decode = require('jwt-decode');
import { JwtPayload } from 'jsonwebtoken';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

app.use(cors());
app.use(express.json());

// In-memory user store (for demo)
const users: Record<string, any> = {};

// Augment Express Request type for req.user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend is running.' });
});

// Google OAuth endpoint
app.post('/api/auth/google', async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;
  if (!token) {
    res.status(400).json({ message: 'Missing Google token' });
    return;
  }
  try {
    // Verify token with Google
    const googleRes = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
    const { email, name, sub, picture } = googleRes.data;
    // Create or update user
    users[email] = { email, name, sub, picture, provider: 'google' };
    // Issue JWT
    const jwtToken = jwt.sign({ email, name, provider: 'google' }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token: jwtToken, user: users[email] });
  } catch (err: any) {
    res.status(401).json({ message: 'Invalid Google token', error: err?.response?.data || err.message });
  }
});

// Apple OAuth endpoint
app.post('/api/auth/apple', async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;
  if (!token) {
    res.status(400).json({ message: 'Missing Apple token' });
    return;
  }
  try {
    // Decode header to get kid
    const decodedHeader: any = jwt_decode(token, { header: true });
    const kid = decodedHeader.kid;
    // Get Apple's public key
    const client = jwksClient({
      jwksUri: 'https://appleid.apple.com/auth/keys',
      cache: true,
      rateLimit: true,
    });
    const key = await client.getSigningKey(kid);
    const publicKey = key.getPublicKey();
    // Verify token
    const payload = jwt.verify(token, publicKey) as JwtPayload & { email?: string; sub?: string; name?: string };
    const { email, sub } = payload;
    // Create or update user
    const userKey: string = email || sub || `apple_${Date.now()}`;
    users[userKey] = { email, sub, provider: 'apple' };
    // Issue JWT
    const jwtToken = jwt.sign({ email, sub, provider: 'apple' }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token: jwtToken, user: users[userKey] });
  } catch (err: any) {
    res.status(401).json({ message: 'Invalid Apple token', error: err?.message });
  }
});

// JWT middleware
function authenticateJWT(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
      return;
    } catch (err) {
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }
  }
  res.status(401).json({ message: 'No token provided' });
}

// JWT-protected route
app.get('/api/protected', authenticateJWT, (req: Request, res: Response) => {
  res.json({ message: 'You are authenticated!', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
}); 