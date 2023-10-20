import { defineStore } from 'pinia';
import { findMenus, postMenuItem } from '@/api/menu';
import type { ParamsType } from '@/types/models';

export const useMenuStore = defineStore('menu', () => {

  const getMenuItem = async (params?: ParamsType) => {
    return await findMenus(params)
  }

  const createMenuItem = async (data: any) => {
    return await postMenuItem(data)
  }

  return {
    getMenuItem,
    createMenuItem,
  }
})