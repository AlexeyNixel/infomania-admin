import { ref } from 'vue';
import type { MenuItemType } from './../types/models';
import { putMenuItem, findMenu } from './../api/menu';
import { defineStore } from 'pinia';
import { findMenus, postMenuItem } from '@/api/menu';
import type { ParamsType } from '@/types/models';

export const useMenuStore = defineStore('menu', () => {
  const menu = ref<MenuItemType>()

  const getMenuItem = async (id: string, params?: ParamsType) => {
    const { data } = await findMenu(id, params);
    return data;
  };
  const getMenusItem = async (params?: ParamsType) => {
    const { data } = await findMenus(params);
    return data;
  };

  const updateMenuItem = async (id: string, data: object) => {
    return await putMenuItem(id, data);
  };

  const createMenuItem = async (data: any) => {
    return await postMenuItem(data);
  };

  return {
    menu,
    getMenuItem,
    getMenusItem,
    updateMenuItem,
    createMenuItem,
  };
});
