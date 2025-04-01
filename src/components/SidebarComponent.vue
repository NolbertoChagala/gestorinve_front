<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isCollapsed = ref(false);
const showUserMenu = ref(false);

const userName = ref('');
const userRole = ref('');

const menuItems = [
  { label: "Dashboard", icon: "pi pi-home", route: "/dashboard",roles: ['Administrador', 'Usuario'] },
  { label: "Usuarios", icon: "pi pi-users", route: "/usuarios", roles: ['Administrador'] },
  { label: "Roles", icon: "pi pi-id-card", route: "/roles", roles: ['Administrador'] },
  { label: "Categorías", icon: "pi pi-list", route: "/categorias", roles: ['Administrador', 'Usuario'] },
  { label: "Inventario", icon: "pi pi-box", route: "/inventario", roles: ['Administrador', 'Usuario'] },
  { label: "Proveedores", icon: "pi pi-truck", route: "/proveedores", roles: ['Administrador','Usuario'] },
  { label: "Movimientos", icon: "pi pi-history", route: "/movimientos", roles: ['Administrador', 'Usuario'] },
];

const filteredMenuItems = ref([]);

onMounted(() => {
  const user = localStorage.getItem('user');
  const role = localStorage.getItem('rol');
  if (user) {
    userName.value = user;
  }
  if (role) {
    userRole.value = role;
    filteredMenuItems.value = menuItems.filter(item => item.roles && item.roles.includes(role));
  }
});

const navigate = (route) => {
  router.push(route);
  if (isCollapsed.value) isCollapsed.value = false;
};

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  showUserMenu.value = false;
};

const logout = () => {
  console.log("Cerrando sesión...");
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('rol');
  router.push('/login');
};

</script>

<template>
  <div class="flex h-screen">
    <div class="h-screen bg-white shadow-xl flex flex-col transition-all duration-300 ease-in-out"
         :class="isCollapsed ? 'w-16' : 'w-64'">
      <div class="px-4 py-4 border-b border-gray-300 flex items-center">
        <h1 v-if="!isCollapsed" class="text-lg font-bold text-gray-800 transition-opacity duration-300">
          Gestor Inventario
        </h1>
        <button @click="toggleSidebar" class="p-2 rounded-md hover:bg-gray-200 transition ml-auto cursor-pointer">
          <i class="pi text-lg" :class="isCollapsed ? 'pi pi-bars' : 'pi pi-angle-left'"></i>
        </button>
      </div>

      <ul class="px-2 flex-grow mt-4">
        <!-- Recorremos el menú filtrado -->
        <li v-for="item in filteredMenuItems" :key="item.label" @click="navigate(item.route)"
            class="flex items-center gap-4 p-3 cursor-pointer rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition">
          <i class="text-lg" :class="item.icon"></i>
          <span v-if="!isCollapsed" class="text-sm font-medium transition-opacity duration-300">
            {{ item.label }}
          </span>
        </li>
      </ul>

      <div class="p-3">
        <div class="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition"
             @click="showUserMenu = !showUserMenu">
          <i class="pi pi-user text-lg"></i>
          <span v-if="!isCollapsed" class="ml-3 text-sm font-medium transition-opacity duration-300">
            {{ userName }}
          </span>
          <i v-if="!isCollapsed" class="pi ml-auto" :class="showUserMenu ? 'pi-angle-up' : 'pi-angle-down'"></i>
        </div>

        <transition name="fade">
          <div v-if="showUserMenu && !isCollapsed"
               class="absolute bottom-12 left-3 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
            <button class="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-100 transition"
                    @click="logout">
              <i class="pi pi-sign-out mr-2"></i> Cerrar sesión
            </button>
          </div>
        </transition>
      </div>
    </div>

    <div class="flex-1 p-6 bg-gray-100 h-screen overflow-y-auto transition-all">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
