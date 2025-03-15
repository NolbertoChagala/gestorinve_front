<template>
    <div class="flex h-screen gap-5 p-5">
        <SidebarComponent />
        <div class="flex flex-col flex-1 items-center justify-center gap-5">
            <div class="bg-white w-full h-[35vh] rounded-2xl shadow-xl">
                <div class="pt-10 pl-8 pr-8">
                    <h1 class="text-5xl font-bold">Stock</h1>
                    <div class="bg-[#E5E5E5] border w-full mt-3"></div>
                    <div>
                        <button class="bg-black text-white py-2 rounded-md mt-5 px-5 cursor-pointer">
                            <strong>+</strong> AÑADIR PRODUCTO
                        </button>
                    </div>
                </div>
            </div>
            <div class="bg-white w-full h-full rounded-2xl shadow-xl">
                <table class="w-full rounded-2xl overflow-hidden">
                    <thead class="bg-gray-300">
                        <tr class="text-gray-600">
                            <th class="p-3">PRODUCTO</th>
                            <th class="p-3">CANTIDAD</th>
                            <th class="p-3">PRECIO COMPRA</th>
                            <th class="p-3">PRECIO VENTA</th>
                            <th class="p-3">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-gray-500 border-b text-lg">
                            <th class="p-3">#H CP</th>
                            <th class="p-3">24</th>
                            <th class="p-3">$23,500</th>
                            <th class="p-3">$50,000</th>
                            <th class="p-3">
                                <div class="flex justify-center items-center gap-5">
                                    <button class="bg-[#5656A7] p-2.5 cursor-pointer flex justify-around items-center rounded-xl gap-3">
                                        <img :src="editarImage" alt="botonEditar" class="w-6 h-6 filter invert">
                                        <p class="text-sm text-white">Editar</p>
                                    </button>
                                    <button class="bg-[#5656A7] p-2.5 cursor-pointer flex justify-around items-center rounded-xl gap-3">
                                        <img :src="eliminarImage" alt="botonEliminar" class="w-6 h-6 filter invert">
                                        <p class="text-sm text-white">Eliminar</p>
                                    </button>
                                </div>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SidebarComponent from '@/components/SidebarComponent.vue';
import editarImage from '../../assets/images/editarImage.svg';
import eliminarImage from '../../assets/images/eliminarImage.svg'

</script>
