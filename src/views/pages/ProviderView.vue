<template>
    <SidebarComponent>
        <div class="bg-white w-full rounded-2xl shadow-xl mb-8 pb-6">
            <div class="pt-10 pl-8 pr-8">
                <h1 class="text-5xl font-bold text-gray-800">Proveedores</h1>
                <div class="bg-gray-300 w-full h-[2px] mt-3"></div>
                <div>
                    <button @click="abrirModalCrear"
                        class="bg-blue-500 text-white py-2 px-6 rounded-lg mt-5 shadow-md hover:bg-blue-600 transition cursor-pointer">
                        <strong>+</strong> AÑADIR PROVEEDOR
                    </button>
                </div>
            </div>
        </div>

        <div class="w-full overflow-x-auto">
            <div class="bg-white rounded-lg shadow-xl p-4">
                <table class="table-fixed w-full border-collapse rounded-lg overflow-hidden min-w-[800px]">
                    <thead class="bg-blue-100 text-gray-700">
                        <tr>
                            <th class="w-1/6 py-3 px-4 text-center">PROVEEDOR</th>
                            <th class="w-1/6 py-3 px-4 text-center">TELÉFONO</th>
                            <th class="w-1/6 py-3 px-4 text-center">CORREO ELECTRÓNICO</th>
                            <th class="w-1/6 py-3 px-4 text-center">DIRECCIÓN</th>
                            <th class="w-1/6 py-3 px-4 text-center">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-300">
                        <tr v-for="provider in providers" :key="provider.id_proveedor"
                            class="hover:bg-gray-100 even:bg-gray-50 transition">
                            <td class="py-3 px-4 text-center">{{ provider.proveedor }}</td>
                            <td class="py-3 px-4 text-center">{{ provider.telefono }}</td>
                            <td class="py-3 px-4 text-center">{{ provider.correo }}</td>
                            <td class="py-3 px-4 text-center">{{ provider.direccion }}</td>
                            <td class="py-3 px-4 text-center space-x-2">
                                <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning"
                                    @click="abrirModalEditar(provider)" />

                                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                                    @click="confirmDelete(provider.id_proveedor)" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <ModalProvider v-if="mostrarModal" :is-open="mostrarModal" :proveedor-para-editar="proveedorSeleccionado"
            @close="cerrarModal" />
        <ConfirmDelete ref="confirmDeleteModal" @confirmDelete="eliminarProveedor" />

    </SidebarComponent>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import SidebarComponent from '../../components/SidebarComponent.vue';
import { useProviderStore } from '@/stores/providerStore';
import ModalProvider from '@/components/Modals/AddProviderModal.vue';
import type { IProvider } from '@/interfaces/IProvider';
import ConfirmDelete from '@/components/ConfirmDelete.vue';

const providerStore = useProviderStore();
const providers = computed(() => providerStore.providers);

onMounted(() => {
    providerStore.fetchProviders();
});

const mostrarModal = ref(false);
const confirmDeleteModal = ref<InstanceType<typeof ConfirmDelete> | null>(null);

const proveedorSeleccionado = ref<IProvider>({
    // En lugar de asignar null, reseteamos a valores vacíos
    id_proveedor: 0,
    proveedor: "",
    telefono: "",
    correo: "",
    direccion: ""
});


const abrirModalCrear = () => {
    proveedorSeleccionado.value = {
        id_proveedor: 0,
        proveedor: "",
        telefono: "",
        correo: "",
        direccion: ""
    };
    mostrarModal.value = true;
};

const abrirModalEditar = (provider: IProvider) => {
    proveedorSeleccionado.value = { ...provider };
    mostrarModal.value = true;
};

const cerrarModal = () => {
    mostrarModal.value = false;
    // Reseteamos proveedorSeleccionado en lugar de asignar null
    proveedorSeleccionado.value = {
        id_proveedor: 0,
        proveedor: "",
        telefono: "",
        correo: "",
        direccion: ""
    };
};

const confirmDelete = (id: number) => {
    if (confirmDeleteModal.value) {
        confirmDeleteModal.value.show(id);
    } else {
        console.error("El modal de confirmación no está disponible");
    }
};

const eliminarProveedor = async (id_proveedor: number) => {
    try {
        await providerStore.removeProvider(id_proveedor);
    } catch (error) {
        console.error("Error al eliminar proveedor:", error);
    }
};
</script>
