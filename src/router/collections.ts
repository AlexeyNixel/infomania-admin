export const collectionsRoute = [
  {
    path: '/collections',
    name: 'collections',
    component: () => import('../views/collections/CollectionsList.vue'),
  },
  {
    path: '/collection/update/:id',
    name: 'collectionUpdate',
    component: () => import('../views/collections/CollectionUpdate.vue'),
  },
  {
    path: '/collection/create',
    name: 'collectionCreate',
    component: () => import('../views/collections/CollectionCreate.vue'),
  },
  // {
  //   path: '/department/update/:slug',
  //   name: 'departmentUpdate',
  //   component: () => import('../views/department/DepartmentUpdate.vue')
  // },
  // {
  //   path: '/department/create/',
  //   name: 'departmentCreate',
  //   component: () => import('../views/department/DepartmentCreate.vue')
  // },
];
