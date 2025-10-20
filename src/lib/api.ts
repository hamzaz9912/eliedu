import axios, { AxiosInstance, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Add admin token if available
    const adminToken = localStorage.getItem('admin_token');
    if (adminToken && adminToken !== 'undefined' && adminToken !== 'null') {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }

    // Add user token if available (for user endpoints)
    const userToken = localStorage.getItem('user_token');
    if (userToken && userToken !== 'undefined' && userToken !== 'null' && config.url?.includes('/user/')) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('admin_token');
      localStorage.removeItem('user_token');
      localStorage.removeItem('admin_user');
      localStorage.removeItem('user_data');

      // Redirect to login if on protected page
      if (window.location.pathname.includes('/admin') && !window.location.pathname.includes('/admin-login')) {
        window.location.href = '/admin-login';
      } else if (window.location.pathname.includes('/dashboard')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// API Endpoints
export const authAPI = {
  // Admin authentication
  adminLogin: (credentials: { username: string; password: string }) =>
    api.post('/api/auth/login', credentials),

  adminRegister: (userData: {
    username: string;
    email: string;
    password: string;
    name: string;
    role: 'admin' | 'super_admin';
  }) => api.post('/api/auth/register', userData),

  getAdminUsers: () => api.get('/api/auth/users'),

  createAdminUser: (userData: {
    username: string;
    email: string;
    password: string;
    name: string;
    role: 'admin' | 'super_admin';
  }) => api.post('/api/auth/users', userData),

  verifyAdminToken: () => api.get('/api/auth/verify'),

  // User authentication (students)
  userLogin: (credentials: { idCardNumber: string }) =>
    api.post('/api/user/login', credentials),

  getUserProfile: () => api.get('/api/user/profile'),

  verifyUserToken: () => api.get('/api/user/verify'),
};

export const courseAPI = {
  // Course registrations
  getRegistrations: () => api.get('/api/registrations'),

  updateRegistration: (id: string, updates: any) =>
    api.put(`/api/registrations/${id}`, updates),

  // Contact forms
  submitContact: (formData: any) => api.post('/api/contact', formData),

  // Course registration
  submitRegistration: (registrationData: any) =>
    api.post('/api/registrations', registrationData),
};

export const adminAPI = {
  // Student management
  getStudents: () => api.get('/api/admin/students'),

  addStudent: (studentData: {
    studentName: string;
    email: string;
    phone?: string;
    dateOfBirth?: string;
    idCardNumber: string;
    courses: Array<{ language: string; level: string }>;
  }) => api.post('/api/admin/students', studentData),
};

export const publicAPI = {
  // Certificate verification
  verifyCertificate: (idCardNumber: string) =>
    api.get(`/api/verify/${idCardNumber}`),
};

// Export the configured axios instance
export default api;

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!(localStorage.getItem('admin_token') || localStorage.getItem('user_token'));
};

// Helper function to get current user type
export const getCurrentUserType = (): 'admin' | 'user' | null => {
  if (localStorage.getItem('admin_token')) return 'admin';
  if (localStorage.getItem('user_token')) return 'user';
  return null;
};

// Helper function to logout
export const logout = (): void => {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('user_token');
  localStorage.removeItem('admin_user');
  localStorage.removeItem('user_data');
};