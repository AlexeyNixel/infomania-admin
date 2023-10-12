import { defineStore } from 'pinia';
import { axiosApi } from '@/api/axios';
import type { ParamsType } from '@/types/models';
import { ref } from 'vue';

export const useAdminStore = defineStore('admin', () => {
  const token = ref<string>(localStorage.getItem('token') || '');
  const username = ref<string>(localStorage.getItem('username') || '');

  const getAllModel = async (url: string, params?: ParamsType) => {
    const { data } = await axiosApi.get(url, { params });
    return data;
  };

  return {
    token,
    username,
    getAllModel,
  };
});