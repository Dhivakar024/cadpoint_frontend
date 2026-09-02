import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://cadpoint-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

export const submitRegistration = async (registrationData) => {
  if (registrationData instanceof FormData) {
    const response = await api.post('/registration', registrationData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
  const response = await api.post('/registration', registrationData);
  return response.data;
};

export const submitEnquiry = async (enquiryData) => {
  const response = await api.post('/contact', enquiryData);
  return response.data;
};

export const getCourses = async (params = {}) => {
  const response = await api.get('/courses', { params });
  return response.data;
};

export const fetchMyPersonalData = async (email, phone) => {
  const response = await api.post('/privacy/view-data', { email, phone });
  return response.data;
};

export const submitPrivacyDeletionRequest = async (deletionData) => {
  const response = await api.post('/privacy/request-deletion', deletionData);
  return response.data;
};

export const fetchDashboardStats = async () => {
  const response = await api.get('/admin/dashboard-stats');
  return response.data;
};

export const fetchAdminCourses = async () => {
  const response = await api.get('/admin/courses');
  return response.data;
};

export const createAdminCourse = async (courseData) => {
  const response = await api.post('/admin/courses', courseData);
  return response.data;
};

export const updateAdminCourse = async (id, courseData) => {
  const response = await api.put(`/admin/courses/${id}`, courseData);
  return response.data;
};

export const deleteAdminCourse = async (id) => {
  const response = await api.delete(`/admin/courses/${id}`);
  return response.data;
};

export const fetchAdminEnquiries = async () => {
  const response = await api.get('/admin/enquiries');
  return response.data;
};

export const updateEnquiryStatus = async (id, status) => {
  const response = await api.put(`/admin/enquiries/${id}`, { status });
  return response.data;
};

export const deleteEnquiryRecord = async (id) => {
  const response = await api.delete(`/admin/enquiries/${id}`);
  return response.data;
};

export const fetchAdminRegistrations = async () => {
  const response = await api.get('/admin/registrations');
  return response.data;
};

export const updateRegistrationStatus = async (id, status) => {
  const response = await api.put(`/admin/registrations/${id}`, { status });
  return response.data;
};

export const deleteRegistrationRecord = async (id) => {
  const response = await api.delete(`/admin/registrations/${id}`);
  return response.data;
};

export const fetchAdminPrivacyRequests = async () => {
  const response = await api.get('/admin/privacy-requests');
  return response.data;
};

export const updatePrivacyRequestStatus = async (id, status) => {
  const response = await api.put(`/admin/privacy-requests/${id}`, { status });
  return response.data;
};

export const approvePrivacyDeletion = async (id, email, phone) => {
  const response = await api.post(`/admin/privacy-requests/${id}/approve`, { email, phone });
  return response.data;
};

export const deletePrivacyRequestRecord = async (id) => {
  const response = await api.delete(`/admin/privacy-requests/${id}`);
  return response.data;
};

export default api;
