import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  paymentType: {
    type: String,
    enum: ['creditcard', 'paypal', 'banktransfer', 'crypto'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  },
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  transactionId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
