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
      component: () => import('../views/pages/pedidos/PedidosView.vue')
    },
    {
      path: '/gestionUsuarios',
      name: 'gestionUsuarios',
      component: () => import('../views/pages/gestionUsuarios/UsuariosView.vue')
    },{
      path: '/gestionRoles',
      name: 'gestionRoles',
      component: () => import('../views/pages/gestionUsuarios/RolesView.vue')
    },
  ],
})

export default router
