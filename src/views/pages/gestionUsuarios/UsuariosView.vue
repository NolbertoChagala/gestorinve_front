<template>
  <SidebarComponent>
    <div class="bg-white w-full h-[28vh] rounded-2xl shadow-xl mb-8">
      <div class="pt-10 pl-8 pr-8">
        <h1 class="text-5xl font-bold text-gray-800">Gestión de Usuarios</h1>
        <div class="bg-gray-300 w-full h-[2px] mt-3"></div>
        <div>
          <button
            @click="mostrarModalRegister = true; isEditMode = false"
            class="bg-blue-500 text-white py-3 px-6 rounded-lg mt-5 shadow-md hover:bg-blue-600 transition cursor-pointer"
          >
            <strong>+</strong> CREAR USUARIO
          </button>
        </div>
      </div>
    </div>

    <div class="w-full overflow-x-auto">
      <div class="bg-white rounded-lg shadow-xl p-4">
        <table class="table-fixed w-full border-collapse rounded-lg overflow-hidden min-w-[800px]">
          <thead class="bg-blue-100 text-gray-700">
            <tr>
              <th class="w-2/6 py-3 px-4 text-center">Nombre</th>
              <th class="w-2/6 py-3 px-4 text-center">Correo</th>
              <th class="w-2/6 py-3 px-4 text-center">Rol</th>
              <th class="w-2/6 py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-300">
            <tr
              v-for="usuario in userStore.usuarios"
              :key="usuario.id_usuario"
              class="hover:bg-gray-100 even:bg-gray-50 transition"
            >
              <td class="py-3 px-4 text-center">{{ usuario.nombre }}</td>
              <td class="py-3 px-4 text-center">{{ usuario.correo }}</td>
              <td class="py-3 px-4 text-center">{{ usuario.rol }}</td>
              <td class="py-3 px-4 text-center space-x-2">
                <Button
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-warning"
                  @click="editarUsuario(usuario)"
                />
                <Button
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-danger"
                  @click="confirmDelete(usuario.id_usuario)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <ConfirmDelete ref="confirmDeleteModal" @confirmDelete="deleteUsers" />
    <!-- Pasar correctamente los datos del usuario a editar -->
    <ModalRegister
      v-if="mostrarModalRegister"
      :usuarioParaEditar="usuarioParaEditar"
      :isEditMode="isEditMode"
      @close="mostrarModalRegister = false"
    />
  </SidebarComponent>
</template>

<script setup lang="ts">
import SidebarComponent from '@/components/SidebarComponent.vue'
import { useUserStore } from '@/stores/userStore'
import ModalRegister from '@/components/ModalRegister.vue'
import ConfirmDelete from '@/components/ConfirmDelete.vue'
import { onMounted, ref } from 'vue'

const mostrarModalRegister = ref(false)
const usuarioParaEditar = ref<any>(null)
const userStore = useUserStore()
const confirmDeleteModal = ref<InstanceType<typeof ConfirmDelete> | null>(null)
const isEditMode = ref(false)

onMounted(async () => {
  await userStore.fetchUsers()
})

const confirmDelete = (id: number) => {
  if (confirmDeleteModal.value) {
    confirmDeleteModal.value.show(id)
  } else {
    console.error('El modal de confirmación no está disponible')
  }
}

const deleteUsers = async (id: number) => {
  await userStore.deleteUsers(id)
}

const editarUsuario = (usuario: any) => {
  usuarioParaEditar.value = { ...usuario }
  isEditMode.value = true
  mostrarModalRegister.value = true
}
</script>
