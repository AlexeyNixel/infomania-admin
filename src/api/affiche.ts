import type { BillboardType, ParamsType } from '@/types/models';
import { axiosApi } from '@/api/axios';
import { Routes } from '@/api/routes';

const { AFFICHE_ROUTE } = Routes;
export const findAffiches = async (params?: ParamsType) => {
  // @ts-ignore
  // const { data, meta } =
  return await axiosApi.get(AFFICHE_ROUTE, { params });
};

export const findAffiche = async (slug: string, params?: ParamsType): Promise<BillboardType> => {
  return await axiosApi.get(`${AFFICHE_ROUTE}${slug}`, { params });
};

export const putAffiche = async (slug: string, data: any) => {
  return await axiosApi.put(`${AFFICHE_ROUTE}${slug}`, data);
};

export const postAffiche = async (data: any) => {
  return await axiosApi.post(AFFICHE_ROUTE, data);
};
