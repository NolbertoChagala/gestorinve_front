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
       </div>
     </div>
   </div>

 </template>

 <script setup lang="ts">
 import { ref } from 'vue';
 import { useRouter } from 'vue-router';
 import { CogIcon } from '@heroicons/vue/24/solid';
 import { login } from '@/services/AuthService';

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
     localStorage.setItem('token', token);
     localStorage.setItem('user', usuario.nombre);

     // Redirigir según el rol
     if (usuario.rol.rol === 'Administrador') {
       console.log("Redirigiendo a /inventario");
       router.push('/inventario'); // Redirige a stock si es Administrador
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
