<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 class="text-xl font-bold">¡Registrate!</h2>

            <div class="mt-4">
                <label class="block">Nombre</label>
                <input type="text" class="w-full border p-2 rounded-md">
            </div>

            <div class="mt-4">
                <label class="block">Correo electrónico</label>
                <input type="text" class="w-full border p-2 rounded-md">
            </div>

            <div class="mt-4">
                <label class="block">Contraseña</label>
                <input type="password" class="w-full border p-2 rounded-md">
            </div>

            <div class="mt-4">
                <label class="block">Confirmar Contraseña</label>
                <input type="password" class="w-full border p-2 rounded-md">
            </div>

            <div class="flex justify-end gap-3 mt-5">
                <button @click="$emit('cerrar')" class="px-4 py-2 bg-gray-500 text-white rounded-md cursor-pointer">Cerrar</button>
                <button @click="registrarse" class="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer">Registrarse</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const registrarse = () => {


    emit('cerrar');
}

const emit = defineEmits(['cerrar']);


</script>