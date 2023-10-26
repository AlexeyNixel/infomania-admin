export const billboardRoute = [
  {
    path: '/billboard',
    name: 'billboard',
    component: () => import('../views/billboard/BillboardList.vue')
  },
  {
    path: '/billboard/update/:slug',
    name: 'billboardUpdate',
    component: () => import('../views/department/DepartmentUpdate.vue')
  },
  {
    path: '/billboard/create/',
    name: 'billboardCreate',
    component: () => import('../views/department/DepartmentCreate.vue')
  },
]