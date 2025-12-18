// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
    profile: `${API_BASE_URL}/auth/profile`,
    changePassword: `${API_BASE_URL}/auth/change-password`,
    passwordResetRequest: `${API_BASE_URL}/auth/password-reset-request`,
    passwordReset: `${API_BASE_URL}/auth/password-reset`,
  },
  users: {
    list: `${API_BASE_URL}/users`,
    create: `${API_BASE_URL}/users`,
    getById: (id) => `${API_BASE_URL}/users/${id}`,
  },
  jobs: {
    list: `${API_BASE_URL}/jobs`,
    create: `${API_BASE_URL}/jobs`,
    getById: (id) => `${API_BASE_URL}/jobs/${id}`,
    apply: `${API_BASE_URL}/jobs/apply`,
    assign: `${API_BASE_URL}/jobs/assign`,
    complete: `${API_BASE_URL}/jobs/complete`,
  },
  payments: {
    process: `${API_BASE_URL}/pay`,
    list: `${API_BASE_URL}/payments`,
  },
  notifications: {
    send: `${API_BASE_URL}/notify`,
    updatePreference: `${API_BASE_URL}/preference`,
  }
};

export default API_BASE_URL;
