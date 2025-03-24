<template>
    <SidebarComponent>
        <!-- Contenedor superior -->
        <div class="bg-white w-full h-[28vh] rounded-2xl shadow-xl mb-8">
            <div class="pt-10 pl-8 pr-8">
                <h1 class="text-5xl font-bold text-gray-800">Movimientos de Inventario</h1>
                <div class="bg-gray-300 w-full h-[2px] mt-3"></div>
                <div>
                    <button
                        class="bg-blue-500 text-white py-3 px-6 rounded-lg mt-5 shadow-md hover:bg-blue-600 transition cursor-pointer">
                        <strong>+</strong> REGISTRAR MOVIMIENTO
                    </button>
                </div>
            </div>
        </div>

        <div class="w-full overflow-x-auto">
            <div class="bg-white rounded-lg shadow-xl p-4 min-w-[800px]">
                <table class="table-fixed w-full border-collapse rounded-lg overflow-hidden">

                    <thead class="bg-blue-100 text-gray-700">
                        <tr>
                            <th class="w-1/6 py-3 px-4 text-center">No.</th>
                            <th class="w-2/6 py-3 px-4 text-center">Registrado por:</th>
                            <th class="w-2/6 py-3 px-4 text-center">Tipo de Movimiento</th>
                            <th class="w-2/6 py-3 px-4 text-center">Fecha de registro</th>
                            <th class="w-2/6 py-3 px-4 text-center">Detalles</th>
                        </tr>
                    </thead>

                    <!-- Cuerpo de la tabla -->
                    <tbody v-if="movementStore.movements.length > 0" class="divide-y divide-gray-300">
                        <tr v-for="movement in paginatedMovements" :key="movement.id_movimiento"
                            class="hover:bg-gray-100 even:bg-gray-50 transition">
                            <td class="py-3 px-4 text-center">{{ movement.id_movimiento }}</td>
                            <td class="py-3 px-4 text-center">{{ movement.usuario_nombre }}</td>
                            <td class="py-3 px-4 text-center">
                                <span
                                    :class="movement.tipo_movimiento === 'Entrada' ? 'text-green-600' : 'text-red-600'">
                                    {{ movement.tipo_movimiento.toUpperCase() }}
                                </span>
                            </td>
                            <td class="py-3 px-4 text-center">{{ movement.fecha_registro.split('T')[0] }}
                            </td>
                            <td class="py-3 px-4 text-center">
                                <router-link :to="`/detalles/${movement.id_movimiento}`"
                                    class="text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2 transition">
                                    <i class="pi pi-eye"></i>
                                    <span class="underline">Ver Detalles</span>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="5" class="py-6 text-center text-gray-500">No hay movimientos registrados.</td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>

        <!-- Paginador Componente -->
        <div class="flex justify-center mt-4">
            <Paginator :rows="rowsPerPage" :totalRecords="movementStore.movements.length"
                :rowsPerPageOptions="[10, 20, 30]" @page="onPageChange" />
        </div>

    </SidebarComponent>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
import { useMovementStore } from '@/stores/movementStore';

const movementStore = useMovementStore();

// Llamar a fetchMovements cuando se monte la vista
onMounted(() => {
    movementStore.fetchMovements();
});

// Estado para manejar la paginación
const currentPage = ref(0);
const rowsPerPage = ref(10);

// Obtener los movimientos paginados
const paginatedMovements = computed(() => {
    const start = currentPage.value * rowsPerPage.value;
    const end = start + rowsPerPage.value;
    return movementStore.movements.slice(start, end);
});

// Manejar el cambio de página
const onPageChange = (event: { page: number, rows: number }) => {
    currentPage.value = event.page;
    rowsPerPage.value = event.rows;
};
</script>
