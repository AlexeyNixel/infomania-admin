import { defineStore } from 'pinia';
import { findDepartment, findDepartments, postDepartment, putDepartment } from '@/api/department';
import type { ParamsType } from '@/types/models';

export const useDepartmentStore = defineStore('department', () => {
  const getDepartments = async (params?: ParamsType) => {
    return await findDepartments(params);
  };

  const getDepartment = async (slug: string, params?: ParamsType): Promise<any> => {
    return await findDepartment(slug, params);
  };

  const updateDepartment = async (slug: string, data: object) => {
    return await putDepartment(slug, data);
  };

  const createDepartment = async (data: object) => {
    return await postDepartment(data);
  };

  return {
    getDepartment,
    getDepartments,
    updateDepartment,
    createDepartment
  };
});