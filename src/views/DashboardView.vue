<template>
    <SidebarComponent>
        <div class="flex flex-wrap justify-center gap-8 mb-4 p-5">
            <div class="w-full md:w-[calc(50%-16px)] xl:w-[calc(25%-24px)]" v-if="userRole === 'Administrador'">
                <div class="bg-white rounded-2xl flex flex-col overflow-hidden h-full">
                    <div class="flex items-center p-4">
                        <li class="pi pi-users !text-5xl text-blue-500"></li>
                        <div class="ml-4">
                            <span class="text-blue-500 block whitespace-nowrap">Usuarios</span>
                            <span class="text-blue-500 block text-3xl font-bold">{{ userCount }}</span>
                        </div>
                    </div>
                    <svg class="w-full text-blue-500/50" viewBox="0 0 308 51" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_dd_1305_5001)">
                            <path
                                d="M0 36L14.603 43.5983C17.4961 45.1036 20.9415 45.1036 23.8345 43.5983L36.2677 37.129C37.6932 36.3873 39.2765 36 40.8835 36H55.2103C56.8172 36 58.4005 35.6127 59.8261 34.871L76.875 26L91.4779 18.4017C94.371 16.8964 97.8164 16.8964 100.71 18.4017L113.143 24.871C114.568 25.6127 116.152 26 117.758 26H132.085C133.692 26 135.276 26.3873 136.701 27.129L149.134 33.5983C152.027 35.1036 155.473 35.1036 158.366 33.5983L168.353 28.4017C171.246 26.8964 174.691 26.8964 177.585 28.4017L185.547 32.545C189.484 34.5932 194.299 33.8024 197.374 30.6029L210.268 17.1841C211.022 16.4 211.898 15.744 212.863 15.242L223.985 9.45496C227.921 7.40676 232.737 8.19755 235.811 11.3971L244.657 20.6029C247.732 23.8025 252.547 24.5932 256.484 22.545L264.447 18.4017C267.34 16.8964 270.785 16.8964 273.678 18.4017L283.665 23.5983C286.559 25.1036 290.004 25.1036 292.897 23.5983L307.5 16V51H0V36Z" />
                        </g>
                    </svg>
                </div>
            </div>

            <div class="w-full md:w-[calc(50%-16px)] xl:w-[calc(25%-24px)]" v-if="userRole === 'Administrador'">
                <div class="bg-white rounded-2xl flex flex-col overflow-hidden h-full">
                    <div class="flex items-center p-4">
                        <li class="pi pi-shield !text-5xl text-purple-500"></li>
                        <div class="ml-4">
                            <span class="text-purple-500 block whitespace-nowrap">Roles</span>
                            <span class="text-purple-500 block text-3xl font-bold">{{ rolCount }}</span>
                        </div>
                    </div>
                    <svg class="w-full text-purple-500/50" viewBox="0 0 308 51" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_dd_1305_5001)">
                            <path
                                d="M0 36L14.603 43.5983C17.4961 45.1036 20.9415 45.1036 23.8345 43.5983L36.2677 37.129C37.6932 36.3873 39.2765 36 40.8835 36H55.2103C56.8172 36 58.4005 35.6127 59.8261 34.871L76.875 26L91.4779 18.4017C94.371 16.8964 97.8164 16.8964 100.71 18.4017L113.143 24.871C114.568 25.6127 116.152 26 117.758 26H132.085C133.692 26 135.276 26.3873 136.701 27.129L149.134 33.5983C152.027 35.1036 155.473 35.1036 158.366 33.5983L168.353 28.4017C171.246 26.8964 174.691 26.8964 177.585 28.4017L185.547 32.545C189.484 34.5932 194.299 33.8024 197.374 30.6029L210.268 17.1841C211.022 16.4 211.898 15.744 212.863 15.242L223.985 9.45496C227.921 7.40676 232.737 8.19755 235.811 11.3971L244.657 20.6029C247.732 23.8025 252.547 24.5932 256.484 22.545L264.447 18.4017C267.34 16.8964 270.785 16.8964 273.678 18.4017L283.665 23.5983C286.559 25.1036 290.004 25.1036 292.897 23.5983L307.5 16V51H0V36Z" />
                        </g>
                    </svg>
                </div>
            </div>

            <div class="w-full md:w-[calc(50%-16px)] xl:w-[calc(25%-24px)]">
                <div class="bg-white rounded-2xl flex flex-col overflow-hidden h-full">
                    <div class="flex items-center p-4">
                        <li class="pi pi-tags !text-5xl text-yellow-500"></li>
                        <div class="ml-4">
                            <span class="text-yellow-500 block whitespace-nowrap">Categorias</span>
                            <span class="text-yellow-500 block text-3xl font-bold">{{ categoryCount }}</span>
                        </div>
                    </div>
                    <svg class="w-full text-yellow-500/50" viewBox="0 0 308 51" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_dd_1305_5001)">
                            <path
                                d="M0 36L14.603 43.5983C17.4961 45.1036 20.9415 45.1036 23.8345 43.5983L36.2677 37.129C37.6932 36.3873 39.2765 36 40.8835 36H55.2103C56.8172 36 58.4005 35.6127 59.8261 34.871L76.875 26L91.4779 18.4017C94.371 16.8964 97.8164 16.8964 100.71 18.4017L113.143 24.871C114.568 25.6127 116.152 26 117.758 26H132.085C133.692 26 135.276 26.3873 136.701 27.129L149.134 33.5983C152.027 35.1036 155.473 35.1036 158.366 33.5983L168.353 28.4017C171.246 26.8964 174.691 26.8964 177.585 28.4017L185.547 32.545C189.484 34.5932 194.299 33.8024 197.374 30.6029L210.268 17.1841C211.022 16.4 211.898 15.744 212.863 15.242L223.985 9.45496C227.921 7.40676 232.737 8.19755 235.811 11.3971L244.657 20.6029C247.732 23.8025 252.547 24.5932 256.484 22.545L264.447 18.4017C267.34 16.8964 270.785 16.8964 273.678 18.4017L283.665 23.5983C286.559 25.1036 290.004 25.1036 292.897 23.5983L307.5 16V51H0V36Z" />
                        </g>
                    </svg>
                </div>
            </div>

            <div class="w-full md:w-[calc(50%-16px)] xl:w-[calc(25%-24px)]">
                <div class="bg-white rounded-2xl flex flex-col overflow-hidden h-full">
                    <div class="flex items-center p-4">
                        <li class="pi pi-box !text-5xl text-rose-500"></li>
                        <div class="ml-4">
                            <span class="text-rose-500 block whitespace-nowrap">Inventario</span>
                            <span class="text-rose-500 block text-3xl font-bold">{{ inventoryCount }}</span>
                        </div>
                    </div>
                    <svg class="w-full text-rose-500/50" viewBox="0 0 308 51" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_dd_1305_5001)">
                            <path
                                d="M0 36L14.603 43.5983C17.4961 45.1036 20.9415 45.1036 23.8345 43.5983L36.2677 37.129C37.6932 36.3873 39.2765 36 40.8835 36H55.2103C56.8172 36 58.4005 35.6127 59.8261 34.871L76.875 26L91.4779 18.4017C94.371 16.8964 97.8164 16.8964 100.71 18.4017L113.143 24.871C114.568 25.6127 116.152 26 117.758 26H132.085C133.692 26 135.276 26.3873 136.701 27.129L149.134 33.5983C152.027 35.1036 155.473 35.1036 158.366 33.5983L168.353 28.4017C171.246 26.8964 174.691 26.8964 177.585 28.4017L185.547 32.545C189.484 34.5932 194.299 33.8024 197.374 30.6029L210.268 17.1841C211.022 16.4 211.898 15.744 212.863 15.242L223.985 9.45496C227.921 7.40676 232.737 8.19755 235.811 11.3971L244.657 20.6029C247.732 23.8025 252.547 24.5932 256.484 22.545L264.447 18.4017C267.34 16.8964 270.785 16.8964 273.678 18.4017L283.665 23.5983C286.559 25.1036 290.004 25.1036 292.897 23.5983L307.5 16V51H0V36Z" />
                        </g>
                    </svg>
                </div>
            </div>

            <div class="w-full md:w-[calc(50%-16px)] xl:w-[calc(25%-24px)]">
                <div class="bg-white rounded-2xl flex flex-col overflow-hidden h-full">
                    <div class="flex items-center p-4">
                        <li class="pi pi-truck !text-5xl text-orange-500"></li>
                        <div class="ml-4">
                            <span class="text-orange-500 block whitespace-nowrap">Proveedores</span>
                            <span class="text-orange-500 block text-3xl font-bold">{{ providerCount }}</span>
                        </div>
                    </div>
                    <svg class="w-full text-orange-500/50" viewBox="0 0 308 51" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_dd_1305_5001)">
                            <path
                                d="M0 36L14.603 43.5983C17.4961 45.1036 20.9415 45.1036 23.8345 43.5983L36.2677 37.129C37.6932 36.3873 39.2765 36 40.8835 36H55.2103C56.8172 36 58.4005 35.6127 59.8261 34.871L76.875 26L91.4779 18.4017C94.371 16.8964 97.8164 16.8964 100.71 18.4017L113.143 24.871C114.568 25.6127 116.152 26 117.758 26H132.085C133.692 26 135.276 26.3873 136.701 27.129L149.134 33.5983C152.027 35.1036 155.473 35.1036 158.366 33.5983L168.353 28.4017C171.246 26.8964 174.691 26.8964 177.585 28.4017L185.547 32.545C189.484 34.5932 194.299 33.8024 197.374 30.6029L210.268 17.1841C211.022 16.4 211.898 15.744 212.863 15.242L223.985 9.45496C227.921 7.40676 232.737 8.19755 235.811 11.3971L244.657 20.6029C247.732 23.8025 252.547 24.5932 256.484 22.545L264.447 18.4017C267.34 16.8964 270.785 16.8964 273.678 18.4017L283.665 23.5983C286.559 25.1036 290.004 25.1036 292.897 23.5983L307.5 16V51H0V36Z" />
                        </g>
                    </svg>
                </div>
            </div>

            <div class="w-full xl:w-[calc(25%-24px)]">
                <div class="bg-white rounded-2xl flex flex-col overflow-hidden h-full">
                    <div class="flex items-center p-4">
                        <li class="pi pi-sync !text-5xl text-green-500"></li>
                        <div class="ml-4">
                            <span class="text-green-500 block whitespace-nowrap">Movimientos de Entrada</span>
                            <span class="text-green-500 block text-3xl font-bold">{{ movementCountEntry }}</span>
                        </div>
                    </div>
                    <svg class="w-full text-green-500/50" viewBox="0 0 308 51" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_dd_1305_5001)">
                            <path
                                d="M0 36L14.603 43.5983C17.4961 45.1036 20.9415 45.1036 23.8345 43.5983L36.2677 37.129C37.6932 36.3873 39.2765 36 40.8835 36H55.2103C56.8172 36 58.4005 35.6127 59.8261 34.871L76.875 26L91.4779 18.4017C94.371 16.8964 97.8164 16.8964 100.71 18.4017L113.143 24.871C114.568 25.6127 116.152 26 117.758 26H132.085C133.692 26 135.276 26.3873 136.701 27.129L149.134 33.5983C152.027 35.1036 155.473 35.1036 158.366 33.5983L168.353 28.4017C171.246 26.8964 174.691 26.8964 177.585 28.4017L185.547 32.545C189.484 34.5932 194.299 33.8024 197.374 30.6029L210.268 17.1841C211.022 16.4 211.898 15.744 212.863 15.242L223.985 9.45496C227.921 7.40676 232.737 8.19755 235.811 11.3971L244.657 20.6029C247.732 23.8025 252.547 24.5932 256.484 22.545L264.447 18.4017C267.34 16.8964 270.785 16.8964 273.678 18.4017L283.665 23.5983C286.559 25.1036 290.004 25.1036 292.897 23.5983L307.5 16V51H0V36Z" />
                        </g>
                    </svg>
                </div>
            </div>

            <div class="w-full xl:w-[calc(25%-24px)]">
                <div class="bg-white rounded-2xl flex flex-col overflow-hidden h-full">
                    <div class="flex items-center p-4">
                        <li class="pi pi-sync !text-5xl text-red-700"></li>
                        <div class="ml-4">
                            <span class="text-red-700 block whitespace-nowrap">Movimientos de Salida</span>
                            <span class="text-red-700 block text-3xl font-bold">{{ movementCountExit }}</span>
                        </div>
                    </div>
                    <svg class="w-full text-red-700/50" viewBox="0 0 308 51" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_dd_1305_5001)">
                            <path
                                d="M0 36L14.603 43.5983C17.4961 45.1036 20.9415 45.1036 23.8345 43.5983L36.2677 37.129C37.6932 36.3873 39.2765 36 40.8835 36H55.2103C56.8172 36 58.4005 35.6127 59.8261 34.871L76.875 26L91.4779 18.4017C94.371 16.8964 97.8164 16.8964 100.71 18.4017L113.143 24.871C114.568 25.6127 116.152 26 117.758 26H132.085C133.692 26 135.276 26.3873 136.701 27.129L149.134 33.5983C152.027 35.1036 155.473 35.1036 158.366 33.5983L168.353 28.4017C171.246 26.8964 174.691 26.8964 177.585 28.4017L185.547 32.545C189.484 34.5932 194.299 33.8024 197.374 30.6029L210.268 17.1841C211.022 16.4 211.898 15.744 212.863 15.242L223.985 9.45496C227.921 7.40676 232.737 8.19755 235.811 11.3971L244.657 20.6029C247.732 23.8025 252.547 24.5932 256.484 22.545L264.447 18.4017C267.34 16.8964 270.785 16.8964 273.678 18.4017L283.665 23.5983C286.559 25.1036 290.004 25.1036 292.897 23.5983L307.5 16V51H0V36Z" />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
        <div class="flex justify-end">
            <div class="bg-white rounded-2xl p-4 w-44 mb-4">
                <button @click="generateReport" :disabled="loading" class="font-bold cursor-pointer">Descargar Reporte</button>
                <p v-if="loading">Generando reporte...</p>
                <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
            </div>
        </div>
        <div class="grid gap-5">
            <!-- Gráfica para stock CRÍTICO (<=10) -->
            <div class="bg-white rounded-2xl p-4 shadow-sm">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-red-600">
                        <i class="pi pi-exclamation-triangle mr-2"></i>
                        Productos con Stock Crítico (menos de 10 unidades)
                    </h3>
                    <span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                        {{ criticalChartData.labels.length }} productos
                    </span>
                </div>
                <div class="h-[300px]">
                    <Chart v-if="criticalChartData.labels.length > 0" type="bar" :data="criticalChartData"
                        :options="criticalChartOptions" class="h-full" />
                    <div v-else class="h-full flex items-center justify-center bg-gray-50 rounded-lg">
                        <p class="text-gray-500">
                            <i class="pi pi-check-circle mr-2"></i>
                            No hay productos con stock crítico
                        </p>
                    </div>
                </div>
            </div>

            <!-- Gráfica para stock BAJO (<=50) -->
            <div class="bg-white rounded-2xl p-4 shadow-sm">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-amber-600">
                        <i class="pi pi-exclamation-circle mr-2"></i>
                        Productos con Stock Bajo (menos de 50 unidades)
                    </h3>
                    <span class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                        {{ lowStockChartData.labels.length }} productos
                    </span>
                </div>
                <div class="h-[300px]">
                    <Chart v-if="lowStockChartData.labels.length > 0" type="bar" :data="lowStockChartData"
                        :options="lowStockChartOptions" class="h-full" />
                    <div v-else class="h-full flex items-center justify-center bg-gray-50 rounded-lg">
                        <p class="text-gray-500">
                            <i class="pi pi-check-circle mr-2"></i>
                            No hay productos con stock bajo
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </SidebarComponent>
</template>

