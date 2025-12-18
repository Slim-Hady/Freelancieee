import express from 'express';
import { processPayment, getPayments } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/pay', processPayment);
router.get('/payments', getPayments);

export default router;
