<template>
    <div class="bg-white h-full w-[20vw] rounded-2xl shadow-xl">
        <div class="mt-6 ml-4 mr-4">
            <div class="bg-gray-200 w-full h-[10vh] rounded-xl flex justify-center items-center gap-10">
                <img :src="usuarioImage" alt="unaimagen" class="w-14 h-14">
                <div>
                    <h2 class="font-bold text-base">Coto Chagala</h2>
                    <p class="text-sm">Administrador</p>
                </div>
            </div>

            <div class="flex flex-col justify-center gap-6 mt-20">
                <!-- Boton para stock -->
                <button 
                    @click="navegar('stock')" 
                    :class="['flex items-center justify-center w-full h-[7vh] rounded-xl border border-[#CDCDCD] cursor-pointer',
                            cambiarColor === 'stock' ? 'bg-[#9191DE] hover:bg-[#7a7ad6] text-white font-bold' : 'bg-[#FAFAFA] hover:bg-[#E6E6E6]']">
                    <h2 class="text-black font-bold">STOCK</h2>
                </button>
                <!-- Boton para pedidos -->
                <button 
                    @click="navegar('pedidos')" 
                    :class="['flex items-center justify-center w-full h-[7vh] rounded-xl border border-[#CDCDCD] cursor-pointer',
                            cambiarColor === 'pedidos' ? 'bg-[#9191DE] hover:bg-[#7a7ad6] text-white font-bold' : 'bg-[#FAFAFA] hover:bg-[#E6E6E6]']">
                    <h2 class="text-black font-bold">MOVIMIENTOS</h2>
                </button>
                <div>
                    <!-- Boton para gestión de usuarios -->
                    <button @click="toggleGestionUsuarios" :class="{ 'rounded-b-none': isGestionUsuariosOpen }"
                        class="bg-[#FAFAFA] hover:bg-[#E6E6E6] flex items-center justify-center w-full h-[7vh] border border-[#CDCDCD] px-6 rounded-xl shadow-sm transition-all duration-300 cursor-pointer">
                        <span class="text-black font-bold">GESTIÓN DE USUARIOS</span>
                        <span :class="{ 'rotate-180': isGestionUsuariosOpen }"
                            class="text-black ml-auto transition-transform duration-300">
                            <img :src="flechaAbajoImage" alt="flechaAbajoImage" class="w-5 h-5">
                        </span>
                    </button>
                    <!-- Submenús -->
                    <transition name="slide">
                        <div v-if="isGestionUsuariosOpen" class="flex flex-col overflow-hidden">
                            <button @click="navegar('gestionUsuarios')"
                                :class="['w-full text-left px-4 py-3 border border-[#CDCDCD] cursor-pointer transition-all',
                                    cambiarColor === 'gestionUsuarios' ? 'bg-[#9191DE] hover:bg-[#7a7ad6] text-white font-bold' : 'bg-[#E6E6E6] text-[#040509] hover:bg-gray-300']">
                                USUARIOS
                            </button>

                            <button @click="navegar('gestionRoles')"
                                :class="['w-full text-left px-4 py-3 rounded-b-xl border border-[#CDCDCD] cursor-pointer transition-all',
                                    cambiarColor === 'gestionRoles' ? 'bg-[#9191DE] hover:bg-[#7a7ad6] text-white font-bold' : 'bg-[#E6E6E6] text-[#040509] hover:bg-gray-300']">
                                ROLES
                            </button>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import usuarioImage from '../assets/images/usuarioImage.svg'
import flechaAbajoImage from '../assets/images/flechaAbajoImage.svg'
import Button from 'primevue/button';


const isGestionUsuariosOpen = ref(false);
const toggleGestionUsuarios = () => {
    isGestionUsuariosOpen.value = !isGestionUsuariosOpen.value;
}


// para poder cambiar el color a los botones
const router = useRouter();
const route = useRoute();
const cambiarColor = ref(route.name as string);

watch(() => route.name, (newName) => {
    cambiarColor.value = newName as string;
})

function navegar(ruta: string) {
    cambiarColor.value = ruta;
    router.push({ name: ruta })
}

</script>

<style>
/* Animación de deslizamiento */
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
