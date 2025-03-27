<template>
  <div class="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-teal-100 to-pink-100">
    <div class="bg-white w-96 rounded-2xl shadow-xl p-8 border-t-4 border-teal-900">
      <h1 class="text-center text-3xl font-bold text-gray-800 mb-8">Gestor de Inventario</h1>
      <div class="flex justify-center mb-3">
        <CogIcon class="text-blue-500 w-30 text-5xl"/>
      </div>

      <div class="flex flex-col gap-6">
        <div class="w-full">
          <p class="mb-2 text-lg text-gray-700">Correo electrónico</p>
          <input
            v-model="credentials.correo"
            type="email"
            class="border-2 border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese su correo electrónico"
          />
        </div>

        <div class="w-full">
          <p class="mb-2 text-lg text-gray-700">Contraseña</p>
          <input
            v-model="credentials.contraseña"
            type="password"
            class="border-2 border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese su contraseña"
          />
        </div>

        <div v-if="authStore.errorMessage" class="text-red-500 text-sm text-center mt-2">
          {{ authStore.errorMessage }}
        </div>

        <div class="w-full mt-4">
          <button
            @click="handleLogin"
            :disabled="authStore.loading"
            :aria-busy="authStore.loading"
            class="bg-blue-600 text-white hover:bg-blue-700 rounded-md w-full p-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="authStore.loading">Procesando...</span>
            <span v-else>Iniciar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { CogIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'

const authStore = useAuthStore()

const credentials = ref({
  correo: '',
  contraseña: ''
})

const handleLogin = async () => {
  try {
    await authStore.loginUser(credentials.value)
  } catch (error) {
    console.error('Error en login:', error)
  }
}

</script>
