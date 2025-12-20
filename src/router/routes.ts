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
        meta: { title: 'Producto', requiresAuth: false },
      },
      {
        path: '/:categorySlug',
        component: () => import('pages/Catalog.vue'),
        meta: { title: 'Tienda', requiresAuth: false },
      },
      {
        path: 'account/:section',
        component: () => import('pages/Account.vue'),
        meta: { title: 'Perfil', requiresAuth: true, rol: ['ADMIN', 'USER'] },
      },
    ],
  },

  {
    path: '/administration',
    component: () => import('layouts/AdministrationLayout.vue'),
    redirect: '/administration/products',
    children: [
      {
        path: 'products',
        component: () => import('pages/administration/products/Index.vue'),
        meta: { title: 'Productos', requiresAuth: true, rol: ['ADMIN'] },
      },
      {
        path: 'products/:id',
        component: () => import('pages/administration/products/Create.vue'),
        meta: { title: 'Producto', requiresAuth: true, rol: ['ADMIN'] },
      },
      {
        path: 'categories',
        component: () => import('pages/administration/categories/Index.vue'),
        meta: { title: 'Categorías', requiresAuth: true, rol: ['ADMIN'] },
      },
      {
        path: 'brands',
        component: () => import('pages/administration/brands/Index.vue'),
        meta: { title: 'Marcas', requiresAuth: true, rol: ['ADMIN'] },
      },
      {
        path: 'colors',
        component: () => import('pages/administration/colors/Index.vue'),
        meta: { title: 'Colores', requiresAuth: true, rol: ['ADMIN'] },
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/ErrorNotFound.vue'),
        meta: { title: 'Cerrar Sesión', requiresAuth: false },
      },
    ],
  },
];

export default routes;
