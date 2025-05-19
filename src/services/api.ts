
import axios, { AxiosResponse } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

let token: string | null = null;
export function setToken(newToken: string): void {
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

interface User {
  id: string;
  fullName: string;
  email: string;
  // Add other user properties here
}

interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
}

interface Analytics {
  totalUsers: number;
  activeUsers: number;
  // Add other analytics properties
}

// Auth endpoints
export const register = (data: any): Promise<AxiosResponse> => api.post('/auth/register', data);
export const login = (data: any): Promise<AxiosResponse> => api.post('/auth/login', data);
export const verifyEmail = (token: string): Promise<AxiosResponse> => api.get(`/auth/verify-email?token=${token}`);
export const forgotPassword = (data: any): Promise<AxiosResponse> => api.post('/auth/forgot-password', data);
export const resetPassword = (data: any): Promise<AxiosResponse> => api.post('/auth/reset-password', data);

// User (admin) endpoints
export const getUsers = (): Promise<AxiosResponse<{users: User[]}>> => api.get('/admin/users');
export const getUser = (id: string): Promise<AxiosResponse<{user: User}>> => api.get(`/admin/users/${id}`);
export const updateUser = (id: string, data: any): Promise<AxiosResponse> => api.put(`/admin/users/${id}`, data);
export const deleteUser = (id: string): Promise<AxiosResponse> => api.delete(`/admin/users/${id}`);

// Portfolio endpoints
export const getPortfolio = (): Promise<AxiosResponse> => api.get('/portfolio');
export const updatePortfolio = (data: any): Promise<AxiosResponse> => api.post('/portfolio', data);

// Admin: Activity logs & analytics endpoints
export const getActivityLogs = (params?: any): Promise<AxiosResponse<{logs: ActivityLog[]}>> => 
  api.get('/admin/activity-logs', { params });
export const getAnalytics = (): Promise<AxiosResponse<Analytics>> => api.get('/admin/analytics');

// Error handling can be added globally or per call
export default api;
