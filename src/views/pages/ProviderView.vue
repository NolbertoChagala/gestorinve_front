<template>
    <SidebarComponent>
        <div class="flex flex-col flex-1 items-center justify-center gap-5">
            <div class="bg-white w-full h-[35vh] rounded-2xl shadow-xl">
                <div class="pt-10 pl-8 pr-8">
                    <h1 class="text-5xl font-bold">Proveedores</h1>
                    <div class="bg-[#E5E5E5] border w-full mt-3"></div> <!-- linea -->
                    <div>
                        <button @click="abrirModalCrear"
                            class="bg-[#5656A7] text-white py-2 rounded-md mt-5 px-5 cursor-pointer">
                            <strong>+</strong> AÑADIR PROVEEDOR
                        </button>
                    </div>
                </div>
            </div>
            <div class="bg-white w-full h-full rounded-2xl shadow-xl">
                <table class="w-full rounded-t-2xl overflow-hidden">
                    <thead class="bg-gray-300">
                        <tr class="text-gray-600">
                            <th class="p-3">PROVEEDOR</th>
                            <th class="p-3">TELEFONO</th>
                            <th class="p-3">CORREO ELECTRONICO</th>
                            <th class="p-3">DIRECCIÓN</th>
                            <th class="p-3">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="provider in providers" :key="provider.id_proveedor"
                            class="text-gray-500 border-b text-lg">
                            <th class="p-3">{{ provider.proveedor }}</th>
                            <th class="p-3">{{ provider.telefono }}</th>
                            <th class="p-3">{{ provider.correo }}</th>
                            <th class="p-3">{{ provider.direccion }}</th>
                            <th class="p-3">
                                <div class="flex justify-center items-center gap-5">
                                    <button @click="abrirModalEditar(provider)"
                                        class="bg-[#5656A7] p-2.5 cursor-pointer flex justify-around items-center rounded-xl gap-3">
                                        <img :src="editarImage" alt="botonEditar" class="w-6 h-6 filter invert">
                                        <p class="text-sm text-white">Editar</p>
                                    </button>
                                    <button @click="eliminarProveedor(provider.id_proveedor)"
                                        class="bg-[#5656A7] p-2.5 cursor-pointer flex justify-around items-center rounded-xl gap-3">
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
    </SidebarComponent>
    <ModalProvider v-if="mostrarModal" :proveedorParaEditar="proveedorSeleccionado" @cerrar="cerrarModal" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import editarImage from '../../assets/images/editarImage.svg'
import eliminarImage from '../../assets/images/eliminarImage.svg'
import SidebarComponent from '@/components/SidebarComponent.vue';
import { useProviderStore } from '@/stores/providerStore';
import ModalProvider from '@/components/ModalProvider.vue';
import type { IProvider } from '@/interfaces/IProvider';

const providerStore = useProviderStore();
const providers = computed(() => providerStore.providers);
onMounted(() => {
    providerStore.fetchProviders()
});

const mostrarModal = ref(false);
const proveedorSeleccionado = ref<IProvider | null>(null);

const abrirModalCrear = () => {
    proveedorSeleccionado.value = null;
    mostrarModal.value = true;
};

const abrirModalEditar = (provider: IProvider) => {
    proveedorSeleccionado.value = { ...provider };
    mostrarModal.value = true;
};

const cerrarModal = () => {
    mostrarModal.value = false;
    proveedorSeleccionado.value = null;
};

const eliminarProveedor = async (id_proveedor: number) => {
    try {
        await providerStore.removeProvider(id_proveedor);
    } catch (error) {
        console.error("Error al eliminar proveedor:", error);
    }
};
</script>