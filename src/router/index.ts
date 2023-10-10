import { createRouter, createWebHistory } from 'vue-router';
import { entryRoute } from '@/router/entry';
import { departmentRoute } from '@/router/department';
import { sliderRoute } from '@/router/slider';
import { documentRoute } from '@/router/document';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: import('../views/entry/EntryList.vue'),
    },
    {
      path: '/login',
      name: 'auth',
      component: import('../views/Auth.vue'),
    },
    ...entryRoute,
    ...departmentRoute,
    ...sliderRoute,
    ...documentRoute,
  ],
});

export default router;
