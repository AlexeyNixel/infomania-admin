import { axiosApi } from '@/api/axios';
import { Routes } from '@/api/routes';
import type { ParamsType } from '@/types/models';

const { MAIN_SLIDER_ROUTE } = Routes;
export const findSlides = async (params?: ParamsType) => {
  return await axiosApi.get(MAIN_SLIDER_ROUTE, { params });
};

export const findSlide = async (slug: string, params?: ParamsType) => {
  return await axiosApi.get(`${MAIN_SLIDER_ROUTE}${slug}`, { params });
};

export const putSlide = async (slug: string, data: object) => {
  return await axiosApi.put(`${MAIN_SLIDER_ROUTE}${slug}`, data);
};

export const postSlides = async (data: any) => {
  return await axiosApi.post(MAIN_SLIDER_ROUTE, data);
};
