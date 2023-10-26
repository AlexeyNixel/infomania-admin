import type { ParamsType } from '@/types/models';
import { findAffiche, findAffiches, postAffiche, putAffiche } from './../api/affiche';
import { defineStore } from 'pinia';

export const useBillboardStore = defineStore('billboard', () => {

  const getBillboard = async (slug: string, params?: ParamsType) => {
    return await findAffiche(slug, params);
  };

  const getBillboards = async (params?: ParamsType) => {
    const { data } = await findAffiches(params);
    return data;
  };

  const updateBillboard = async (slug: string, data: any) => {
    return await putAffiche(slug, data);
  };

  const createBillboard = async (data: any) => {
    return await postAffiche(data);
  };

  return {
    getBillboard,
    getBillboards,
    updateBillboard,
    createBillboard,
  };
});