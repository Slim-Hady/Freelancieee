import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PaymentComponent from './components/PaymentComponent';
import JobDashboard from './components/JobDashboard';
import NotificationSettings from './components/NotificationSettings';
import UserManagement from './components/UserManagement';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="app">
      <header className="app-header">
        <h1>Freelancieee</h1>
        <p className="subtitle">MERN Stack Prototype with Design Patterns</p>
      </header>

      <nav className="app-nav">
        <button 
          className={activeTab === 'users' ? 'active' : ''} 
          onClick={() => setActiveTab('users')}
        >
          User Management
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
      </nav>

      <main className="app-main">
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'jobs' && <JobDashboard />}
        {activeTab === 'payments' && <PaymentComponent />}
        {activeTab === 'notifications' && <NotificationSettings />}
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
