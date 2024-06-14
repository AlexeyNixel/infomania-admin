import { axiosApi } from './axios';
import type { ParamsType } from '@/types/models';

export const findAll = async (params?: ParamsType) => {
  const { data } = await axiosApi.get('api/collection', { params });
  return data;
};

export const findOne = async (id: string, params?: ParamsType) => {
  const { data } = await axiosApi.get('api/collection/' + id, { params });
  return data;
};

export const findBookByCollection = async (
  collectionId: string,
  params?: ParamsType
) => {
  const { data } = await axiosApi.get('api/collection/books/' + collectionId);
  return data;
};

export const create = async (data: any) => {
  return await axiosApi.post('api/collection', data);
};

export const update = async (id: string, data: any) => {
  return await axiosApi.patch('api/collection/' + id, data);
};
