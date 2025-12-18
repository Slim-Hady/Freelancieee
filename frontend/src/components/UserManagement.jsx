import React, { useState, useEffect } from 'react';
import { createUser, getUsers } from '../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('freelancer');

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

  const handleCreateUser = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !role) {
      setMessage('Please fill all fields');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await createUser({ name, email, role });
      setMessage('✓ User created successfully!');
      setName('');
      setEmail('');
      setRole('freelancer');
      setShowForm(false);
      loadUsers();
    } catch (error) {
      setMessage(`✗ Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Create New User'}
      </button>

      {showForm && (
        <form onSubmit={handleCreateUser} className="user-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="User name"
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
            />
          </div>

          <div className="form-group">
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="freelancer">Freelancer</option>
              <option value="client">Client</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create User'}
          </button>
        </form>
      )}

      {message && (
        <div className={`message ${message.startsWith('✓') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="users-list">
        <h3>Registered Users ({users.length})</h3>
        {users.length === 0 ? (
          <p className="empty-state">No users yet. Create one to get started!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Notification Preference</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className={`role role-${user.role}`}>{user.role}</span></td>
                  <td>{user.preferredNotification}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
