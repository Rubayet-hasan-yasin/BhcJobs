import { apiClient } from './client';

export const getIndustries = async () => {
  const response = await apiClient.get('/api/industry/get');
  return response.data;
};

export const getJobs = async () => {
  const response = await apiClient.get('/api/job/get');
  return response.data;
};

export const getCompanies = async () => {
  const response = await apiClient.get('/api/company/get');
  return response.data;
};

export const registerUser = async (data: any) => {
  const response = await apiClient.post('/api/job_seeker/register', data);
  return response.data;
};

export const verifyPhone = async (data: any) => {
  const response = await apiClient.post('/api/job_seeker/phone_verify', data);
  return response.data;
};

export const loginUser = async (data: any) => {
  const response = await apiClient.post('/api/job_seeker/login', data);
  return response.data;
};
