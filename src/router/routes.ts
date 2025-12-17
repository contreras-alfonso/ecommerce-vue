import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', component: () => import('pages/Register.vue') },
      { path: 'product/:id', component: () => import('pages/Product.vue') },
      { path: 'store/:id', component: () => import('pages/Store.vue') },
      { path: 'account/:section', component: () => import('pages/Account.vue') },
    ],
  },

  {
    path: '/administration',
    component: () => import('layouts/AdministrationLayout.vue'),
    children: [
      { path: 'products', component: () => import('pages/administration/products/Index.vue') },
      { path: 'products/:id', component: () => import('pages/administration/products/Create.vue') },
      { path: 'categories', component: () => import('pages/administration/categories/Index.vue') },
      { path: 'brands', component: () => import('pages/administration/brands/Index.vue') },
      { path: 'colors', component: () => import('pages/administration/colors/Index.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
