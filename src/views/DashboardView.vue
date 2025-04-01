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
        <div class="card">
            <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]" />
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
import { onMounted, computed, ref } from 'vue';
import Chart from 'primevue/chart';
import type { TooltipItem } from 'chart.js';

const userRole = ref(localStorage.getItem('rol') || '');


const providerStore = useProviderStore();
const movementStore = useMovementStore();
const categoryStore = useCategoryStore();
const userStore = useUserStore();
const rolStore = useRolStore();
const inventoryStore = useInventoryStore();

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

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    const products = inventoryStore.products;
    const productNames = products.map(p => p.producto);
    const productQuantities = products.map(p => p.stock);
    const criticalStock = 10; // Nivel de stock crítico

    return {
        labels: productNames,
        datasets: [
            {
                label: 'Stock de Productos',
                backgroundColor: products.map(p =>
                    p.stock <= criticalStock ?
                    documentStyle.getPropertyValue('--p-red-600') :
                    documentStyle.getPropertyValue('--p-cyan-500')
                ),
                borderColor: products.map(p =>
                    p.stock <= criticalStock ?
                    documentStyle.getPropertyValue('--p-red-800') :
                    documentStyle.getPropertyValue('--p-gray-200')
                ),
                borderWidth: 1,
                data: productQuantities
            }
        ]
    };
}

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
    const criticalStock = 10;

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            tooltip: {
                callbacks: {
                    title: (context: TooltipItem<'bar'>[]) => context[0].label,
                    label: (context: TooltipItem<'bar'>) => {
                        const stock = context.raw as number;
                        const price = inventoryStore.products.find(p => p.producto === context.label)?.precio_unitario || 0;

                        const message = [
                            `Stock: ${stock} unidades`,
                            `Precio unitario: $${price.toFixed(2)}`
                        ];

                        if (stock <= criticalStock) {
                            message.push('¡Este producto se está agotando!');
                        }

                        return message;
                    }
                },
                displayColors: false,
                backgroundColor: documentStyle.getPropertyValue('--p-surface-0'),
                titleColor: documentStyle.getPropertyValue('--p-primary-500'),
                bodyColor: textColor,
                borderColor: surfaceBorder,
                borderWidth: 1,
                padding: 12
            },
            legend: {
                labels: {
                    color: textColor,
                    usePointStyle: true,
                    pointStyle: 'rectRounded'
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Cantidad en stock',
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                },
                ticks: {
                    color: textColorSecondary
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary,
                    autoSkip: false
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        },
        hover: {
            mode: 'nearest',
            intersect: true
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
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
})

</script>

<style scoped>
.low-stock {
    background-color: red;
    color: white;
}
</style>
