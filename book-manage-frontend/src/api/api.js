import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // proxy set in vite.config.js
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

export default api;