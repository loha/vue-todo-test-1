import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('@/views/Create.vue'),
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('@/views/Edit.vue'),
  },
  {
    path: '/404',
    name: 'error',
    component: () => import('@/views/404.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
