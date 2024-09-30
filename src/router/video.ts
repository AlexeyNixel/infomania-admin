export const videoRoute = [
  {
    path: '/video',
    name: 'video',
    component: () => import('../views/video/VideoList.vue'),
  },
  {
    path: '/billboard/update/:slug',
    name: 'billboardUpdate',
    component: () => import('../views/billboard/BillboardUpdate.vue'),
  },
  {
    path: '/billboard/create/',
    name: 'billboardCreate',
    component: () => import('../views/billboard/BillboardCreate.vue'),
  },
];
