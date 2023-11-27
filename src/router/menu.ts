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
  // {
  //   path: '/menu-item',
  //   name: 'menuItem',
  //   component: () => import('../views/menu-item/MenuItemList.vue'),
  // },
  // {
  //   path: '/menu-item/update/:slug',
  //   name: 'menuItemUpdate',
  //   component: () => import('../views/menu-item/MenuItemUpdate.vue'),
  // },
  // {
  //   path: '/menu-item/create/',
  //   name: 'menuItemCreate',
  //   component: () => import('../views/menu-item/MenuItemCreate.vue'),
  // },
];
