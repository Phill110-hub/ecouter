// src/axios.js
import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = process.env.REACT_APP_API_URL || 'https://ecouter.onrender.com';

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
