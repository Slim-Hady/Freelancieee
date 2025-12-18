import React, { useState, useEffect } from 'react';
import { processPayment, getUsers } from '../services/api';

const PaymentComponent = () => {
  const [paymentType, setPaymentType] = useState('creditcard');
  const [amount, setAmount] = useState('');
  const [users, setUsers] = useState([]);
  const [fromUser, setFromUser] = useState('');
  const [toUser, setToUser] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      setMessage('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const result = await processPayment({
        amount: parseFloat(amount),
        paymentType,
        fromUserId: fromUser || undefined,
        toUserId: toUser || undefined
      });

      setMessage(`✓ ${result.message} (Transaction ID: ${result.transactionId})`);
      setAmount('');
    } catch (error) {
      setMessage(`✗ Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-component">
      <h2>Payment Processor (Factory Pattern)</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Payment Type:</label>
          <select 
            value={paymentType} 
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option value="creditcard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="banktransfer">Bank Transfer</option>
            <option value="crypto">Cryptocurrency</option>
          </select>
        </div>

        <div className="form-group">
          <label>Amount ($):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label>From User (optional):</label>
          <select value={fromUser} onChange={(e) => setFromUser(e.target.value)}>
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>To User (optional):</label>
          <select value={toUser} onChange={(e) => setToUser(e.target.value)}>
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Process Payment'}
        </button>
      </form>

      {message && (
        <div className={`message ${message.startsWith('✓') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default PaymentComponent;
