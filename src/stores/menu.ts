import { findMenu, putMenuItem } from './../api/menu';
import type { ParamsType } from '@/types/models';
import { findMenus } from '@/api/menu';
import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', () => {
  const getMenu = async (slug: string, params?: ParamsType) => {
    const { data } = await findMenu(slug, params);
    return { data };
  };

  const getMenus = async (params?: ParamsType) => {
    const { data, meta } = await findMenus(params);
    return { data, meta };
  };

  const updateMenuItem = async (id: string, data: any) => {
    return await putMenuItem(id, data);
  };

  return {
    getMenu,
    getMenus,
    updateMenuItem,
  };
});
