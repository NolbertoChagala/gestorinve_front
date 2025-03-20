<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-10">
    <div class="bg-white p-10 rounded-lg shadow-lg w-[450px] min-h-[500px] transition-all flex flex-col justify-between">
      <h2 class="text-2xl font-semibold text-gray-700 text-center flex items-center justify-center gap-3 mb-6">
        <UserPlusIcon class="w-7 h-7 text-black-600" /> Registrarse
      </h2>

      <div class="space-y-5 flex-1">
        <div class="relative">
          <UserIcon class="absolute left-4 top-4 w-6 h-6 text-gray-400" />
          <input v-model="nombre" type="text" placeholder="Nombre" class="w-full border border-gray-300 p-4 pl-14 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500">
        </div>

        <div class="relative">
          <EnvelopeIcon class="absolute left-4 top-4 w-6 h-6 text-gray-400" />
          <input v-model="correo" type="email" placeholder="Correo" class="w-full border border-gray-300 p-4 pl-14 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500">
        </div>

        <div class="relative">
          <LockClosedIcon class="absolute left-4 top-4 w-6 h-6 text-gray-400" />
          <input v-model="contraseña" type="password" placeholder="Contraseña" class="w-full border border-gray-300 p-4 pl-14 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500">
        </div>

        <div class="relative">
          <LockClosedIcon class="absolute left-4 top-4 w-6 h-6 text-gray-400" />
          <input v-model="confirmarContraseña" type="password" placeholder="Confirmar contraseña" class="w-full border border-gray-300 p-4 pl-14 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500">
        </div>
      </div>

      <div class="flex justify-end gap-4 mt-6">
        <button @click="$emit('cerrar')" class="px-5 py-3 text-lg text-gray-600 border border-gray-400 rounded-lg hover:bg-gray-100">
          Cerrar
        </button>
        <button @click="registrarse" class="px-5 py-3 text-lg text-white bg-gray-700 rounded-lg hover:bg-gray-900">
          Registrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserPlusIcon, UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/vue/24/solid'
import { register } from '../services/AuthService'
import { useToast } from 'vue-toastification'

const nombre = ref('')
const correo = ref('')
const contraseña = ref('')
const confirmarContraseña = ref('')
const toast = useToast()

// Lógica del registro
const registrarse = async () => {
  if (contraseña.value !== confirmarContraseña.value) {
    toast.error('Las contraseñas no coinciden.')
    return
  }

  const credentials = {
    nombre: nombre.value,
    correo: correo.value,
    contraseña: contraseña.value,
    confirmarContraseña: confirmarContraseña.value
  }

  try {
    const response = await register(credentials)

    if (response) {
      toast.success('Usuario registrado exitosamente!')
      emit('cerrar')
    }
  } catch (error) {
    console.error('Error en el registro:', error)
    toast.error('Hubo un problema al registrar el usuario. Intenta nuevamente.')
  }
}

const emit = defineEmits(['cerrar'])
</script>


<style scoped>
/* Animación de entrada suave */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.bg-white {
  animation: fadeIn 0.2s ease-out;
}
</style>
