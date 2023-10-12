export const departmentRoute = [
  {
    path: '/department',
    name: 'department',
    component: () => import('../views/department/DepartmentList.vue')
  },
  {
    path: '/department/update/:slug',
    name: 'departmentUpdate',
    component: () => import('../views/department/DepartmentUpdate.vue')
  },
  {
    path: '/department/create/',
    name: 'departmentCreate',
    component: () => import('../views/department/DepartmentCreate.vue')
  },
]