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

const router = express.Router();

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/password-reset-request', resetRequestValidation, requestPasswordReset);
router.post('/password-reset', resetPasswordValidation, resetPassword);

// Protected routes (require authentication)
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.put('/change-password', authenticate, changePasswordValidation, changePassword);
router.delete('/account', authenticate, deleteAccount);

export default router;
