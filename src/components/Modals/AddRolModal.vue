<template>
  <BaseModal 
      :is-open="isOpen" 
      :title="rol.id_rol ? 'Editar Rol' : 'Añadir Rol'"
      :confirmButtonText="rol.id_rol ? 'Actualizar' : 'Guardar'"
      @close="closeModal"
      @confirm="guardarRol"
  >
      <label class="block">Nombre del Rol</label>
      <input v-model="rol.rol" type="text" placeholder="Ej: Administrador" class="w-full border p-2 rounded-md">
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import BaseModal from '@/components/BaseModal.vue';
import { useRolStore } from '@/stores/rolStore';
import type { Rol } from '@/interfaces/rol';

const rolStore = useRolStore();
const emit = defineEmits(['close', 'confirm']);

const props = defineProps({
  rolParaEditar: {
      type: Object as () => Rol,
      default: () => ({
          id_rol: 0,
          rol: ""
      })
  }
});

const isOpen = ref(true); // Control de visibilidad del modal
const rol = ref<Rol>({ ...props.rolParaEditar });

watch(() => props.rolParaEditar, (newRol) => {
  rol.value = { ...newRol }; // Sincronizar cambios cuando se edita un rol
}, { deep: true });

const closeModal = () => {
  isOpen.value = false;
  emit("close");
};

const guardarRol = async () => {
  try {
      if (!rol.value.rol.trim()) return; // Evitar guardar campos vacíos

      if (rol.value.id_rol) {
          await rolStore.updateRol(rol.value.id_rol, rol.value);
      } else {
          await rolStore.createRol(rol.value);
      }

      closeModal();
  } catch (error) {
      console.error("Error al guardar el rol:", error);
  }
};
</script>
