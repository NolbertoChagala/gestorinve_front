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
      meta: { requiresAuth: true, roles: ['Administrador','Usuario'] },
    },
    {
      path: '/movimientos',
      name: 'movimientos',
      component: () => import('../views/pages/movimientos/MovementsView.vue'),
      meta: { requiresAuth: true, roles: ['Administrador','Usuario'] },
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/pages/gestionUsuarios/UsuariosView.vue'),
      meta: { requiresAuth: true, roles: ['Administrador'] },
    },
    {
      path: '/roles',
      name: 'roles',
      component: () => import('../views/pages/gestionUsuarios/RolesView.vue'),
      meta: { requiresAuth: true, roles: ['Administrador'] },
    },
    {
      path: '/proveedores',
      name: 'proveedores',
      component: () => import('../views/pages/ProviderView.vue'),
      meta: { requiresAuth: true, roles: ['Administrador','Usuario'] },
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: () => import('../views/pages/CategoryView.vue'),
      meta: { requiresAuth: true, roles: ['Administrador','Usuario'] },
    },
    {
      path: '/:pathMatch(.*)*',
      component: ()=>import ('../views/404.vue')
    },
    {
      path: '/detalles/:id',
      name: 'detalles',
      component: () => import('../views/pages/movimientos/MovementDetails.vue'),
      meta: { requiresAuth: true },
    }
  ],
})


// Guard de navegación global para verificar el token y el rol
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('rol'); // Asegúrate de que 'rol' esté bien almacenado

  // Si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    // Si no hay token, redirigir al login
    if (!token) {
      next({ name: 'login' });
    } else {
      // Verifica si el rol está permitido para la ruta
      const allowedRoles = to.meta.roles || [];
      if (allowedRoles.length && !allowedRoles.includes(role)) {
        // Si el rol no está permitido, redirigir a una página predeterminada
        next({ name: 'inventario' }); // Redirigir a una página por defecto
      } else {
        next();
      }
    }
  } else {
    next(); // Si no se requiere autenticación, continuar
  }
});

export default router
