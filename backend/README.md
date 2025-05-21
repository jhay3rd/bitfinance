# Investment Platform Backend

Production-ready backend for an investment website.

## Tech Stack
- Node.js (Express)
- MongoDB (Mongoose)
- JWT authentication
- Nodemailer (SMTP)
- bcrypt (password hashing)

## Features
- User registration, login, email verification
- Password reset via email
- Secure JWT authentication
- Portfolio and transaction endpoints (scaffolded)
- Security best practices (rate limiting, helmet, input validation)

## Setup

1. **Clone the repo**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment variables**
   - Copy `.env.example` to `.env` and fill in your values
4. **Start the server**
   ```bash
   npm run dev
   ```

## Environment Variables
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
EMAIL_FROM=no-reply@yourdomain.com
CLIENT_URL=http://localhost:5173
```

## API Endpoints
- `/api/auth/register` - Register new user
- `/api/auth/login` - Login
- `/api/auth/verify-email` - Email verification
- `/api/auth/forgot-password` - Request password reset
- `/api/auth/reset-password` - Reset password
- `/api/portfolio` - Portfolio endpoints (protected)

## License
MIT 