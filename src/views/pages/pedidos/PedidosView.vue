<template>
    <div class="flex h-screen gap-5 p-5">
        <SidebarComponent />
        <div class="flex flex-col flex-1 items-center justify-center gap-5">
            <!-- Contenedor superior -->
            <div class="bg-white w-full h-[35vh] rounded-2xl shadow-xl p-5 flex flex-col gap-5">
                <h1 class="text-5xl font-bold">Movimientos</h1>
                <!-- Contenedor para la fecha -->
                <div class="flex justify-end">
                    <p class="text-lg font-semibold">{{ fechaActual }}</p>
                </div>

                <!-- Contenedor para el botón de filtro -->
                <div class="relative flex justify-end">
                    <Button @mouseover="mostrarFiltro = true" @mouseleave="ocultarFiltro" label="Filtrar Movimientos"
                        class="bg-[#5656A7] text-white py-3 px-6 rounded-lg shadow-md cursor-pointer transition-all hover:bg-[#4646a1] hover:shadow-lg"
                        style="color: white !important; font-size: 1.1rem; font-weight: 600;" />

                    <div v-if="mostrarFiltro" @mouseover="mantenerFiltro" @mouseleave="ocultarFiltro"
                        class="absolute bg-white shadow-lg rounded-md p-3 top-full right-0 mt-2 w-48">
                        <p class="cursor-pointer p-2 hover:bg-gray-100" @click="filtrarPedidos('todos')">Todos los
                            pedidos</p>
                        <p class="cursor-pointer p-2 hover:bg-gray-100" @click="filtrarPedidos('antiguos')">Pedidos
                            antiguos</p>
                        <p class="cursor-pointer p-2 hover:bg-gray-100" @click="filtrarPedidos('recientes')">Pedidos
                            recientes</p>
                    </div>
                </div>
            </div>

            <!-- Contenedor de la tabla -->
            <div class="bg-white w-full h-full rounded-2xl shadow-xl p-5">
                <table class="w-full rounded-2xl overflow-hidden">
                    <thead class="bg-gray-300">
                        <tr class="text-gray-600">
                            <th class="p-3 text-left">Fecha</th>
                            <th class="p-3 text-left">Precio</th>
                            <th class="p-3 text-left">Abonado</th>
                            <th class="p-3 text-center">Ver Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-gray-500 border-b text-lg" v-for="(pedido, index) in pedidosFiltrados"
                            :key="index">
                            <td class="p-3">{{ pedido.fecha }}</td>
                            <td class="p-3">{{ pedido.precio }}</td>
                            <td class="p-3">{{ pedido.abonado }}</td>
                            <td class="p-3 text-center">
                                <Button
                                    class="bg-[#5656A7] p-2.5 flex justify-around items-center rounded-xl gap-3 cursor-pointer text-white"
                                    @click="verPedido(pedido)">
                                    <i class="pi pi-eye text-lg text-slate-300"></i>
                                    <span class="text-sm text-white">Ver Detalle</span>
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Button from 'primevue/button';
import SidebarComponent from '@/components/SidebarComponent.vue';

const fechaActual = ref(new Date().toLocaleDateString());
const mostrarFiltro = ref(false);
const filtroSeleccionado = ref("todos");

const pedidos = ref([
    { fecha: "17/03/2025", precio: "$500", abonado: "Sí" },
    { fecha: "16/03/2025", precio: "$1200", abonado: "No" },
    { fecha: "15/03/2025", precio: "$700", abonado: "Sí" }
]);

const pedidosFiltrados = computed(() => {
    if (filtroSeleccionado.value === "todos") {
        return pedidos.value;
    } else if (filtroSeleccionado.value === "antiguos") {
        return pedidos.value.filter(p => new Date(p.fecha.split("/").reverse().join("-")) < new Date());
    } else if (filtroSeleccionado.value === "recientes") {
        return pedidos.value.filter(p => new Date(p.fecha.split("/").reverse().join("-")) >= new Date());
    }
    return pedidos.value;
});

const filtrarPedidos = (tipo: string) => {
    filtroSeleccionado.value = tipo;
};

const ocultarFiltro = () => {
    setTimeout(() => {
        mostrarFiltro.value = false;
    }, 3000);
};

const mantenerFiltro = () => {
    mostrarFiltro.value = true;
};

const verPedido = (pedido: any) => {
    console.log("Ver pedido:", pedido);
};
</script>

<style scoped>
.p-button {
    background-color: #5656A7 !important;
    border: none !important;
}
</style>
