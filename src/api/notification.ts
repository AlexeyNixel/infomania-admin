import { axiosApi } from './axios';
import { Routes } from '@/api/routes';

const { NOTIFICATION_ROUTE } = Routes;

export const findAllNotifications = async () => {
  const { data } = await axiosApi.get(`${NOTIFICATION_ROUTE}all`);
  return data;
};

export const findNotification = async () => {
  const { data } = await axiosApi.get(NOTIFICATION_ROUTE);
  return data;
};

export const findNotificationById = async (id: string) => {
  const { data } = await axiosApi.get(NOTIFICATION_ROUTE + id);
  return data;
};

export const postNotification = async (notification: any) => {
  return await axiosApi.post(NOTIFICATION_ROUTE, notification);
};

export const putNotification = async (id: string, notification: any) => {
  return await axiosApi.put(NOTIFICATION_ROUTE + id, notification);
};
