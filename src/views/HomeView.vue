<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToInventory = () => {
  router.push('/login')
}
</script>

<template>
  <main class="flex flex-col items-center justify-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 class="text-3xl font-bold text-gray-800">¡Bienvenido al Gestor de Inventario!</h1>
      <p class="text-gray-600 mt-2">Administra tus productos de manera eficiente y organizada.</p>
      <button
        @click="goToInventory"
        class="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600"
      >
        Ir al Inventario
      </button>
    </div>
  </main>
</template>
