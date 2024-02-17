import type { ParamsType } from '@/types/models';
import { axiosApi } from './axios';

export const findBooks = async (params?: ParamsType) => {
  return await axiosApi.get('/api/book', { params });
};

export const findBook = async (id: string) => {
  return await axiosApi.get(`/api/book/${id}`);
};

export const postBook = async (book: any) => {
  return await axiosApi.post('/api/book', book);
};

export const putBook = async (id: string, book: any) => {
  return await axiosApi.patch(`/api/book/${id}`, book);
};
