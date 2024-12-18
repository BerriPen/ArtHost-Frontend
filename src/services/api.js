import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api', // Use environment variable
});

// Request Interceptor to Add Authorization Header
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor to Handle 401 Errors
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retries
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        try {
          const response = await axios.post(
            `${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api'}/token/refresh/`,
            { refresh: refreshToken }
          );

          // Save new access token
          localStorage.setItem('access_token', response.data.access);

          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          localStorage.clear(); // Clear all tokens on failure
          window.location.href = '/login'; // Redirect to login
        }
      }
    }

    return Promise.reject(error); // Pass error to caller
  }
);

export default api;
