<template>
    <SidebarComponent>
        <div class="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer mb-6"
            @click="$router.push('/movimientos')">
            <i class="pi pi-arrow-left text-lg"></i>
            <span class="ml-2 font-medium text-lg">Regresar</span>
        </div>

        <!-- Contenedor del detalle -->
        <div v-if="movement" class="bg-white w-full rounded-2xl shadow-xl p-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">Detalles del Movimiento</h1>

            <!-- Tarjetas con información -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div class="bg-white border-l-4 border-blue-500 p-5 rounded-lg shadow-md">
                    <p class="text-gray-500 text-sm">Número de Movimiento</p>
                    <p class="text-xl font-semibold text-gray-800">{{ movement?.id_movimiento }}</p>
                </div>

                <div class="bg-white p-5 rounded-lg shadow-md border-l-4"
                    :class="movement?.tipo_movimiento === 'Entrada' ? 'border-green-500' : 'border-red-500'">
                    <p class="text-gray-500 text-sm">Tipo de Movimiento</p>
                    <p :class="movement?.tipo_movimiento === 'Entrada' ? 'text-green-600' : 'text-red-600'"
                        class="text-xl font-semibold">
                        {{ movement?.tipo_movimiento }}
                    </p>
                </div>

                <div class="bg-white border-l-4 border-indigo-500 p-5 rounded-lg shadow-md">
                    <p class="text-gray-500 text-sm">Registrado por</p>
                    <p class="text-xl font-semibold text-gray-800">{{ movement?.usuario_nombre }}</p>
                </div>

                <div class="bg-white border-l-4 border-purple-500 p-5 rounded-lg shadow-md">
                    <p class="text-gray-500 text-sm">Fecha de Registro</p>
                    <p class="text-xl font-semibold text-gray-800">{{ formatFecha(movement.fecha_registro) }}</p>
                </div>

                <div class="bg-white border-l-4 border-yellow-500 p-5 rounded-lg shadow-md">
                    <p class="text-gray-500 text-sm">Hora de Registro</p>
                    <p class="text-xl font-semibold text-gray-800">{{ formatHora(movement.fecha_registro) }}</p>
                </div>

                <div v-if="movement?.tipo_movimiento === 'Salida'"
                    class="bg-white border-l-4 border-orange-500 p-5 rounded-lg shadow-md">
                    <p class="text-gray-500 text-sm">Total de la Salida</p>
                    <p class="text-xl font-semibold text-black">$ {{ totalSalida }}</p>
                </div>

            </div>

            <!-- Título de la sección de productos -->
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Productos registrados</h2>

            <!-- Tabla de productos -->
            <div class="bg-white rounded-lg shadow-xl p-4">
                <table class="table-auto w-full border-collapse rounded-lg overflow-hidden">
                    <thead class="bg-blue-100 text-gray-700">
                        <tr>
                            <th class="py-3 px-4 text-center">Producto</th>
                            <th class="py-3 px-4 text-center">Cantidad</th>
                            <th class="py-3 px-4 text-center">Precio Unitario</th>
                            <th class="py-3 px-4 text-center">Stock</th>
                            <th class="py-3 px-4 text-center">Nuevo Stock</th>
                            <th v-if="movement?.tipo_movimiento === 'Salida'" class="py-3 px-4 text-center">Total</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-300">
                        <tr v-for="producto in movement?.detalles" :key="producto.producto_id"
                            class="hover:bg-gray-100 even:bg-gray-50 transition">
                            <td class="py-3 px-4 text-center">{{ producto.producto_nombre }}</td>
                            <td class="py-3 px-4 text-center">{{ producto.cantidad }}</td>
                            <td class="py-3 px-4 text-center">$ {{ producto.precio_unitario }}</td>
                            <td class="py-3 px-4 text-center">{{ producto.stock_anterior }}</td>
                            <td class="py-3 px-4 text-center">{{ producto.stock_nuevo }}</td>
                            <td v-if="movement?.tipo_movimiento === 'Salida'" class="py-3 px-4 text-center">$ {{
                                producto.total }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Mostrar mensaje si no hay datos -->
        <div v-else class="text-center text-gray-600 mt-10">
            <p>Cargando detalles del movimiento...</p>
        </div>

    </SidebarComponent>
</template>

<script setup lang="ts">
import SidebarComponent from '@/components/SidebarComponent.vue';
import { useMovementStore } from '@/stores/movementStore';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const movementStore = useMovementStore();
const route = useRoute();

const movement = computed(() => movementStore.movementDetails);

onMounted(async () => {
    // Obtener el ID desde la URL
    const movementId = Number(route.params.id);
    await movementStore.fetchMovementDetails(movementId);
})

// Función para formatear la fecha
const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString();
};

// Función para formatear la hora
const formatHora = (fecha: string) => {
    return new Date(fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const totalSalida = computed(() => {
    if (movement.value?.tipo_movimiento === 'Salida') {
        return movement.value.detalles.reduce((sum, producto) => sum + producto.total, 0);
    }
    return 0;
});
</script>
