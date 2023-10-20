export const menuRoute = [
  {
    path: '/menu',
    name: 'menu',
    component: () => import('../views/menu/MenuList.vue')
  },
  {
    path: '/menu/update/:slug',
    name: 'menuUpdate',
    component: () => import('../views/menu/MenuUpdate.vue')
  },
  {
    path: '/menu/create/',
    name: 'menuCreate',
    component: () => import('../views/menu/MenuCreate.vue')
  },
]