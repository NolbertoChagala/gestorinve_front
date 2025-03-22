<template>
    <div v-if="isOpen" class="fixed inset-0 backdrop-brightness-75 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-800">{{ title }}</h2>
        </div>
  
        <!-- Contenido dinámico del modal -->
        <div class="p-6">
          <slot></slot>
        </div>
  
        <!-- Botones del Modal -->
        <div class="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button @click="closeModal" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            Cancelar
          </button>
          <button @click="confirmAction" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            {{ confirmButtonText }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    isOpen: { type: Boolean, required: true },  // Control de visibilidad
    title: { type: String, required: true },  // Título dinámico
    confirmButtonText: { type: String, default: 'Confirmar' }  // Texto del botón de confirmación
  });
  
  const emit = defineEmits(['close', 'confirm']);
  
  const closeModal = () => emit('close');
  const confirmAction = () => emit('confirm');
  </script>
  