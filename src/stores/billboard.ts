import type { ParamsType } from '@/types/models';
import { findAffiches } from './../api/affiche';
import { defineStore } from 'pinia';

export const useBillboardStore = defineStore('billboard', () => {

  const getBillboard = async (params?: ParamsType) => {
    const { data } = await findAffiches(params)
    return data
  }

  return {
    getBillboard
  }
})