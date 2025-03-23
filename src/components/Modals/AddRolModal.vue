<template>
    <BaseModal 
        :isOpen="isOpen" 
        title="Crear Rol" 
        confirmButtonText="Guardar"
        @close="closeModal"
        @confirm="handleCreateRol"
    >
        <input v-model="rol.rol" type="text" placeholder="Nombre del rol" class="border p-2 w-full rounded">
    </BaseModal>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import BaseModal from '@/components/BaseModal.vue';
import { useRolStore } from '@/stores/rolStore';
import type { IRol } from '@/interfaces/IRol';

const rolStore = useRolStore();

const props = defineProps({
    isOpen: Boolean, // Control de visibilidad
});

const emit = defineEmits(['close', 'confirm']);

const rol = ref<IRol>({
    id_rol: 0,
    rol: ''
})

// Métodos  
const closeModal = () => {
    rol.value.rol = '';
    emit('close');
}

const handleCreateRol = async () => {
    if (!rol.value.rol.trim()) return; // Validar campo vacío
    await rolStore.createRol(rol.value); // Llamar al store directamente
    closeModal();
};
</script>