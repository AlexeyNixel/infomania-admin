import { bookRoute } from './book';
import { createRouter, createWebHistory } from 'vue-router';
import { entryRoute } from '@/router/entry';
import { departmentRoute } from '@/router/department';
import { sliderRoute } from '@/router/slider';
import { documentRoute } from '@/router/document';
import { menuRoute } from '@/router/menu';
import { billboardRoute } from '@/router/billboard';
import { notificationRoute } from './notification';
import { collectionsRoute } from '@/router/collections';
import { videoRoute } from '@/router/video';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/entry/EntryList.vue'),
    },
    {
      path: '/login',
      name: 'auth',
      component: () => import('../views/Auth.vue'),
    },
    {
      path: '/other',
      name: 'other',
      component: () => import('../views/other.vue'),
    },
    ...entryRoute,
    ...departmentRoute,
    ...sliderRoute,
    ...documentRoute,
    ...menuRoute,
    ...billboardRoute,
    ...bookRoute,
    ...notificationRoute,
    ...collectionsRoute,
    ...videoRoute,
  ],
});

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('token') && to.name !== 'auth') {
    localStorage.setItem('nextPage', to.path);
    return next({ name: 'auth' });
  } else {
    return next();
  }
});

export default router;
