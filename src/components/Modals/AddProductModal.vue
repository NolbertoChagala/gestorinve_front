<template>
  <BaseModal :isOpen="isOpen" @close="closeModal" title="Añadir Producto" @confirm="handleCreateProduct">
    <!-- Formulario para añadir un producto -->
    <div>
      <label for="producto" class="block text-gray-700 font-medium mb-2">Producto</label>
      <input type="text" v-model="product.producto" required placeholder="Ejemplo: Electrónica, Television...."
        class="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
    </div>
    <div>
      <label for="stock" class="block text-gray-700 font-medium mb-2">Stock</label>
      <input type="number" v-model="product.stock" required
        class="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
    </div>
    <div>
      <label for="precio_unitario" class="block text-gray-700 font-medium mb-2">Precio Unitario</label>
      <input type="number" v-model="product.precio_unitario" required
        class="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
    </div>
    <div>
      <label for="proveedor" class="block text-gray-700 font-medium mb-2">Proveedor</label>
      <select v-model="product.proveedor_id"
        class="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
        <option v-for="provider in providerStore.providers" :key="provider.id_proveedor" :value="provider.id_proveedor">
          {{ provider.proveedor }}</option>
      </select>
    </div>
    <div>
      <label for="categoria" class="block text-gray-700 font-medium mb-2">Categoría</label>
      <select v-model="product.categoria_id"
        class="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
        <option v-for="category in categoryStore.categories" :key="category.id_categoria"
          :value="category.id_categoria">{{ category.categoria }}</option>
      </select>
    </div>
  </BaseModal>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useInventoryStore } from '@/stores/inventoryStore';
import { useCategoryStore } from '@/stores/categoryStore';
import { useProviderStore } from '@/stores/providerStore';
import BaseModal from '../BaseModal.vue';
import type { ICreateProduct } from '@/interfaces/ICreateProduct';

const inventoryStore = useInventoryStore();
const categoryStore = useCategoryStore();
const providerStore = useProviderStore();

const props = defineProps({
  isOpen: Boolean, // Control de visibilidad
});

const emit = defineEmits(['close', 'confirm']);

// Métodos
const closeModal = () => {
  emit('close');
}

// Estado reactivo del producto
const product = ref<ICreateProduct>({
  producto: '',
  stock: 0,
  precio_unitario: 0,
  proveedor_id: 0,
  categoria_id: 0,
});

onMounted(() => {
  categoryStore.fetchCategories();
  providerStore.fetchProviders();
})

const handleCreateProduct = async () => {
  await inventoryStore.addProduct(product.value);
  closeModal();
};
</script>