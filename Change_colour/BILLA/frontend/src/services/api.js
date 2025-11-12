import axios from 'axios';

// The base URL for your backend API
// Make sure this matches your backend port
const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
});

// --- Interceptor to add JWT to requests ---
// This runs BEFORE every request is sent
api.interceptors.request.use(
  (config) => {
    // Get the user data (which includes the token) from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
      // If the user and token exist, add the 'Authorization' header
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;