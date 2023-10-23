import { Routes } from '@/api/routes';
import { axiosApi } from '@/api/axios';
import type { ParamsType } from '@/types/models';

const { MENU_ROUTE } = Routes;
const { MENU_ITEM_ROUTE } = Routes;
const { DOCUMENT_ROUTE } = Routes;

export const findMenus = async (params?: ParamsType): Promise<any> => {
  return await axiosApi.get(MENU_ITEM_ROUTE, { params });
};

export const findMenu = async (
  slug: string,
  params?: ParamsType,
): Promise<any> => {
  return await axiosApi.get(`${MENU_ITEM_ROUTE}${slug}`, { params });
};

export const findDocument = async (
  id: string,
  params?: ParamsType,
): Promise<any> => {
  return await axiosApi.get(`${DOCUMENT_ROUTE}${id}`, { params });
};

export const findDocuments = async (params?: ParamsType): Promise<any> => {
  const { data } = await axiosApi.get(DOCUMENT_ROUTE, { params });
  return data;
};

export const putDocument = async (id: string, data: object): Promise<any> => {
  return await axiosApi.put(`${DOCUMENT_ROUTE}${id}`, data);
};

export const postDocument = async (data: any) => {
  return await axiosApi.post(DOCUMENT_ROUTE, data);
};

export const postMenuItem = async (data: any) => {
  return await axiosApi.post(MENU_ITEM_ROUTE, data);
};

export const putMenuItem = async (id: string, data: any) => {
  return await axiosApi.put(`${MENU_ITEM_ROUTE}${id}`, data);
};
