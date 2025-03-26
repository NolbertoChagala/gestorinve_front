<template>
  <BaseModal
    :is-open="isOpen"
    :title="isEditMode ? 'Editar Usuario' : 'Crear Usuario'"
    :confirmButtonText="isEditMode ? 'Actualizar' : 'Crear'"
    @close="closeModal"
    @confirm="guardarUsuario"
  >
    <div class="space-y-4">
      <div>
        <label class="block">Nombre</label>
        <input
          v-model="nombre"
          type="text"
          placeholder="Ej: Juan Pérez"
          class="w-full border p-2 rounded-md"
          :class="{ 'border-red-500': errors.nombre }"
        />
        <span v-if="errors.nombre" class="text-red-500 text-xs mt-1">{{ errors.nombre }}</span>
      </div>

      <div>
        <label class="block">Correo</label>
        <input
          v-model="correo"
          type="email"
          placeholder="Ej: usuario@email.com"
          class="w-full border p-2 rounded-md"
          :class="{ 'border-red-500': errors.correo }"
        />
        <span v-if="errors.correo" class="text-red-500 text-xs mt-1">{{ errors.correo }}</span>
      </div>

      <div>
        <label class="block">Contraseña</label>
        <input
          v-model="contraseña"
          type="password"
          :placeholder="isEditMode ? 'Ingresa nueva contraseña o deja la actual' : '******'"
          class="w-full border p-2 rounded-md"
          :class="{ 'border-red-500': errors.contraseña }"
        />
        <span v-if="errors.contraseña" class="text-red-500 text-xs mt-1">{{ errors.contraseña }}</span>
      </div>

      <div>
        <label class="block">Rol</label>
        <select v-model="rol" class="w-full border p-2 rounded-md">
          <option value="" disabled>Selecciona un rol</option>
          <option v-for="role in rolStore.roles" :key="role.id_rol" :value="role.rol">
            {{ role.rol }}
          </option>
        </select>
        <span v-if="errors.rol" class="text-red-500 text-xs mt-1">{{ errors.rol }}</span>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, onMounted } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import { useRolStore } from '@/stores/rolStore'
import { useUserStore } from '@/stores/userStore'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const rolStore = useRolStore()
const userStore = useUserStore()
const emit = defineEmits(['close', 'confirm'])

const props = defineProps({
  usuarioParaEditar: {
    type: Object,
    default: () => ({}),
  },
  isEditMode: {
    type: Boolean,
    default: false,
  },
})

const validationSchema = yup.object({
  nombre: yup.string().required('El nombre es obligatorio'),
  correo: yup.string().email('Correo inválido').required('El correo es obligatorio'),
  contraseña: yup
    .string()
    .trim()
    .when('id_usuario', {
      is: (id_usuario) => !id_usuario,
      then: (schema) => schema.min(6, 'Debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
      otherwise: (schema) => schema.notRequired(),
    }),
  rol: yup.string().required('Selecciona un rol'),
})

const { values, errors, handleSubmit, defineField, setValues, resetForm } = useForm({
  validationSchema,
  initialValues: {
    id_usuario: 0,
    nombre: '',
    correo: '',
    contraseña: '',
    rol: '',
  },
})

const [nombre] = defineField('nombre', { validateOnModelUpdate: true })
const [correo] = defineField('correo', { validateOnModelUpdate: true })
const [contraseña] = defineField('contraseña', { validateOnModelUpdate: true })
const [rol] = defineField('rol', { validateOnModelUpdate: true })

watch(
  () => props.usuarioParaEditar,
  (newUser) => {
    if (props.isEditMode && newUser && newUser.id_usuario) {
      resetForm({
        values: {
          id_usuario: newUser.id_usuario,
          nombre: newUser.nombre || '',
          correo: newUser.correo || '',
          contraseña: newUser.contraseña || '',
          rol: newUser.rol || '',
        }
      })
    }
  },
  { immediate: true, deep: true }
)

watch(
  () => props.isEditMode,
  (isEdit) => {
    if (!isEdit) {
      resetForm({
        values: {
          id_usuario: 0,
          nombre: '',
          correo: '',
          contraseña: '',
          rol: '',
        }
      })
    }
  }
)

const isOpen = ref(true)

const closeModal = () => {
  isOpen.value = false
  emit('close')
}

const guardarUsuario = handleSubmit(async () => {
  try {
    const datosEnvio = {
      nombre: values.nombre,
      correo: values.correo,
      rol: values.rol,
      ...(values.id_usuario && { id_usuario: values.id_usuario }),
      contraseña: values.contraseña
    }

    if (values.id_usuario) {
      await userStore.updateUsers(values.id_usuario, datosEnvio)
    } else {
      await userStore.createUsers(datosEnvio)
    }
    closeModal()
  } catch (error) {
    console.error('Error al guardar el usuario:', error)
  }
})

onMounted(() => {
  if (rolStore.roles.length === 0) {
    rolStore.fetchRoles()
  }

  if (!props.isEditMode) {
    resetForm({
      values: {
        id_usuario: 0,
        nombre: '',
        correo: '',
        contraseña: '',
        rol: '',
      }
    })
  }
})
</script>
