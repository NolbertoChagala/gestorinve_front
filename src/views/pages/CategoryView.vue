<template>
  <SidebarComponent>
    <div class="bg-white w-full h-[28vh] rounded-2xl shadow-xl mb-8">
      <div class="pt-10 pl-8 pr-8">
        <h1 class="text-5xl font-bold text-gray-800">Categorías</h1>
        <div class="bg-gray-300 w-full h-[2px] mt-3"></div>
        <div>
          <button @click="isCreateModalOpen = true"
            class="bg-blue-500 text-white py-3 px-6 rounded-lg mt-5 shadow-md hover:bg-blue-600 transition cursor-pointer">
            <strong>+</strong> CREAR CATEGORÍA
          </button>
        </div>
      </div>
    </div>

    <div class="w-full overflow-x-auto">
      <div class="bg-white rounded-lg shadow-xl p-4 min-w-[800px]">
        <table class="table-fixed w-full border-collapse rounded-lg overflow-hidden">

          <thead class="bg-blue-100 text-gray-700">
            <tr>
              <th class="w-1/6 py-3 px-4 text-center">ID</th>
              <th class="w-2/6 py-3 px-4 text-center">Categoría</th>
              <!-- Condición para mostrar el encabezado de Acciones solo si el rol es "Administrador" -->
              <th v-if="userRole === 'Administrador'" class="w-2/6 py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-300">
            <tr v-for="category in paginatedCategories" :key="category.id_categoria"
              class="hover:bg-gray-100 even:bg-gray-50 transition">

              <td class="py-3 px-4 text-center">{{ category.id_categoria }}</td>
              <td class="py-3 px-4 text-center">{{ category.categoria }}</td>

              <td v-if="userRole === 'Administrador'" class="py-3 px-4 text-center space-x-2">

                <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning"
                  @click="openEditModal(category)" />

                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                  @click="confirmDelete(category.id_categoria)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <Paginator :rows="rowsPerPage" :totalRecords="categoryStore.categories.length"
        :rowsPerPageOptions="[10, 20, 30]" @page="onPageChange" />
    </div>

    <AddCategoryModal :isOpen="isCreateModalOpen" @close="isCreateModalOpen = false" />

    <EditCategoryModal :isOpen="isEditModalOpen" :selectedCategory="selectedCategory"
      @close="isEditModalOpen = false" />


    <ConfirmDelete ref="confirmDeleteModal" @confirmDelete="deleteCategory" />
  </SidebarComponent>
</template>

<script setup lang="ts">
import SidebarComponent from '@/components/SidebarComponent.vue';
import AddCategoryModal from '@/components/Modals/AddCategoryModal.vue';
import EditCategoryModal from '@/components/Modals/EditCategoryModal.vue';
import { useCategoryStore } from '@/stores/categoryStore';
import { ref, onMounted, computed } from 'vue';
import ConfirmDelete from '@/components/ConfirmDelete.vue';
import type { ICategory } from '@/interfaces/ICategory';

const categoryStore = useCategoryStore();


const userRole = ref(localStorage.getItem('rol') || '');


onMounted(() => {
  categoryStore.fetchCategories();
});


const isCreateModalOpen = ref(false);
const confirmDeleteModal = ref(null);
const categoryToDelete = ref<number | null>(null);
const isEditModalOpen = ref(false);
const selectedCategory = ref<ICategory | null>(null);


const openEditModal = (category: ICategory) => {
  selectedCategory.value = category;
  isEditModalOpen.value = true;
};


const confirmDelete = (id: number) => {
  categoryToDelete.value = id;
  confirmDeleteModal.value?.show(id);
};


const deleteCategory = async (id: number) => {
  await categoryStore.removeCategory(id);
};


const currentPage = ref(0);
const rowsPerPage = ref(10);


const paginatedCategories = computed(() => {
  const start = currentPage.value * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return categoryStore.categories.slice(start, end);
});


const onPageChange = (event: { page: number, rows: number }) => {
  currentPage.value = event.page;
  rowsPerPage.value = event.rows;
};
</script>
