<template>
    <BaseModal :is-open="isOpen" :title="nuevoProveedor.id_proveedor ? 'Editar Proveedor' : 'Añadir Proveedor'"
        confirmButtonText="Guardar" @close="closeModal" @confirm="guardarProveedor">
        <label class="block">Proveedor</label>
        <input v-model="nuevoProveedor.proveedor" type="text" class="w-full border p-2 rounded-md">

        <label class="block">Teléfono</label>
        <input v-model="nuevoProveedor.telefono" type="number" class="w-full border p-2 rounded-md">

        <label class="block">Correo electrónico</label>
        <input v-model="nuevoProveedor.correo" type="email" class="w-full border p-2 rounded-md">

        <label class="block">Dirección</label>
        <input v-model="nuevoProveedor.direccion" type="text" class="w-full border p-2 rounded-md">
    </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '../BaseModal.vue';
import { useProviderStore } from '@/stores/providerStore';
import type { IProvider } from '@/interfaces/IProvider';
import { ref, watch, defineProps, defineEmits } from 'vue';

const providerStore = useProviderStore();
const emit = defineEmits(['close', 'confirm']);

const props = defineProps({
    proveedorParaEditar: {
        type: Object as () => IProvider,
        default: () => ({
            id_proveedor: 0,
            proveedor: "",
            telefono: "",
            correo: "",
            direccion: ""
        })
    }
});

const isOpen = ref(true);
const nuevoProveedor = ref<IProvider>({ ...props.proveedorParaEditar });

watch(() => props.proveedorParaEditar, (newValue) => {
    nuevoProveedor.value = { ...newValue };
}, { deep: true });

const closeModal = () => {
    isOpen.value = false;
    emit("close");
};

const guardarProveedor = async () => {
    try {
        nuevoProveedor.value.telefono = String(nuevoProveedor.value.telefono);
        if (nuevoProveedor.value.id_proveedor) {
            await providerStore.editProvider(nuevoProveedor.value.id_proveedor, nuevoProveedor.value);
        } else {
            await providerStore.addProvider(nuevoProveedor.value);
        }
        closeModal();
    } catch (error) {
        console.error("Error al guardar el proveedor:", error);
    }
};
</script>
