export const entryRoute = [
  {
    path: '/entry/update/:slug',
    name: 'entryUpdate',
    component: import('../views/entry/EntryUpdate.vue'),
  },
  {
    path: '/entry/create/',
    name: 'entryCreate',
    component: import('../views/entry/EntryCreate.vue'),
  },
  {
    path: '/entry/',
    name: 'entries',
    component: import('../views/entry/EntryList.vue'),
  },
];