import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import adminRoutes from './routes/admin';
import authRoutes from './routes/auth';
import portfolioRoutes from './routes/portfolio';

const app: Application = express();

app.use(express.json());

// Connect to MongoDB (update URI as needed)
mongoose.connect(process.env.MONGO_URI || '', { useNewUrlParser: true, useUnifiedTopology: true } as any)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; 