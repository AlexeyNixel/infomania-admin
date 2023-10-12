export const documentRoute = [
  {
    path: '/documents',
    name: 'documents',
    component: () => import('../views/document/DocumentList.vue')
  },
  {
    path: '/document/update/:slug',
    name: 'documentUpdate',
    component: () => import('../views/document/DocumentUpdate.vue')
  },
  {
    path: '/document/create/',
    name: 'documentCreate',
    component: () => import('../views/document/DocumentCreate.vue')
  },
]