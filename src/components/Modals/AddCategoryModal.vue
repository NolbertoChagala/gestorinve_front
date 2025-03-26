<template>
  <BaseModal :isOpen="isOpen" title="Crear Categoría" confirmButtonText="Guardar" @close="closeModal"
    @confirm="handleCreateCategory">

    <label for="categoria" class="block text-gray-700 font-medium mb-2">Nombre de la Categoría</label>
    <input v-model="category.categoria" type="text" placeholder="Ejemplo: Electrónica, Ropa, Alimentos..."
      class="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
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