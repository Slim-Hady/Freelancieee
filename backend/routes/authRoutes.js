import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  requestPasswordReset,
  resetPassword,
  deleteAccount
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import {
  registerValidation,
  loginValidation,
  changePasswordValidation,
  resetRequestValidation,
  resetPasswordValidation
} from '../middleware/validation.js';
import {
  registerLimiter,
  loginLimiter,
  passwordResetLimiter,
  authLimiter
} from '../middleware/rateLimiter.js';

const router = express.Router();

// Public routes with rate limiting
router.post('/register', registerLimiter, registerValidation, register);
router.post('/login', loginLimiter, loginValidation, login);
router.post('/password-reset-request', passwordResetLimiter, resetRequestValidation, requestPasswordReset);
router.post('/password-reset', passwordResetLimiter, resetPasswordValidation, resetPassword);

// Protected routes (require authentication) with general rate limiting
router.get('/profile', authLimiter, authenticate, getProfile);
router.put('/profile', authLimiter, authenticate, updateProfile);
router.put('/change-password', authLimiter, authenticate, changePasswordValidation, changePassword);
router.delete('/account', authLimiter, authenticate, deleteAccount);

export default router;
