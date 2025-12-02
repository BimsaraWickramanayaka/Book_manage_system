import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // proxy set in vite.config.js
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('user');
      // Redirect to login by dispatching a custom event
      window.dispatchEvent(new Event('logout'));
    }
    return Promise.reject(error);
  }
);

export default api;