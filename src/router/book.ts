export const bookRoute = [
  {
    path: '/book',
    name: 'book',
    component: () => import('../views/book/BookList.vue'),
  },
  {
    path: '/book/update/:slug',
    name: 'bookUpdate',
    component: () => import('../views/book/BookUpdate.vue'),
  },
  {
    path: '/book/create/',
    name: 'bookCreate',
    component: () => import('../views/book/BookCreate.vue'),
  },
];
