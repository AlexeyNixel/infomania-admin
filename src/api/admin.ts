import { axiosApi } from '@/api/axios';
import { Routes } from '@/api/routes';

const { LOGIN_ROUTE } = Routes;

export const auth = async (data: object): Promise<any> => {
  return await axiosApi.post(LOGIN_ROUTE, data);
};

// export const getAllModel = async (url: string, params?: ParamsType) => {
//   return await axiosApi.get(url, { params: params });
// };
//
// export const getAllModelBySlug = async (url: string, slug: string, params?: ParamsType) => {
//   return await axiosApi.get(`api${url}/${slug}`, { params: params });
// };
//
// export const updateElement = async (url: string, slug: string, data: object) => {
//   return axiosApi.put(`api/${url}/${slug}`, data);
// };
// export const createElement = async (url: string, data: object) => {
//   return axiosApi.post(`api${url}}`, data);
// };
