import axios from 'axios';
import router from '@/router';

export const axiosApi = axios.create({
  baseURL: import.meta.env['VITE_BASE_URL'],
  timeout: 1000,
});
axiosApi.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')!}`;

axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status && error.response.status === 401) {
      localStorage.removeItem('token')
      router.push({ name: 'auth' });
      return error
    } else {
      return error
    }
  }
);