<script setup lang="ts">
import SidebarComponent from '@/components/SidebarComponent.vue';
import { useProviderStore } from '@/stores/providerStore';
import { useMovementStore } from '@/stores/movementStore';
import { useCategoryStore } from '@/stores/categoryStore';
import { useUserStore } from '@/stores/userStore';
import { useRolStore } from '@/stores/rolStore';
import { useInventoryStore } from '@/stores/inventoryStore';
import { onMounted, computed, ref, watch } from 'vue';
import Chart from 'primevue/chart';
import type { TooltipItem } from 'chart.js';

const userRole = ref(localStorage.getItem('rol') || '');


const providerStore = useProviderStore();
const movementStore = useMovementStore();
const categoryStore = useCategoryStore();
const userStore = useUserStore();
const rolStore = useRolStore();
const inventoryStore = useInventoryStore();

const generateReport = async () => {
    await inventoryStore.generateReport();
}

const loading = computed(() => inventoryStore.loading);
const errorMessage = computed(() => inventoryStore.errorMessage);

//para hacer el conteo de los proveedores
const providerCount = computed(() => {
    return providerStore.providers.length;
})

//para hacer el conteo de los movimientos de entrada
const movementCountEntry = computed(() => {
    return movementStore.movements.filter((movement) => movement.tipo_movimiento === 'Entrada').length;
})

