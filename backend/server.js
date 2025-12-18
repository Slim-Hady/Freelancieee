import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import paymentRoutes from './routes/paymentRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', paymentRoutes);
app.use('/api', jobRoutes);
app.use('/api', notificationRoutes);
app.use('/api', userRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Freelancieee API Server',
    version: '2.0.0',
    endpoints: {
      auth: '/api/auth/register (POST), /api/auth/login (POST), /api/auth/profile (GET, PUT), /api/auth/change-password (PUT), /api/auth/password-reset-request (POST), /api/auth/password-reset (POST)',
      payments: '/api/pay (POST), /api/payments (GET)',
      jobs: '/api/jobs (POST, GET), /api/jobs/:id (GET), /api/jobs/apply (POST), /api/jobs/assign (POST), /api/jobs/complete (POST)',
      notifications: '/api/notify (POST), /api/preference (POST)',
      users: '/api/users (POST, GET), /api/users/:id (GET)'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
