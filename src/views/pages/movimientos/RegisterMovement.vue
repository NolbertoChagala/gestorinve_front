<template>
    <SidebarComponent>
        <div class="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer mb-6"
            @click="$router.push('/movimientos')">
            <i class="pi pi-arrow-left text-lg"></i>
            <span class="ml-2 font-medium text-lg">Regresar</span>
        </div>
        
        <div class="flex gap-6 h-screen">
            <!-- Sección izquierda: Registrar movimiento -->
            <div class="w-1/2 bg-white shadow-lg rounded-lg p-4 flex flex-col h-full">
                <h2 class="text-xl font-semibold mb-4 text-gray-800 text-center">Registrar Movimiento</h2>

                <div class="mb-4">
                    <label class="block text-gray-700 font-medium">Tipo de Movimiento:</label>
                    <Dropdown v-model="movementType" :options="['Entrada', 'Salida']" class="w-full mt-2" />
                </div>

                <!-- Contenedor de productos seleccionados -->
                <div class="rounded-lg p-3 flex-grow overflow-auto border border-gray-300 shadow-md">
                    <h3 class="text-md font-semibold mb-3 text-center">Productos Seleccionados</h3>
                    <DataTable :value="selectedProducts" class="p-datatable-sm w-full">
                        <Column field="producto" header="Producto"></Column>
                        <Column header="Cantidad">
                            <template #body="slotProps">
                                <input v-model="slotProps.data.cantidad" type="number" min="1"
                                    class="w-16 text-center border border-gray-400 rounded px-2 py-1" />
                            </template>
                        </Column>
                        <Column header="Deshacer">
                            <template #body="slotProps">
                                <Button icon="pi pi-trash" severity="danger" text
                                    @click="removeProduct(slotProps.index)" />
                            </template>
                        </Column>
                    </DataTable>
                    <p v-if="selectedProducts.length === 0" class="text-gray-500 text-center mt-2">No hay productos
                        seleccionados</p>
                </div>

                <div class="mt-6">
                    <Button label="Registrar Movimiento" icon="pi pi-check" class="w-full" severity="success"
                        @click="registerMovement" />
                </div>
            </div>

            <!-- Sección de productos disponibles -->
            <div class="w-1/2">
                <ProductsList @addProduct="addProduct"/> 
            </div>

        </div>
    </SidebarComponent>
</template>

<script setup>
import SidebarComponent from "@/components/SidebarComponent.vue";
import ProductsList from "./ProductsList.vue";
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useMovementStore } from "@/stores/movementStore";
import { useToast } from "primevue/usetoast";

const movementStore = useMovementStore();
const toast = useToast();

const selectedProducts = ref([]);
const movementType = ref("Entrada");

const addProduct = (product) => {
    const existingProduct = selectedProducts.value.find((p) => p.id_producto === product.id_producto);
    if (existingProduct) {
        existingProduct.cantidad += 1;
    } else {
        selectedProducts.value.push({ ...product, cantidad: 1 });
    }
};

const removeProduct = (index) => {
    selectedProducts.value.splice(index, 1);
};

const registerMovement = async () => {
  if (selectedProducts.value.length === 0) {
    toast.add({ severity: "warn", summary: "Atención", detail: "Debes seleccionar al menos un producto", life: 3000 });
    return;
  }

  // Construir el objeto que espera el servidor
  const movementData = {
    usuario_id: 2,
    tipo_movimiento: movementType.value,
    detalles: selectedProducts.value.map((product) => ({
      producto_id: product.id_producto,
      cantidad: product.cantidad,
    })),
  };

  try {
    const response = await movementStore.addMovement(movementData);
    
    if (response.success) {
      selectedProducts.value = [];
      movementType.value = "Entrada";
    }
  } catch (error) {
    console.error(error);
  }
  
};
</script>