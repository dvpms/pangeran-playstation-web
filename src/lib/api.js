import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Normalize error for consumers
    if (error.response) {
      return Promise.reject(error.response.data || error.response);
    }
    return Promise.reject(error);
  }
);

export default api;
