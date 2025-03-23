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
      component: () => import('../views/pages/LoginView.vue'),
    },
    {
      path: '/inventario',
      name: 'inventario',
      component: () => import('../views/pages/InventoryView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/movimientos',
      name: 'movimientos',
      component: () => import('../views/pages/pedidos/PedidosView.vue')
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/pages/gestionUsuarios/UsuariosView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/roles',
      name: 'roles',
      component: () => import('../views/pages/gestionUsuarios/RolesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/proveedores',
      name: 'proveedores',
      component: () => import('../views/pages/ProviderView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: () => import('../views/pages/CategoryView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: ()=>import ('../views/404.vue')
    }
  ],
})

export default router
