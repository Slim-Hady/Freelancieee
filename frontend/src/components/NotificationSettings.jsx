import React, { useState, useEffect } from 'react';
import { sendNotification, updateNotificationPreference, getUsers } from '../services/api';

const NotificationSettings = () => {
  const [notificationType, setNotificationType] = useState('email');
  const [recipient, setRecipient] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [preferredNotification, setPreferredNotification] = useState('email');
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

  const handleSendNotification = async (e) => {
    e.preventDefault();
    
    if (!recipient || !notificationMessage) {
      setMessage('Please fill all fields');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const result = await sendNotification({
        recipient,
        message: notificationMessage,
        notificationType
      });

      setMessage(`✓ Notification sent via ${result.details.method}!`);
      setRecipient('');
      setNotificationMessage('');
    } catch (error) {
      setMessage(`✗ Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePreference = async (e) => {
    e.preventDefault();
    
    if (!selectedUser) {
      setMessage('Please select a user');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await updateNotificationPreference(selectedUser, preferredNotification);
      setMessage('✓ Notification preference updated!');
      loadUsers();
    } catch (error) {
      setMessage(`✗ Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notification-settings">
      <h2>Notification System (Strategy Pattern)</h2>

      <div className="notification-section">
        <h3>Send Notification</h3>
        <form onSubmit={handleSendNotification}>
          <div className="form-group">
            <label>Notification Type (Strategy):</label>
            <select 
              value={notificationType} 
              onChange={(e) => setNotificationType(e.target.value)}
            >
              <option value="email">Email Notifier</option>
              <option value="sms">SMS Notifier</option>
              <option value="push">Push Notifier</option>
              <option value="inapp">In-App Notifier</option>
            </select>
          </div>

          <div className="form-group">
            <label>Recipient:</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter recipient (email, phone, etc.)"
            />
          </div>

          <div className="form-group">
            <label>Message:</label>
            <textarea
              value={notificationMessage}
              onChange={(e) => setNotificationMessage(e.target.value)}
              placeholder="Enter notification message"
              rows="3"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Notification'}
          </button>
        </form>
      </div>

      <div className="notification-section">
        <h3>User Notification Preferences</h3>
        <form onSubmit={handleUpdatePreference}>
          <div className="form-group">
            <label>Select User:</label>
            <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.name} - Current: {user.preferredNotification}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Preferred Notification Method:</label>
            <select 
              value={preferredNotification} 
              onChange={(e) => setPreferredNotification(e.target.value)}
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="push">Push</option>
              <option value="inapp">In-App</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Preference'}
          </button>
        </form>
      </div>

      {message && (
        <div className={`message ${message.startsWith('✓') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="strategy-info">
        <h4>Strategy Pattern Demo</h4>
        <p>
          The notification system uses the Strategy Pattern. Different notification methods 
          (Email, SMS, Push, In-App) are implemented as separate strategy classes. The MessageSender 
          context class can switch between these strategies at runtime.
        </p>
      </div>
    </div>
  );
};

export default NotificationSettings;
