// src/axios.js
import axios from 'axios';
import { toast } from 'react-toastify';

// Replace this with your actual Replit backend URL:
const baseURL = 'https://5914e34b-5374-4c2b-ac7f-284078e07b90-00-25n0w53arrsx8.janeway.replit.dev';

const api = axios.create({
  baseURL,
  withCredentials: true,  // ✅ Required for cookies/session
});

// Automatically handle session timeouts
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      toast.error('Session expired. Please login again.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
