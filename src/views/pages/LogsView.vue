<template>
    <SidebarComponent>
        <div class="bg-white w-full h-[28vh] rounded-2xl shadow-xl mb-8">
            <div class="pt-10 pl-8 pr-8">
                <h1 class="text-5xl font-bold text-gray-800">Logs</h1>
                <div class="bg-gray-300 w-full h-[2px] mt-3"></div>
                <div>
                    <button
                        @click="confirmDelete"
                        class="bg-red-500 text-white py-3 px-6 rounded-lg mt-5 shadow-md hover:bg-red-600 transition cursor-pointer">
                        <i class="pi pi-trash mr-2"></i>
                        Eliminar Todos
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
                            <th class="w-2/6 py-3 px-4 text-center">Mensaje</th>
                            <th class="w-2/6 py-3 px-4 text-center">Endpoint</th>
                            <th class="w-2/6 py-3 px-4 text-center">Codigo de Estado</th>
                            <th class="w-2/6 py-3 px-4 text-center">Fecha de Registro</th>
                        </tr>
                    </thead>


                    <tbody v-if="logStore.logs.length > 0" class="divide-y divide-gray-300">
                        <tr v-for="log in paginatedLogs" :key="log.id_log"
                            class="hover:bg-gray-100 even:bg-gray-50 transition">
                            <td class="py-3 px-4 text-center">{{ log.id_log }}</td>
                            <td class="py-3 px-4 text-center">{{ log.mensaje }}</td>
                            <td class="py-3 px-4 text-center">{{ log.endpoint }}</td>
                            <td class="py-3 px-4 text-center">{{ log.status_code }}</td>
                            <td class="py-3 px-4 text-center">{{ log.fecha_registro.split('T')[0] }}
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="5" class="py-6 text-center text-gray-500">No hay logs registrados.</td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>


        <div class="flex justify-center mt-4">
            <Paginator :rows="rowsPerPage" :totalRecords="logStore.logs.length"
                :rowsPerPageOptions="[10, 20, 30]" @page="onPageChange" />
        </div>

        <ConfirmDialog />

    </SidebarComponent>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from 'primevue/useconfirm';
import { useLogStore } from '@/stores/logStore';

const logStore = useLogStore();
const confirm = useConfirm();


onMounted(() => {
    logStore.fetchLogs();
});


const currentPage = ref(0);
const rowsPerPage = ref(10);


const paginatedLogs = computed(() => {
    const start = currentPage.value * rowsPerPage.value;
    const end = start + rowsPerPage.value;
    return logStore.logs.slice(start, end);
});


const onPageChange = (event: { page: number, rows: number }) => {
    currentPage.value = event.page;
    rowsPerPage.value = event.rows;
};


const confirmDelete = () => {
    confirm.require({
        message: '¿Estás seguro de que deseas eliminar todos los logs? Esta acción no se puede deshacer.',
        header: 'Confirmar eliminación',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Eliminar',
        rejectLabel: 'Cancelar',
        acceptClass: 'p-button-danger',
        rejectClass: 'p-button-secondary',
        accept: async () => {
            await logStore.removeAllLogs();
        }
    });
};
</script>
