import axios from 'axios';

const defaultBaseURL = 'https://skilledhyretask-backend.onrender.com/api';
const baseURL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname !== 'localhost' ? defaultBaseURL : '/api');

const api = axios.create({
  baseURL,
});

export const getEmployees = () => api.get('/employees');
export const getEmployee = (id) => api.get(`/employees/${id}`);
export const addEmployee = (data) => api.post('/employees', data);
export const updateEmployee = (id, data) => api.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);
