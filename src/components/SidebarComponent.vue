<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isCollapsed = ref(false);
const showUserMenu = ref(false);

const menuItems = [
    { label: "Dashboard", icon: "pi pi-home", route: "/" },
    { label: "Usuarios", icon: "pi pi-users", route: "/usuarios" },
    { label: "Roles", icon: "pi pi-id-card", route: "/roles" },
    { label: "Categorías", icon: "pi pi-list", route: "/categorias" },
    { label: "Inventario", icon: "pi pi-box", route: "/inventario" },
    { label: "Proveedores", icon: "pi pi-truck", route: "/proveedores" },
    { label: "Movimientos", icon: "pi pi-history", route: "/movimientos" },
];

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

            <!-- Menu -->
            <ul class="px-2 flex-grow mt-4">
                <li v-for="item in menuItems" :key="item.label" @click="navigate(item.route)"
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
                        Amy Elsner
                    </span>
                    <i v-if="!isCollapsed" class="pi ml-auto"
                        :class="showUserMenu ? 'pi-angle-up' : 'pi-angle-down'"></i>
                </div>

                <!-- Dropdown Menu -->
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

        <!-- Contenido dinámico -->
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
