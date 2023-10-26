export const billboardRoute = [
  {
    path: '/billboard',
    name: 'billboard',
    component: () => import('../views/billboard/BillboardList.vue')
  },
  {
    path: '/billboard/update/:slug',
    name: 'billboardUpdate',
    component: () => import('../views/billboard/BillboardUpdate.vue')
  },
  {
    path: '/billboard/create/',
    name: 'billboardCreate',
    component: () => import('../views/billboard/BillboardCreate.vue')
  },
]