export const sliderRoute = [
  {
    path: '/slides',
    name: 'slides',
    component: () => import('../views/slider/SlideList.vue')
  },
  {
    path: '/slides/update/:slug',
    name: 'slidesUpdate',
    component: () => import('../views/slider/SlideUpdate.vue')
  },
  {
    path: '/slides/create/',
    name: 'slidesCreate',
    component: () => import('../views/slider/SlideCreate.vue')
  },
]