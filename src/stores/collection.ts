import { defineStore } from 'pinia';
import { create, findAll, findOne, update } from '@/api/collections';
import type { ParamsType } from '@/types/models';

export const useCollectionStore = defineStore('collection', () => {
  const getOne = async (id: string, params?: ParamsType) => {
    return await findOne(id, params);
  };

  const getAll = async (params?: ParamsType) => {
    return await findAll(params);
  };

  const put = async (id: string, data: any) => {
    return await update(id, data);
  };

  const post = async (data: any) => {
    return await create(data);
  };

  return {
    getOne,
    getAll,
    put,
    post,
  };
});
