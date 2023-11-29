import { defineStore } from 'pinia';
import {
  findDocument,
  findDocuments,
  findMenus,
  postDocument,
  putDocument,
} from '@/api/menu';
import type { ParamsType } from '@/types/models';

export const useDocumentStore = defineStore('document', () => {
  const getMenus = async () => {
    const { data } = await findMenus();
    return data;
  };

  const getDocuments = async (params?: ParamsType) => {
    const { data, meta } = await findDocuments(params);
    return { data, meta };
  };

  const updateDocument = async (id: string, data: object) => {
    return await putDocument(id, data);
  };

  const createDocument = async (data: object) => {
    return await postDocument(data);
  };

  const getDocument = async (slug: string, params?: ParamsType) => {
    //@ts-ignore
    const { data, meta } = await findDocument(slug, params);
    return { data, meta };
  };
  return {
    getMenus,
    getDocuments,
    getDocument,
    updateDocument,
    createDocument,
  };
});
