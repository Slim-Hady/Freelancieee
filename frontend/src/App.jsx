import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import PaymentComponent from './components/PaymentComponent';
import JobDashboard from './components/JobDashboard';
import NotificationSettings from './components/NotificationSettings';
import UserManagement from './components/UserManagement';
import './App.css';

function App() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('jobs');
  const [authView, setAuthView] = useState('login'); // 'login' or 'register'

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <h2>Loading Freelancieee...</h2>
        </div>
      </div>
    );
  }

  // Show authentication forms if not logged in
  if (!isAuthenticated) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Freelancieee</h1>
          <p className="subtitle">Connect Talent with Opportunity</p>
        </header>

        <main className="app-main auth-main">
          {authView === 'login' ? (
            <Login
              onSwitchToRegister={() => setAuthView('register')}
              onLoginSuccess={() => setActiveTab('jobs')}
            />
          ) : (
            <Register
              onSwitchToLogin={() => setAuthView('login')}
              onRegisterSuccess={() => setActiveTab('jobs')}
            />
          )}
        </main>

        <footer className="app-footer">
          <p>Secure MERN Stack Freelance Platform</p>
        </footer>
      </div>
    );
  }

  // Main authenticated app view
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>Freelancieee</h1>
            <p className="subtitle">MERN Stack Platform with Design Patterns</p>
          </div>
          <div className="user-header">
            <span className="welcome-text">Welcome, {user?.name}!</span>
            <span className={`role-badge ${user?.role}`}>{user?.role}</span>
          </div>
        </div>
      </header>

      <nav className="app-nav">
        <button 
          className={activeTab === 'profile' ? 'active' : ''} 
          onClick={() => setActiveTab('profile')}
        >
          My Profile
        </button>
        <button 
          className={activeTab === 'jobs' ? 'active' : ''} 
          onClick={() => setActiveTab('jobs')}
        >
          Jobs (Facade)
        </button>
        <button 
          className={activeTab === 'payments' ? 'active' : ''} 
          onClick={() => setActiveTab('payments')}
        >
          Payments (Factory)
        </button>
        <button 
          className={activeTab === 'notifications' ? 'active' : ''} 
          onClick={() => setActiveTab('notifications')}
        >
          Notifications (Strategy)
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''} 
          onClick={() => setActiveTab('users')}
        >
          User Management
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'jobs' && <JobDashboard />}
        {activeTab === 'payments' && <PaymentComponent />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'users' && <UserManagement />}
      </main>

      <footer className="app-footer">
        <div className="pattern-info">
          <h3>Design Patterns Implemented</h3>
          <ul>
            <li><strong>Factory Pattern:</strong> Payment processing system with multiple payment processors</li>
            <li><strong>Facade Pattern:</strong> Job management system coordinating multiple subsystems</li>
            <li><strong>Strategy Pattern:</strong> Notification system with interchangeable notification methods</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
