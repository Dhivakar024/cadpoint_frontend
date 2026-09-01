import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://cadpoint-backend.onrender.com/api';

const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60s timeout to allow Render free tier cold starts
});

adminApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('cadpoint_admin_auth_token_v1') || localStorage.getItem('cadpoint_admin_auth_token_v1');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const fetchDashboardStats = async () => {
  const res = await adminApi.get('/admin/dashboard-stats');
  return res.data;
};

export const fetchAdminCourses = async () => {
  const res = await adminApi.get('/admin/courses');
  return res.data;
};

export const createAdminCourse = async (courseData) => {
  const res = await adminApi.post('/admin/courses', courseData);
  return res.data;
};

export const updateAdminCourse = async (id, courseData) => {
  const res = await adminApi.put(`/admin/courses/${id}`, courseData);
  return res.data;
};

export const deleteAdminCourse = async (id) => {
  const res = await adminApi.delete(`/admin/courses/${id}`);
  return res.data;
};

export const fetchAdminEnquiries = async () => {
  const res = await adminApi.get('/admin/enquiries');
  return res.data;
};

export const updateEnquiryStatus = async (id, status) => {
  const res = await adminApi.put(`/admin/enquiries/${id}`, { status });
  return res.data;
};

export const deleteEnquiryRecord = async (id) => {
  const res = await adminApi.delete(`/admin/enquiries/${id}`);
  return res.data;
};

export const fetchAdminRegistrations = async () => {
  const res = await adminApi.get('/admin/registrations');
  return res.data;
};

export const updateRegistrationStatus = async (id, status) => {
  const res = await adminApi.put(`/admin/registrations/${id}`, { status });
  return res.data;
};

export const deleteRegistrationRecord = async (id) => {
  const res = await adminApi.delete(`/admin/registrations/${id}`);
  return res.data;
};

export const fetchAdminPrivacyRequests = async () => {
  const res = await adminApi.get('/admin/privacy-requests');
  return res.data;
};

export const updatePrivacyRequestStatus = async (id, status) => {
  const res = await adminApi.put(`/admin/privacy-requests/${id}`, { status });
  return res.data;
};

export const approvePrivacyDeletion = async (id, email, phone) => {
  const res = await adminApi.post(`/admin/privacy-requests/${id}/approve`, { email, phone });
  return res.data;
};

export const deletePrivacyRequestRecord = async (id) => {
  const res = await adminApi.delete(`/admin/privacy-requests/${id}`);
  return res.data;
};

export const changeAdminPassword = async (currentPassword, newPassword) => {
  const res = await adminApi.post('/admin/change-password', { currentPassword, newPassword });
  return res.data;
};

export default adminApi;
