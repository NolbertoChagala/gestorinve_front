<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 class="text-xl font-bold">Añadir Producto</h2>

            <div class="mt-4">
                <label class="block">Nombre del Producto</label>
                <input type="text" class="w-full border p-2 rounded-md">
            </div>

            <div class="mt-4">
                <label class="block">Cantidad</label>
                <input type="number" class="w-full border p-2 rounded-md">
            </div>

            <div class="mt-4">
                <label class="block">Precio de Compra</label>
                <input type="number" class="w-full border p-2 rounded-md">
            </div>

            <div class="mt-4">
                <label class="block">Precio de Venta</label>
                <input type="number" class="w-full border p-2 rounded-md">
            </div>

            <div class="flex justify-end gap-3 mt-5">
                <button @click="$emit('cerrar')" class="px-4 py-2 bg-gray-500 text-white rounded-md cursor-pointer">Cerrar</button>
                <button @click="guardarProducto" class="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer">Guardar</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const guardarProducto = () => {


    emit('cerrar');
}

const emit = defineEmits(['cerrar']);


</script>