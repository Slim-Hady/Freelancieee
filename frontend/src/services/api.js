import axios from 'axios';

const API_URL = '/api';

// Payment API
export const processPayment = async (paymentData) => {
  const response = await axios.post(`${API_URL}/pay`, paymentData);
  return response.data;
};

export const getPayments = async () => {
  const response = await axios.get(`${API_URL}/payments`);
  return response.data;
};

// Job API
export const createJob = async (jobData) => {
  const response = await axios.post(`${API_URL}/jobs`, jobData);
  return response.data;
};

export const getJobs = async (criteria = {}) => {
  const params = new URLSearchParams(criteria);
  const response = await axios.get(`${API_URL}/jobs?${params}`);
  return response.data;
};

export const applyToJob = async (jobId, freelancerId) => {
  const response = await axios.post(`${API_URL}/jobs/apply`, { jobId, freelancerId });
  return response.data;
};

export const assignJob = async (jobId, freelancerId) => {
  const response = await axios.post(`${API_URL}/jobs/assign`, { jobId, freelancerId });
  return response.data;
};

export const completeJob = async (jobId, freelancerId) => {
  const response = await axios.post(`${API_URL}/jobs/complete`, { jobId, freelancerId });
  return response.data;
};

// Notification API
export const sendNotification = async (notificationData) => {
  const response = await axios.post(`${API_URL}/notify`, notificationData);
  return response.data;
};

export const updateNotificationPreference = async (userId, preferredNotification) => {
  const response = await axios.post(`${API_URL}/preference`, { userId, preferredNotification });
  return response.data;
};

// User API
export const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};
