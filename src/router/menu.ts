export const menuRoute = [
  {
    path: '/menu',
    name: 'menu',
    component: () => import('../views/menu/MenuList.vue'),
  },
  {
    path: '/menu/update/:slug',
    name: 'menuUpdate',
    component: () => import('../views/menu/MenuUpdate.vue'),
  },
  {
    path: '/menu-item/update/:id',
    name: 'menuItemUpdate',
    component: () => import('../views/menu/MenuItemUpdate.vue'),
  },
  {
    path: '/menu-item/create/',
    name: 'menuItemCreate',
    component: () => import('../views/menu/MenuItemCreate.vue'),
  },
];
