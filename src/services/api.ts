import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (email: string, password: string, name?: string) => {
    const { data } = await api.post('/auth/register', { email, password, name });
    return data;
  },
  
  login: async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },
  
  getCurrentUser: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },
};

// Analysis API
export const analysisAPI = {
  analyze: async (jobDescription: string, resume: string) => {
    const { data } = await api.post('/analysis/analyze', { jobDescription, resume });
    return data;
  },
  
  getHistory: async (page = 1, limit = 20) => {
    const { data } = await api.get('/analysis/history', { params: { page, limit } });
    return data;
  },
  
  getById: async (id: string) => {
    const { data } = await api.get(`/analysis/${id}`);
    return data;
  },
  
  delete: async (id: string) => {
    const { data } = await api.delete(`/analysis/${id}`);
    return data;
  },
};

// Email API
export const emailAPI = {
  sendAnalysis: async (analysisId: string, recipientEmail?: string) => {
    const { data } = await api.post('/email/send-analysis', { analysisId, recipientEmail });
    return data;
  },
  
  testEmail: async () => {
    const { data } = await api.post('/email/test');
    return data;
  },
};

export default api;
