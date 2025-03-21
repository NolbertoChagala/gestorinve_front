<template>
  <div class="p-6">
    <!-- Encabezado y Botón -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Categorías</h1>
      <button 
        @click="isCreateModalOpen = true" 
        class="bg-blue-500 text-white px-5 py-3 text-md rounded-lg hover:bg-blue-600 transition"
      >
        Crear Categoría
      </button>
    </div>

    <!-- Contenedor con Scroll -->
    <div class="w-full overflow-x-auto">
      <table class="table-fixed w-full border-collapse rounded-lg overflow-hidden shadow-lg min-w-[800px]">
        <thead class="bg-gray-200 text-gray-700">
          <tr>
            <th class="w-1/6 py-3 px-4 text-center">ID</th>
            <th class="w-2/6 py-3 px-4 text-center">Categoría</th>
            <th class="w-2/6 py-3 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-300">
          <tr v-for="category in categoryStore.categories" :key="category.id_categoria" class="hover:bg-gray-100 transition">
            <td class="py-3 px-4 text-center">{{ category.id_categoria }}</td>
            <td class="py-3 px-4 text-center">{{ category.categoria }}</td>
            <td class="py-3 px-4 text-center space-x-2">
              <button 
                class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
              >
                ✏️ Editar
              </button>
              <button 
                @click="confirmDelete(category.id_categoria)" 
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                🗑️ Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de Crear Categoría -->
    <AddCategoryModal
      :isOpen="isCreateModalOpen" 
      @close="isCreateModalOpen = false" 
    />

    <!-- Componente de Confirmación de Eliminación -->
    <ConfirmDelete ref="confirmDeleteModal" @confirmDelete="deleteCategory" />
  </div>
</template>

<script setup lang="ts">
import AddCategoryModal from '@/components/Modals/AddCategoryModal.vue';
import { useCategoryStore } from '@/stores/categoryStore';
import { ref, onMounted } from 'vue';
import ConfirmDelete from '@/components/ConfirmDelete.vue';

const categoryStore = useCategoryStore();

// Llamar a las categorías al montar la vista
onMounted(() => {
  categoryStore.fetchCategories();
});

// Estado para manejar la apertura del modal
const isCreateModalOpen = ref(false);
const confirmDeleteModal = ref(null);
const categoryToDelete = ref<number | null>(null);

// Muestra el modal de confirmación con el ID de la categoría
const confirmDelete = (id: number) => {
  categoryToDelete.value = id;
  confirmDeleteModal.value?.show(id);
};

// Elimina la categoría si el usuario confirma
const deleteCategory = async (id: number) => {
  await categoryStore.removeCategory(id);
};
</script>
