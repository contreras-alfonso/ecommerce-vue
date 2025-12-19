import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'login',
        component: () => import('pages/auth/Login.vue'),
        meta: { title: 'Cerrar Sesión', requiresAuth: false },
      },

      {
        path: 'logout',
        component: () => import('pages/auth/Logout.vue'),
        meta: { title: 'Iniciar Sesión', requiresAuth: false },
      },
      {
        path: 'register',
        component: () => import('pages/auth/Register.vue'),
        meta: { title: 'Regístrate', requiresAuth: false },
      },
      {
        path: 'product/:id',
        component: () => import('pages/Product.vue'),
        meta: { title: 'Regístrate', requiresAuth: false },
      },
      {
        path: 'store/:id',
        component: () => import('pages/Store.vue'),
        meta: { title: 'Tienda', requiresAuth: false },
      },
      {
        path: 'account/:section',
        component: () => import('pages/Account.vue'),
        meta: { title: 'Iniciar Sesión', requiresAuth: true, rol: ['ADMIN'] },
      },
    ],
  },

  {
    path: '/administration',
    component: () => import('layouts/AdministrationLayout.vue'),
    children: [
      {
        path: 'products',
        component: () => import('pages/administration/products/Index.vue'),
        meta: { title: 'Iniciar Sesión', requiresAuth: true, rol: ['ADMIN'] },
      },
      {
        path: 'products/:id',
        component: () => import('pages/administration/products/Create.vue'),
        meta: { title: 'Iniciar Sesión', requiresAuth: true, rol: ['ADMIN'] },
      },
      {
        path: 'categories',
        component: () => import('pages/administration/categories/Index.vue'),
        meta: { title: 'Iniciar Sesión', requiresAuth: true, rol: ['ADMIN'] },
      },
      {
        path: 'brands',
        component: () => import('pages/administration/brands/Index.vue'),
        meta: { title: 'Iniciar Sesión', requiresAuth: true, rol: ['ADMIN'] },
      },
      {
        path: 'colors',
        component: () => import('pages/administration/colors/Index.vue'),
        meta: { title: 'Iniciar Sesión', requiresAuth: true, rol: ['ADMIN'] },
      },
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
