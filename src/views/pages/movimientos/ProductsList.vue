<template>
    <div class="w-full bg-white shadow-lg rounded-lg p-4 flex flex-col h-full">
        <h2 class="text-xl font-semibold mb-4 text-gray-800 text-center">Productos Disponibles</h2>

        <div class="mb-4 flex items-center bg-gray-200 p-2 rounded border border-gray-300">
            <i class="pi pi-search text-gray-500 mr-2"></i>
            <InputText v-model="searchQuery" placeholder="Buscar producto..."
                class="w-full p-inputtext-sm bg-transparent border-0 focus:outline-none" />
        </div>

        <div class="flex-grow overflow-auto border border-gray-300 rounded shadow-md">
            <DataTable :value="filteredProducts" class="p-datatable-sm w-full">
                <Column field="producto" header="Producto"></Column>
                <Column field="stock" header="Stock"></Column>
                <Column field="precio_unitario" header="Precio">
                    <template #body="slotProps">
                        {{ new Intl.NumberFormat('es-MX', {
                            style: 'currency', currency: 'MXN'
                        }).format(slotProps.data.precio_unitario) }}
                    </template>
                </Column>

                <Column header="Agregar">
                    <template #body="slotProps">
                        <Button icon="pi pi-plus" severity="success" text @click="addProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useInventoryStore } from "@/stores/inventoryStore";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

const inventoryStore = useInventoryStore();

// Variables para manejar la búsqueda
const searchQuery = ref("");
const emit = defineEmits();

// Filtrado de productos según la búsqueda
const filteredProducts = computed(() => {
    return inventoryStore.products.filter((product) =>
        product.producto.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

// Emitir evento para agregar un producto al componente padre
const addProduct = (product) => {
    const productToAdd = { ...product, cantidad: 1 };  // Se agrega una cantidad inicial
    emit("addProduct", productToAdd);
};

onMounted(() => {
    inventoryStore.fetchProducts();
});
</script>
