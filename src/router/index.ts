import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/pages/LoginView.vue')
    },
    {
      path: '/stock',
      name: 'stock',
      component: () => import('../views/pages/StockView.vue')
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: () => import('../views/pages/PedidosView.vue')
    },
  ],
})

export default router
