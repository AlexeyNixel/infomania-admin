export const notificationRoute = [
  {
    path: '/notification',
    name: 'notification',
    component: () => import('../views/notification/NotificationList.vue'),
  },
  {
    path: '/notification/update/:id',
    name: 'notificationUpdate',
    component: () => import('../views/notification/NotificationUpdate.vue'),
  },
  {
    path: '/notification/create',
    name: 'notificationCreate',
    component: () => import('../views/notification/NotificationCreate.vue'),
  },
];
