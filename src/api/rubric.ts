import { Routes } from '@/api/routes';
import { axiosApi } from '@/api/axios';
import type { ParamsType } from '@/types/models';

const { RUBRIC_ROUTE } = Routes;

export const findRubric = async (slug: string, params?: ParamsType): Promise<any> => {
  return await axiosApi.get(`${RUBRIC_ROUTE}${slug}`, { params });
};

