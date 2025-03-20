<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="bg-white w-96 h-96 rounded-2xl shadow-2xl">
      <h1 class="text-center font-bold text-2xl m-5">
        Inicie sesión en su cuenta
      </h1>
      <div class="flex flex-col items-center gap-4 ml-6 mr-6">
        <div class="w-full">
          <p class="mb-2">Correo electrónico</p>
          <input
            v-model="email"
            type="text"
            class="border-2 w-full p-2 rounded-md"
            placeholder="Ingrese su correo electrónico"
          />
        </div>
        <div class="w-full">
          <p class="mb-2">Contraseña</p>
          <input
            v-model="password"
            type="password"
            class="border-2 w-full p-2 rounded-md"
            placeholder="Ingrese su contraseña"
          />
        </div>
        <div class="w-full mt-2">
          <button
            @click="loginUser"
            class="bg-gray-600 text-white hover:bg-gray-700 rounded-md w-full p-2 cursor-pointer"
          >
            Iniciar Sesión
          </button>
        </div>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ModalRegister from '@/components/ModalRegister.vue';
import { login } from '@/services/AuthService';

const mostrarModalRegister = ref(false);
const email = ref('');
const password = ref('');
const router = useRouter();

const loginUser = async () => {
  try {
    const response = await login({ correo: email.value, contraseña: password.value });
    console.log("Respuesta completa del backend:", response);

    if (!response || typeof response !== 'object') {
      throw new Error("La respuesta del backend no es un objeto válido.");
    }

    const responseData = response;
    console.log("Datos procesados:", responseData);

    if (!responseData.token || !responseData.usuario) {
      throw new Error("La respuesta del backend no contiene el token o los datos del usuario.");
    }

    const user = responseData.usuario;
    console.log("Datos del usuario:", user);

    localStorage.setItem('PKUsuario', user.id_usuario);
    localStorage.setItem('rolUsuario', user.rol_id); 
    localStorage.setItem('token', responseData.token);

    if (user.rol_id === 3) {
      router.push('/stock');
    } else {
      router.push('/home');
    }

  } catch (error) {
    console.error("Error de login:", error.message);
  }
};

</script>

