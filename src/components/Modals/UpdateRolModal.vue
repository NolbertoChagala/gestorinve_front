<template>
  <!-- Modal para editar rol -->
  <BaseModal
    :isOpen="isOpen"
    title="Editar Rol"
    confirmButtonText="Actualizar"
    @close="closeModal"
    @confirm="handleUpdateRol"
  >
    <!-- Input para editar el nombre del rol -->
    <input v-model="editedRol.rol" type="text" placeholder="Nombre del rol" class="border p-2 w-full rounded" />
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';
import BaseModal from '@/components/BaseModal.vue';
import { useRolStore } from '@/stores/rolStore';
import type { IRol } from '@/interfaces/IRol';
import type { PropType } from 'vue';

const rolStore = useRolStore();

const props = defineProps({
  isOpen: Boolean,
  role: Object as PropType<IRol | null>, // Asegura que el rol recibido puede ser nulo
});

const emit = defineEmits(['close', 'confirm']);

const editedRol = ref<IRol>({
  id_rol: 0,
  rol: ''
});

// 🔍 Observa los cambios en `role` y actualiza `editedRol`
watch(() => props.role, (newRole) => {
  if (newRole) {
    console.log("Actualizando editedRol con:", newRole);
    editedRol.value = { ...newRole }; // Clona el objeto para evitar mutaciones directas
  }
}, { immediate: true }); // Se ejecuta inmediatamente cuando el modal se monta

const closeModal = () => {
  editedRol.value = { id_rol: 0, rol: '' }; // Resetea el estado al cerrar
  emit('close');
};

const handleUpdateRol = async () => {
  if (!editedRol.value.rol.trim()) return;

  console.log("🔄 Enviando actualización de rol:", editedRol.value);

  try {
    const updatedRol = await rolStore.updateRol(editedRol.value.id_rol, { rol: editedRol.value.rol });

    // Si la respuesta contiene el rol actualizado, cerramos el modal
    if (updatedRol) {
      emit('close'); // Cierra el modal
      await rolStore.fetchRoles // Recarga la lista de roles después de la actualización
    } else {();
      console.error("❌ No se pudo actualizar el rol.");
    }
  } catch (error) {
    console.error("❌ Error al actualizar el rol:", error);
  }
};

</script>
