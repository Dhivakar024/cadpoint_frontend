import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export const submitRegistration = async (formData) => {
  const response = await api.post('/registration', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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

export default api;
