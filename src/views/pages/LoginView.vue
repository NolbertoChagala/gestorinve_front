<template>
 <div class="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-teal-100 to-pink-100">

    <!-- Contenedor del login con borde superior verde -->
    <div class="bg-white w-96 rounded-2xl shadow-xl p-8 border-t-4 border-teal-900">
      <h1 class="text-center text-3xl font-bold text-gray-800 mb-8">Gestor de Inventario</h1>

      <!-- Ícono de Heroicons -->
      <div class="flex justify-center mb-3">
        <CogIcon class="text-blue-500 w-30 text-5xl"/>
      </div>

      <!-- Formulario de login -->
      <div class="flex flex-col gap-6">
        <div class="w-full">
          <p class="mb-2 text-lg text-gray-700">Correo electrónico</p>
          <input
            v-model="email"
            type="text"
            class="border-2 border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese su correo electrónico"
          />
        </div>

        <!-- Campo de contraseña -->
        <div class="w-full">
          <p class="mb-2 text-lg text-gray-700">Contraseña</p>
          <input
            v-model="password"
            type="password"
            class="border-2 border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese su contraseña"
          />
        </div>

        <div v-if="errorMessage" class="text-red-500 text-sm text-center mt-2">{{ errorMessage }}</div>

        <div class="w-full mt-4">
          <button
            @click="loginUser"
            class="bg-blue-600 text-white hover:bg-blue-700 rounded-md w-full p-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Iniciar Sesión
          </button>
        </div>

        <p class="text-center text-sm mt-4">
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

  <!-- Modal de registro -->
  <ModalRegister v-if="mostrarModalRegister" @cerrar="mostrarModalRegister = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ModalRegister from '@/components/ModalRegister.vue';
import { CogIcon } from '@heroicons/vue/24/solid';
import { login } from '@/services/AuthService';

const mostrarModalRegister = ref<boolean>(false);
const email = ref<string>('');
const password = ref<string>('');
const errorMessage = ref<string>('');
const router = useRouter();

const loginUser = async () => {
  errorMessage.value = ''; // Reset error message
  try {
    const response = await login({ correo: email.value, contraseña: password.value });
    console.log("Respuesta completa del backend:", response);

    if (!response || typeof response !== 'object') {
      throw new Error("La respuesta del backend no es un objeto válido.");
    }

    const { token, usuario } = response;

    if (!token || !usuario) {
      throw new Error("La respuesta del backend no contiene el token o los datos del usuario.");
    }

    console.log("Datos del usuario:", usuario);
    console.log("Rol del usuario:", usuario.rol);
    localStorage.setItem('PKUsuario', usuario.id_usuario);
    localStorage.setItem('rolUsuario', usuario.rol.rol);
    localStorage.setItem('token', token);

    // Redirigir según el rol
    if (usuario.rol.rol === 'Administrador') {
      console.log("Redirigiendo a /stock");
      router.push('/stock'); // Redirige a stock si es Administrador
    } else if (usuario.rol.rol === 'Usuario') {
      console.log("Redirigiendo a /welcome");
      router.push('/welcome'); // Redirige a welcome si es usuario común
    } else {
      console.log("Redirigiendo a la página de inicio");
      router.push('/login'); // Si no es ninguno de los 2 roles lo redirige a login
    }
  } catch (error: any) {
    console.error("Error de login:", error.message);
    errorMessage.value = error.message;
  }
};
</script>


