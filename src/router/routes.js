// import isAuthGuard from 'src/modules/auth/router/authGuard'

import isAuthGuard from 'src/modules/auth/router/authGuard'
import Login from '../modules/auth/router/index'




const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
  },
  {
    path: '/login',
    ...Login
  },
  {
    path: '/logged',
    beforeEnter: [isAuthGuard],
    name: 'home',
    component: () => import('layouts/LoginHome.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
