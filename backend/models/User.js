import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['freelancer', 'client'],
    required: true
  },
  preferredNotification: {
    type: String,
    enum: ['email', 'sms', 'push', 'inapp'],
    default: 'email'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

export default User;
