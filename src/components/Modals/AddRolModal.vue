<template>
  <BaseModal 
      :is-open="isOpen" 
      :title="values.id_rol ? 'Editar Rol' : 'Añadir Rol'"
      :confirmButtonText="values.id_rol ? 'Actualizar' : 'Guardar'"
      @close="closeModal"
      @confirm="guardarRol"
  >
      <label class="block">Nombre del Rol</label>
      <input 
          v-model="rol" 
          type="text" 
          placeholder="Ej: Administrador" 
          class="w-full border p-2 rounded-md"
          :class="{'border-red-500': errors.rol}"
      />
      <span v-if="errors.rol" class="text-red-500 text-xs mt-1">{{ errors.rol }}</span>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import BaseModal from '@/components/BaseModal.vue';
import { useRolStore } from '@/stores/rolStore';
import type { Rol } from '@/interfaces/rol';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

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

const validationSchema = yup.object({
  rol: yup.string().required('El nombre del rol es obligatorio')
});

const { values, errors, handleSubmit, defineField } = useForm({
  validationSchema,
  initialValues: { ...props.rolParaEditar }
});

const [rol] = defineField('rol', { validateOnModelUpdate: true });

watch(() => props.rolParaEditar, (newRol) => {
  values.id_rol = newRol.id_rol;
  values.rol = newRol.rol;
}, { deep: true });

const isOpen = ref(true);

const closeModal = () => {
  isOpen.value = false;
  emit("close");
};

const guardarRol = handleSubmit(async () => {
  try {
      if (values.id_rol) {
          await rolStore.updateRol(values.id_rol, values);
      } else {
          await rolStore.createRol(values);
      }
      closeModal();
  } catch (error) {
      console.error("Error al guardar el rol:", error);
  }
});
</script>
