import React, { useState, useEffect } from 'react';
import { createJob, getJobs, applyToJob, getUsers } from '../services/api';

const JobDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [clientId, setClientId] = useState('');
  const [freelancerId, setFreelancerId] = useState('');

  useEffect(() => {
    loadJobs();
    loadUsers();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error('Error loading jobs:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    
    if (!title || !description || !budget || !clientId) {
      setMessage('Please fill all fields');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await createJob({
        title,
        description,
        budget: parseFloat(budget),
        clientId
      });

      setMessage('✓ Job created successfully!');
      setTitle('');
      setDescription('');
      setBudget('');
      setClientId('');
      setShowForm(false);
      loadJobs();
    } catch (error) {
      setMessage(`✗ Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyToJob = async (jobId) => {
    if (!freelancerId) {
      setMessage('Please select a freelancer first');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await applyToJob(jobId, freelancerId);
      setMessage('✓ Application submitted successfully!');
      loadJobs();
    } catch (error) {
      setMessage(`✗ Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-dashboard">
      <h2>Job Dashboard (Facade Pattern)</h2>

      <div className="dashboard-controls">
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create New Job'}
        </button>
        
        <div className="form-group inline">
          <label>Select Freelancer to Apply:</label>
          <select value={freelancerId} onChange={(e) => setFreelancerId(e.target.value)}>
            <option value="">Select Freelancer</option>
            {users.filter(u => u.role === 'freelancer').map(user => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleCreateJob} className="job-form">
          <h3>Create New Job</h3>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job title"
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job description"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Budget ($):</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Budget"
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label>Client:</label>
            <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
              <option value="">Select Client</option>
              {users.filter(u => u.role === 'client').map(user => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Job'}
          </button>
        </form>
      )}

      {message && (
        <div className={`message ${message.startsWith('✓') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="jobs-list">
        <h3>Available Jobs</h3>
        {jobs.length === 0 ? (
          <p className="empty-state">No jobs available. Create one to get started!</p>
        ) : (
          jobs.map(job => (
            <div key={job._id} className="job-card">
              <h4>{job.title}</h4>
              <p>{job.description}</p>
              <div className="job-meta">
                <span className="budget">Budget: ${job.budget}</span>
                <span className={`status status-${job.status}`}>{job.status}</span>
              </div>
              <div className="job-info">
                <small>Client: {job.clientId?.name || 'Unknown'}</small>
                <small>Applicants: {job.applicants?.length || 0}</small>
              </div>
              {job.status === 'open' && (
                <button 
                  onClick={() => handleApplyToJob(job._id)}
                  disabled={loading}
                  className="apply-btn"
                >
                  Apply to Job
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobDashboard;
