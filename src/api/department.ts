import type { ParamsType } from '@/types/models';
import { axiosApi } from '@/api/axios';
import { Routes } from '@/api/routes';

const { DEPARTMENT_ROUTE } = Routes;

export const findDepartments = async (params?: ParamsType) => {
  const { data } = await axiosApi.get(DEPARTMENT_ROUTE, { params });
  return data;
};

export const findDepartment = async (slug: string, params?: ParamsType) => {
  return await axiosApi.get(`${DEPARTMENT_ROUTE}${slug}`, { params });
};

export const putDepartment = async (slug: string, data: object) => {
  return await axiosApi.put(`${DEPARTMENT_ROUTE}${slug}`, data);
};

export const postDepartment = async (data: any) => {
  return await axiosApi.post(DEPARTMENT_ROUTE, data);
};
