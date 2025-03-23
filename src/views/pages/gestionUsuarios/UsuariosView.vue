<template>
        <SidebarComponent>
        <div class="flex flex-col flex-1 items-center justify-center gap-5">
            <div class="bg-white w-full h-[35vh] rounded-2xl shadow-xl">
                <div class="pt-10 pl-8 pr-8">
                    <h1 class="text-5xl font-bold">Gestión de Usuarios</h1>
                    <div class="bg-[#E5E5E5] border w-full mt-3"></div>
                    <div>
                      <!-- Se llama el modalRegister -->
                        <button @click="mostrarModalRegister = true" class="bg-[#5656A7] text-white py-2 rounded-md mt-5 px-5 cursor-pointer">
                            <strong>+</strong> AÑADIR NUEVO USUARIO
                        </button>
                    </div>
                </div>
            </div>
            <div class="bg-white w-full h-full rounded-2xl shadow-xl">
                <table class="w-full rounded-2xl overflow-hidden">
                    <thead class="bg-gray-300">
                        <tr class="text-gray-600">
                            <th class="p-3">NOMBRE</th>
                            <th class="p-3">ROL</th>
                            <th class="p-3">EDITAR</th>
                            <th class="p-3">ELIMINAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for=" usuario in usuarios" :key=" usuario.id_usuario" class="text-gray-500 border-b text-lg">
                            <th class="p-3">{{ usuario.nombre }}</th>
                            <th class="p-3"></th>
                            <th class="p-3">
                                <div class="flex justify-center items-center">
                                    <button
                                        class="bg-[#5656A7] py-3 px-6 cursor-pointer flex justify-around items-center rounded-xl gap-3">
                                        <img :src="editarImage" alt="botonEditar" class="w-6 h-6 filter invert">
                                        <p class="text-sm text-white">Editar</p>
                                    </button>
                                </div>
                            </th>
                            <th class="p-3">
                                <div class="flex justify-center items-center">
                                    <button
                                        class="bg-[#5656A7] py-3 px-6 cursor-pointer flex justify-around items-center rounded-xl gap-3">
                                        <img :src="eliminarImage" alt="botonEliminar" class="w-6 h-6 filter invert">
                                        <p class="text-sm text-white">Eliminar</p>
                                    </button>

                                </div>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <ModalRegister v-if="mostrarModalRegister" @cerrar="mostrarModalRegister = false" />
    </SidebarComponent>
</template>

<script setup lang="ts">
import SidebarComponent from '@/components/SidebarComponent.vue';
import editarImage from '../../../assets/images/editarImage.svg'
import eliminarImage from '../../../assets/images/eliminarImage.svg';
import { useUserStore } from '@/stores/userStore';
import ModalRegister from '@/components/ModalRegister.vue';
import { computed, onMounted, ref } from 'vue';

const mostrarModalRegister = ref<boolean>(false);
const userStore = useUserStore();

onMounted(async () => {
  // console.log("Llmando fecthUsuarios")
  await userStore.fetchUsuarios();
  // console.log("Usuarios", userStore.usuarios)
});

const usuarios = computed(() => userStore.usuarios);


</script>
