<template>
  <SidebarComponent>
    <!-- Encabezado con Buscador, Botón y Filtro -->
    <div class="bg-white w-full h-[28vh] rounded-2xl shadow-xl mb-8">
      <div class="pt-10 pl-8 pr-8">
        <h1 class="text-5xl font-bold text-gray-800">Inventario</h1>
        <div class="bg-gray-300 w-full h-[2px] mt-3"></div>
        <div class="flex items-center mt-5">
          <!-- Botón para abrir el modal de agregar producto -->
          <button @click="isCreateModalOpen = true"
            class="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition cursor-pointer">
            <strong>+</strong> AÑADIR PRODUCTO
          </button>
          <!-- Buscador de productos centrado -->
          <div class="flex-1 flex justify-center">
            <input type="text" v-model="searchQuery" placeholder="Buscar producto..."
              class="w-2/3 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <!-- Filtro por Proveedor -->
          <div class="ml-4">
            <select v-model="selectedProvider"
              class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500">
              <option value="">Todos los proveedores</option>
              <option v-for="provider in uniqueProviders" :key="provider" :value="provider">{{ provider }}</option>
            </select>
          </div>
          <!-- Filtro por Categoría -->
          <div class="ml-4">
            <select v-model="selectedCategory"
              class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500">
              <option value="">Todas las categorías</option>
              <option v-for="category in uniqueCategories" :key="category" :value="category">{{ category }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenedor con Scroll -->
    <div class="w-full overflow-x-auto">
      <div class="bg-white rounded-lg shadow-xl p-4">
        <table class="table-fixed w-full border-collapse rounded-lg overflow-hidden min-w-[800px]">
          <thead class="bg-blue-100 text-gray-700">
            <tr>
              <th class="w-1/6 py-3 px-4 text-center">PRODUCTO</th>
              <th class="w-1/6 py-3 px-4 text-center">STOCK</th>
              <th class="w-1/6 py-3 px-4 text-center">PRECIO UNITARIO</th>
              <th class="w-1/6 py-3 px-4 text-center">PROVEEDOR</th>
              <th class="w-1/6 py-3 px-4 text-center">CATEGORÍA</th>
              <th class="w-1/6 py-3 px-4 text-center">ACCIONES</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr v-for="product in filteredProducts" :key="product.id_producto"
              class="hover:bg-gray-100 even:bg-gray-50 transition">
              <td class="py-3 px-4 text-center">{{ product.producto }}</td>
              <td class="py-3 px-4 text-center">{{ product.stock }}</td>
              <td class="py-3 px-4 text-center">
                ${{ product.precio_unitario ? product.precio_unitario.toFixed(2) : '0.00' }}
              </td>
              <td class="py-3 px-4 text-center">{{ product.proveedor }}</td>
              <td class="py-3 px-4 text-center">{{ product.categoria }}</td>

              <td class="py-3 px-4 text-center space-x-2">
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning" @click="openEditModal(product)" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                  @click="confirmDelete(product.id_producto)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <Paginator :rows="rowsPerPage" :totalRecords="filteredProducts.length" :rowsPerPageOptions="[10, 20, 30]"
        @page="onPageChange" />
    </div>

    <!-- Modales -->
    <AddProductModal :isOpen="isCreateModalOpen" @close="isCreateModalOpen = false" />
    <EditProductModal :isOpen="isEditModalOpen" @close="isEditModalOpen = false" :selectedProduct="selectedProduct" />
    <ConfirmDelete ref="confirmDeleteModal" @confirmDelete="deleteProduct" />
  </SidebarComponent>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useInventoryStore } from '@/stores/inventoryStore';
import SidebarComponent from '@/components/SidebarComponent.vue';
import AddProductModal from '@/components/Modals/AddProductModal.vue';
import EditProductModal from '@/components/Modals/EditProductModal.vue';
import ConfirmDelete from '@/components/ConfirmDelete.vue';
import type { IEditProduct } from '@/interfaces/IEditProduct';

const inventoryStore = useInventoryStore();

const isCreateModalOpen = ref(false);
const isEditModalOpen = ref(false);
const confirmDeleteModal = ref(null);
const selectedProduct = ref<IEditProduct | null>(null);

const searchQuery = ref('');
const selectedProvider = ref('');
const selectedCategory = ref('');

onMounted(() => {
  inventoryStore.fetchProducts();
});

const uniqueProviders = computed(() => {
  return [...new Set(inventoryStore.products.map(product => product.proveedor))];
});

const uniqueCategories = computed(() => {
  return [...new Set(inventoryStore.products.map(product => product.categoria))];
});

const filteredProducts = computed(() => {
  return inventoryStore.products.filter(product => {
    return (
      (!searchQuery.value || product.producto.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
      (!selectedProvider.value || product.proveedor === selectedProvider.value) &&
      (!selectedCategory.value || product.categoria === selectedCategory.value)
    );
  });
});

const openEditModal = (product: IEditProduct) => {
  selectedProduct.value = product;
  isEditModalOpen.value = true;
};

const confirmDelete = (id: number) => {
  confirmDeleteModal.value?.show(id);
};

const deleteProduct = async (id: number) => {
  await inventoryStore.removeProduct(id);
};
</script>
