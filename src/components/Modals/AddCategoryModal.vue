<template>
    <BaseModal 
      :isOpen="isOpen" 
      title="Crear Categoría" 
      confirmButtonText="Guardar"
      @close="closeModal"
      @confirm="handleCreateCategory"
    >
      <input v-model="newCategory" type="text" placeholder="Nombre de la categoría" class="border p-2 w-full rounded">
    </BaseModal>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits } from 'vue';
  import BaseModal from '@/components/BaseModal.vue';
  
  const props = defineProps({
    isOpen: Boolean, // Control de visibilidad
  });
  
  const emit = defineEmits(['close', 'confirm']);
  
  const newCategory = ref('');
  
  // Métodos
  const closeModal = () => emit('close');
  
  const handleCreateCategory = () => {
    console.log("Categoría creada:", newCategory.value);
    emit('confirm', newCategory.value);
    closeModal();
  };
  </script>
  