//para hacer el conteo de los movimientos de salida
const movementCountExit = computed(() => {
    return movementStore.movements.filter((movement) => movement.tipo_movimiento === 'Salida').length;
})

//para hacer el conteo de las categorias
const categoryCount = computed(() => {
    return categoryStore.categories.length;
})

//para hacer el conteo de los usuarios
const userCount = computed(() => {
    return userStore.usuarios.length;
})

//para hacer el conteo de los roles
const rolCount = computed(() => {
    return rolStore.roles.length;
})

//para hacer el conteo de los productos
const inventoryCount = computed(() => {
    return inventoryStore.products.length;
})

// Datos para las gráficas
const criticalChartData = ref({
    labels: [] as string[],
    datasets: [] as unknown[]
});

const lowStockChartData = ref({
    labels: [] as string[],
    datasets: [] as unknown[]
});

// Opciones para las gráficas
const criticalChartOptions = ref({});
const lowStockChartOptions = ref({});

// Preparar los datos de las gráficas
const prepareChartsData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    // Filtrar y ordenar productos
    const criticalProducts = inventoryStore.products
        .filter(p => p.stock <= 10)
        .sort((a, b) => a.stock - b.stock);

    const lowStockProducts = inventoryStore.products
        .filter(p => p.stock > 10 && p.stock <= 50)
        .sort((a, b) => a.stock - b.stock);

    // Configurar datos para gráfica crítica
    criticalChartData.value = {
        labels: criticalProducts.map(p => p.producto),
        datasets: [{
            label: 'Stock Crítico',
            backgroundColor: criticalProducts.map(p =>
                (p?.stock || 0) <= 5 ? documentStyle.getPropertyValue('--red-600') || '#dc2626'
                    : documentStyle.getPropertyValue('--red-400') || '#f87171'
            ),
            borderColor: documentStyle.getPropertyValue('--red-800') || '#991b1b',
            borderWidth: 1,
            borderRadius: 4,
            data: criticalProducts.map(p => p?.stock || 0)
        }]
    };

    // Configurar datos para gráfica de stock bajo
    lowStockChartData.value = {
        labels: lowStockProducts.map(p => p.producto),
        datasets: [{
            label: 'Stock Bajo',
            backgroundColor: lowStockProducts.map(p =>
                (p?.stock || 0) <= 20 ? documentStyle.getPropertyValue('--amber-500') || '#f59e0b'
                    : documentStyle.getPropertyValue('--amber-300') || '#fcd34d'
            ),
            borderColor: documentStyle.getPropertyValue('--amber-700') || '#b45309',
            borderWidth: 1,
            borderRadius: 4,
            data: lowStockProducts.map(p => p?.stock || 0)
        }]
    };

    // Configurar opciones comunes
    const commonOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    title: (items: TooltipItem<'bar'>[]) => items[0].label,
                    label: (context: TooltipItem<'bar'>) => {
                        const product = inventoryStore.products.find(p => p.producto === context.label);
                        if (!product) return ['Producto no encontrado'];
                        const stock = context.raw as number;
                        const messages = [
                            `Stock actual: ${stock} unidades`,
                            `Precio unitario: $${product?.precio_unitario.toFixed(2) || 'N/A'}`,
                            `Proveedor: ${product?.proveedor || 'N/A'}`,
                            `Categoría: ${product?.categoria || 'N/A'}`,
                        ];

                        if (stock <= 10) {
                            messages.push('❗ Necesita atención inmediata');
                        } else if (stock <= 20) {
                            messages.push('⚠️ Reorden prioritario');
                        } else {
                            messages.push('ℹ️ Considerar reorden');
                        }

                        return messages;
                    }
                },
                backgroundColor: '#ffffff',
                titleColor: '#495057',
                bodyColor: '#6c757d',
                borderColor: '#dee2e6',
                borderWidth: 1,
                padding: 12,
                displayColors: false,

            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#6c757d' }
            },
            y: {
                beginAtZero: true,
                grid: { color: '#dee2e6' },
                ticks: { color: '#6c757d' }
            }
        }
    };

    // Opciones específicas para cada gráfica
    criticalChartOptions.value = {
        ...commonOptions,
        plugins: {
            ...commonOptions.plugins,
            title: {
                display: true,
                text: 'Productos con Stock Crítico',
                color: '#dc2626',
                font: { size: 16 }
            }
        }
    };

    lowStockChartOptions.value = {
        ...commonOptions,
        plugins: {
            ...commonOptions.plugins,
            title: {
                display: true,
                text: 'Productos con Stock Bajo',
                color: '#d97706',
                font: { size: 16 }
            }
        }
    };
};

onMounted(async () => {
    await providerStore.fetchProviders();
    await movementStore.fetchMovements();
    await categoryStore.fetchCategories();
    await userStore.fetchUsers();
    await rolStore.fetchRoles();
    await inventoryStore.fetchProducts();
    console.log('Ejemplo de producto:', inventoryStore.products[0]);
})

// Observar cambios en los productos
watch(() => inventoryStore.products, () => {
    prepareChartsData();
}, { immediate: true });

</script>
