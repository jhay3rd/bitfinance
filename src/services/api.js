
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

let token = null;
export function setToken(newToken) {
  token = newToken;
}

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  (config) => {
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const verifyEmail = (token) => api.get(`/auth/verify-email?token=${token}`);
export const forgotPassword = (data) => api.post('/auth/forgot-password', data);
export const resetPassword = (data) => api.post('/auth/reset-password', data);

// User (admin)
export const getUsers = () => api.get('/admin/users');
export const getUser = (id) => api.get(`/admin/users/${id}`);
export const updateUser = (id, data) => api.put(`/admin/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);

// Portfolio
export const getPortfolio = () => api.get('/portfolio');
export const updatePortfolio = (data) => api.post('/portfolio', data);

// Admin: Activity logs & analytics
export const getActivityLogs = (params) => {
  const adminAuth = localStorage.getItem('adminAuth');
  if (!adminAuth) {
    return Promise.reject(new Error('No admin authentication'));
  }
  
  return api.get('/admin/activity-logs', { 
    params,
    headers: { 'Authorization': `Basic ${adminAuth}` }
  });
};

export const getAnalytics = () => {
  const adminAuth = localStorage.getItem('adminAuth');
  if (!adminAuth) {
    return Promise.reject(new Error('No admin authentication'));
  }
  
  return api.get('/admin/analytics', {
    headers: { 'Authorization': `Basic ${adminAuth}` }
  });
};

// Admin: Chatbot management
export const getChatbotMessages = () => {
  const adminAuth = localStorage.getItem('adminAuth');
  if (!adminAuth) {
    return Promise.reject(new Error('No admin authentication'));
  }
  
  return api.get('/admin/chatbot-messages', {
    headers: { 'Authorization': `Basic ${adminAuth}` }
  });
};

export const respondToChatMessage = (messageId, response) => {
  const adminAuth = localStorage.getItem('adminAuth');
  if (!adminAuth) {
    return Promise.reject(new Error('No admin authentication'));
  }
  
  return api.post(`/admin/chatbot-messages/${messageId}/respond`, { response }, {
    headers: { 'Authorization': `Basic ${adminAuth}` }
  });
};

// User portfolio management (admin)
export const updateUserPortfolio = (userId, portfolioData) => {
  const adminAuth = localStorage.getItem('adminAuth');
  if (!adminAuth) {
    return Promise.reject(new Error('No admin authentication'));
  }
  
  return api.put(`/admin/users/${userId}/portfolio`, portfolioData, {
    headers: { 'Authorization': `Basic ${adminAuth}` }
  });
};

// Error handling can be added globally or per call
export default api;
