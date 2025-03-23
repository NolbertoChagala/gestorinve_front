<template>
    <BaseModal
      :isOpen="isOpen"
      title="Crear Categoría"
      confirmButtonText="Guardar"
      @close="closeModal"
      @confirm="handleCreateCategory"
    >
      <input v-model="category.categoria" type="text" placeholder="Nombre de la categoría" class="border p-2 w-full rounded">
    </BaseModal>
  </template>

  <script setup lang="ts">
  import { ref, defineProps, defineEmits } from 'vue';
  import BaseModal from '@/components/BaseModal.vue';
  import { useCategoryStore } from '@/stores/categoryStore';
  import type { ICategory } from '@/interfaces/ICategory';

  const categoryStore = useCategoryStore();

  const props = defineProps({
    isOpen: Boolean, // Control de visibilidad
  });

  const emit = defineEmits(['close', 'confirm']);

  const category = ref<ICategory>({
    id_categoria: 0,
    categoria: ''
  })

  // Métodos
  const closeModal = () => {
    category.value.categoria = '';
    emit('close');
  }

  const handleCreateCategory = async () => {
    if (!category.value.categoria.trim()) return; // Validar campo vacío
    await categoryStore.addCategory(category.value); // Llamar al store directamente
    closeModal();
  };
  </script>
