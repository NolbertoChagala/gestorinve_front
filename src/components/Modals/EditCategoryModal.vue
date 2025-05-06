<template>
    <BaseModal :isOpen="isOpen" title="Editar Categoría" confirmButtonText="Actualizar" @close="closeModal"
        @confirm="handleUpdateCategory">
        <label for="categoria" class="block text-gray-700 font-medium mb-2">Nombre de la Categoría</label>
        <input id="categoria" v-model="category.categoria" type="text"
            placeholder="Ejemplo: Electrónica, Ropa, Alimentos..."
            class="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
    </BaseModal>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';
import BaseModal from '@/components/BaseModal.vue';
import { useCategoryStore } from '@/stores/categoryStore';
import type { ICategory } from '@/interfaces/ICategory';

const categoryStore = useCategoryStore();

const props = defineProps({
    isOpen: Boolean,
    selectedCategory: Object as () => ICategory | null
});

const emit = defineEmits(['close', 'confirm']);

const category = ref<ICategory>({
    id_categoria: 0,
    categoria: ''
});


watch(() => props.selectedCategory, (newCategory) => {
    if (newCategory) {
        category.value = { ...newCategory };
    }
}, { immediate: true });


const closeModal = () => {
    emit('close');
};

const handleUpdateCategory = async () => {
    if (!category.value.categoria.trim()) return; 
    await categoryStore.editCategory(category.value.id_categoria, category.value);
    closeModal();
};
</script>
