<template>
  <SidebarComponent>
    <!-- Encabezado y Botón -->
    <div class="bg-white w-full h-[28vh] rounded-2xl shadow-xl mb-8">
      <div class="pt-10 pl-8 pr-8">
        <h1 class="text-5xl font-bold text-gray-800">Inventario</h1>
        <div class="bg-gray-300 w-full h-[2px] mt-3"></div>
        <div>
          <!-- Botón para abrir el modal de agregar producto -->
          <button @click="isCreateModalOpen = true"
            class="bg-blue-500 text-white py-3 px-6 rounded-lg mt-5 shadow-md hover:bg-blue-600 transition cursor-pointer">
            <strong>+</strong> AÑADIR PRODUCTO
          </button>
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
            <tr v-for="product in paginatedProducts" :key="product.id_producto"
              class="hover:bg-gray-100 even:bg-gray-50 transition">
              <td class="py-3 px-4 text-center">{{ product.producto }}</td>
              <td class="py-3 px-4 text-center">{{ product.stock }}</td>
              <td class="py-3 px-4 text-center">
                ${{ product.precio_unitario ? product.precio_unitario.toFixed(2) : '0.00' }}
              </td>
              <td class="py-3 px-4 text-center">{{ product.proveedor }}</td>
              <td class="py-3 px-4 text-center">{{ product.categoria }}</td>

              <td class="py-3 px-4 text-center space-x-2">
                <!-- Botón Editar -->
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning" @click="openEditModal(product)" />
                <!-- Botón Eliminar -->
                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                  @click="confirmDelete(product.id_producto)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <Paginator :rows="rowsPerPage" :totalRecords="inventoryStore.products.length" :rowsPerPageOptions="[10, 20, 30]"
        @page="onPageChange" />
    </div>

    <!-- Modal para agregar producto -->
    <AddProductModal :isOpen="isCreateModalOpen" @close="isCreateModalOpen = false" />

    <!-- Modal para editar producto -->
    <EditProductModal :isOpen="isEditModalOpen" @close="isEditModalOpen = false" :selectedProduct="selectedProduct" />

    <ConfirmDelete ref="confirmDeleteModal" @confirmDelete="deleteProduct" />

  </SidebarComponent>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useInventoryStore } from '@/stores/inventoryStore';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import SidebarComponent from '@/components/SidebarComponent.vue';
import AddProductModal from '@/components/Modals/AddProductModal.vue';
import EditProductModal from '@/components/Modals/EditProductModal.vue';
import ConfirmDelete from '@/components/ConfirmDelete.vue';
import type { IEditProduct } from '@/interfaces/IEditProduct';

const inventoryStore = useInventoryStore();
const confirm = useConfirm();
const toast = useToast();

// Estados para abrir y cerrar los modales
const isCreateModalOpen = ref(false); // Modal de agregar producto
const isEditModalOpen = ref(false);   // Modal de editar producto
const confirmDeleteModal = ref(null);
const productToDelete = ref<number | null>(null);
const selectedProduct = ref<IEditProduct | null>(null);

// Cargar productos al montar el componente
onMounted(() => {
  inventoryStore.fetchProducts();
});

// Abrir modal de edición de producto
const openEditModal = (product: IEditProduct) => {
  selectedProduct.value = product,
    isEditModalOpen.value = true;
};

const confirmDelete = (id: number) => {
  productToDelete.value = id;
  confirmDeleteModal.value?.show(id);
};

const deleteProduct = async (id: number) => {
  await inventoryStore.removeProduct(id);
};

const currentPage = ref(0);
const rowsPerPage = ref(10);


const paginatedProducts = computed(() => {
  const start = currentPage.value * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return inventoryStore.products.slice(start, end);
});


const onPageChange = (event: { page: number, rows: number }) => {
  currentPage.value = event.page;
  rowsPerPage.value = event.rows;
};
</script>
