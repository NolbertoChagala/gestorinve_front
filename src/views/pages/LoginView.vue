<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="bg-white w-96 p-6 rounded-2xl shadow-2xl">
      <h1 class="text-center font-bold text-2xl mb-5">Inicie sesión en su cuenta</h1>

      <div class="flex flex-col items-center gap-4">
        <div class="w-full">
          <p class="mb-2">Correo electrónico</p>
          <input type="email" v-model="email" class="border-2 w-full p-2 rounded-md" required />
        </div>

        <div class="w-full">
          <p class="mb-2">Contraseña</p>
          <input
            type="password"
            v-model="password"
            class="border-2 w-full p-2 rounded-md"
            required
          />
        </div>

        <div class="w-full mt-2">
          <button
            @click="handleLogin"
            :disabled="loading"
            class="bg-gray-600 text-white hover:bg-gray-700 rounded-md w-full p-2 cursor-pointer"
          >
            {{ loading ? 'Cargando...' : 'Iniciar Sesión' }}
          </button>
        </div>

        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

        <p>
          ¿No tienes una cuenta?
          <button
            @click="mostrarModalRegister = true"
            class="text-blue-500 hover:underline cursor-pointer"
          >
            Regístrate
          </button>
        </p>
      </div>
    </div>
  </div>

  <ModalRegister v-if="mostrarModalRegister" @cerrar="mostrarModalRegister = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import ModalRegister from '@/components/ModalRegister.vue'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)
const mostrarModalRegister = ref(false)
const router = useRouter()

const handleLogin = async () => {
  error.value = null
  loading.value = true

  try {
    const response = await axios.post('https://localhost:7126/api/auth/login', {
      user: {
        correo: email.value,
        contraseña: password.value,
      },
    })

    console.log("Respuesta del servidor", response.data);

    const { token, user } = response.data
    localStorage.setItem('authToken', token)
    localStorage.setItem('userData', JSON.stringify(user))

    router.push('/stock')
  } catch (err) {
    console.log("Error en la solicitud", err.response.data);
    error.value = 'Correo o contraseña incorrectos'
  } finally {
    loading.value = false
  }
}
</script>
