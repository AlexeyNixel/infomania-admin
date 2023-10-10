import { Routes } from '@/api/routes';
import { axiosApi } from '@/api/axios';
import type { ParamsType } from '@/types/models';

const { ENTRY_ROUTE } = Routes;
const { RUBRIC_ROUTE } = Routes;
const { DEPARTMENT_ROUTE } = Routes;

export const findEntry = async (slug: string, params?: ParamsType): Promise<any> => {
  return await axiosApi.get(`${ENTRY_ROUTE}${slug}`, { params });
};

export const findEntries = async (params?: ParamsType): Promise<any> => {
  return await axiosApi.get(ENTRY_ROUTE, { params });
};

export const findEntriesByRubric = async (slug?: string, params?: ParamsType): Promise<any> => {
  // @ts-ignore
  const { data, meta } = await axiosApi.get(`${RUBRIC_ROUTE}${slug}/entries`, { params: params });
  return { data, meta };
};

export const findEntriesByDepartment = async (department: string, params?: ParamsType) => {
  // @ts-ignore
  const { data, meta } = await axiosApi.get(`${DEPARTMENT_ROUTE}${department}/entries`, { params });
  return { data, meta };
};

export const putEntry = async (slug: string, data: any): Promise<any> => {
  return await axiosApi.put(`${ENTRY_ROUTE}${slug}`, data);
};

export const postEntry = async (data: any) => {
  return await axiosApi.post(ENTRY_ROUTE, data);
};
