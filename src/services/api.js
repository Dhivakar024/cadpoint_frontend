import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export const submitRegistration = async (registrationData) => {
  // Convert FormData to plain object if needed
  let payload = registrationData;
  if (registrationData instanceof FormData) {
    payload = {};
    registrationData.forEach((value, key) => {
      payload[key] = value;
    });
  }
  const response = await api.post('/registration', payload);
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
