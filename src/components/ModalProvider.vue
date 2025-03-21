<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black/50">
        <div class="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 class="text-xl font-bold">{{ nuevoProveedor.id_proveedor ? 'Editar Proveedor' : 'Añadir Proveedor' }}
            </h2>

            <div class="mt-4">
                <label class="block">Proveedor</label>
                <input v-model="nuevoProveedor.proveedor" type="text" class="w-full border p-2 rounded-md">
            </div>

            <div class="mt-4">
                <label class="block">Telefono</label>
                <input v-model="nuevoProveedor.telefono" type="number" class="w-full border p-2 rounded-md">
            </div>

            <div class="mt-4">
                <label class="block">Correo electrónico</label>
                <input v-model="nuevoProveedor.correo" type="text" class="w-full border p-2 rounded-md">
            </div>

            <div class="mt-4">
                <label class="block">Dirección</label>
                <input v-model="nuevoProveedor.direccion" type="text" class="w-full border p-2 rounded-md">
            </div>

            <div class="flex justify-end gap-3 mt-5">
                <button @click="guardarProveedor" class="px-4 py-2 bg-[#5656A7] text-white rounded-md cursor-pointer">
                    {{ nuevoProveedor.id_proveedor ? 'Actualizar' : 'Guardar' }}
                </button>
                <button @click="$emit('cerrar')"
                    class="px-4 py-2 bg-gray-500 text-white rounded-md cursor-pointer">Cerrar</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useProviderStore } from '@/stores/providerStore';
import type { IProvider } from '@/interfaces/IProvider';

const emit = defineEmits(['cerrar']);
const providerStore = useProviderStore();

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

const nuevoProveedor = ref<IProvider>({ ...props.proveedorParaEditar });

watch(() => props.proveedorParaEditar, (newVal) => {
    nuevoProveedor.value = { ...newVal };
}, { deep: true });

const guardarProveedor = async () => {
    try {
        nuevoProveedor.value.telefono = String(nuevoProveedor.value.telefono);
        if (nuevoProveedor.value.id_proveedor) {
            await providerStore.editProvider(nuevoProveedor.value.id_proveedor, nuevoProveedor.value);
        } else {
            await providerStore.addProvider(nuevoProveedor.value);
        }
        emit("cerrar");
    } catch (error) {
        console.error("Error al guardar el proveedor:", error);
    }
};
</script>