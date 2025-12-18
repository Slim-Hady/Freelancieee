import { PaymentProcessorFactory } from '../patterns/factory/PaymentProcessorFactory.js';
import Payment from '../models/Payment.js';

export const processPayment = async (req, res) => {
  try {
    const { amount, paymentType, jobId, fromUserId, toUserId } = req.body;

    if (!amount || !paymentType) {
      return res.status(400).json({
        success: false,
        message: 'Amount and payment type are required'
      });
    }

    // Use Factory pattern to create appropriate payment processor
    const processor = PaymentProcessorFactory.createProcessor(paymentType);
    const result = processor.processPayment(amount);

    // Save payment to database
    const payment = new Payment({
      amount,
      paymentType: result.paymentType,
      status: 'completed',
      jobId,
      fromUserId,
      toUserId,
      transactionId: result.transactionId
    });

    await payment.save();

    res.status(200).json({
      success: true,
      message: result.message,
      transactionId: result.transactionId,
      payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('jobId', 'title')
      .populate('fromUserId', 'name email')
      .populate('toUserId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      payments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
