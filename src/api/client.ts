import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://dev.bhcjobs.com',
  headers: {
    'Content-Type': 'application/json',
  },
});
