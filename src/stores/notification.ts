import {
  findNotification,
  findNotificationById,
  postNotification,
  putNotification,
} from './../api/notification';
import { findAllNotifications } from '@/api/notification';
import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', () => {
  const getNotifications = async () => {
    return await findAllNotifications();
  };

  const getNotification = async () => {
    return await findNotification();
  };

  const getNotificationById = async (id: string) => {
    return await findNotificationById(id);
  };

  const updateNotification = async (id: string, data: any) => {
    return await putNotification(id, data);
  };

  const createNotification = async (data: any) => {
    return await postNotification(data);
  };

  return {
    getNotifications,
    getNotification,
    getNotificationById,
    updateNotification,
    createNotification,
  };
});
