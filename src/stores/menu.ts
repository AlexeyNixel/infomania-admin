import {
  findMenu,
  putMenuItem,
  findMenuItems,
  findMenuItem,
  putMenu,
  postMenuItem,
} from './../api/menu';
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

  const getMenuItems = async (params?: ParamsType) => {
    const { data, meta } = await findMenuItems(params);
    return { data, meta };
  };

  const getMenuItem = async (id: string, params?: ParamsType): Promise<any> => {
    const { data } = await findMenuItem(id, params);
    return { data };
  };

  const updateMenuItem = async (id: string, data: any) => {
    return await putMenuItem(id, data);
  };

  const updateMenu = async (id: string, data: any) => {
    return await putMenu(id, data);
  };

  const createMenuItem = async (data: any) => {
    return await postMenuItem(data);
  };

  return {
    getMenu,
    getMenus,
    getMenuItems,
    getMenuItem,
    updateMenuItem,
    updateMenu,
    createMenuItem,
  };
});
