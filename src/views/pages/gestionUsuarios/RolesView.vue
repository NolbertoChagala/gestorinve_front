<template>
  <SidebarComponent>
    <div class="bg-white w-full h-[28vh] rounded-2xl shadow-xl mb-8">
      <div class="pt-10 pl-8 pr-8">
        <h1 class="text-5xl font-bold text-gray-800">Roles</h1>
        <div class="bg-gray-300 w-full h-[2px] mt-3"></div>
        <div>
          <button
            @click="isCreateModalOpen = true"
            class="bg-blue-500 text-white py-3 px-6 rounded-lg mt-5 shadow-md hover:bg-blue-600 transition cursor-pointer"
          >
            <strong>+</strong> CREAR ROL
          </button>
        </div>
      </div>
    </div>

    <!-- Tabla para mostrar roles -->
    <div class="w-full overflow-x-auto">
      <div class="bg-white rounded-lg shadow-xl p-4">
        <table class="table-fixed w-full border-collapse rounded-lg overflow-hidden min-w-[800px]">
          <!-- Encabezado -->
          <thead class="bg-blue-100 text-gray-700">
            <tr>
              <th class="w-2/6 py-3 px-4 text-center">Rol</th>
              <th class="w-2/6 py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>

          <!-- Cuerpo de la tabla -->
          <tbody class="divide-y divide-gray-300">
            <tr v-for="role in rolStore.roles" :key="role.id_rol" class="hover:bg-gray-100 even:bg-gray-50 transition">
              <td class="py-3 px-4 text-center">{{ role.rol }}</td>
              <td class="py-3 px-4 text-center space-x-2">
                <!-- Botón Editar -->
                <Button
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-warning"
                  @click="openEditModal(role)"
                />

                <!-- Botón Eliminar -->
                <Button
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-danger"
                  @click="confirmDelete(role.id_rol)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal para agregar rol -->
    <AddRolModal
      :isOpen="isCreateModalOpen"
      @close="isCreateModalOpen = false"
    />

    <!-- Modal de confirmación para eliminar rol -->
    <ConfirmDelete
      ref="confirmDeleteModal"
      @confirmDelete="deleteRol"
    />

    <!-- Modal para editar rol -->
    <EditRolModal
      :isOpen="isEditModalOpen"
      :role="selectedRole"
      @close="isEditModalOpen = false"
    />
  </SidebarComponent>
</template>

<script setup lang="ts">
import SidebarComponent from '@/components/SidebarComponent.vue'
import AddRolModal from '@/components/Modals/AddRolModal.vue';
import ConfirmDelete from '@/components/ConfirmDelete.vue';
import EditRolModal from '@/components/Modals/UpdateRolModal.vue'; // Asegúrate de importar el componente de edición
import { useRolStore } from '@/stores/rolStore'
import { onMounted, ref } from 'vue'

const rolStore = useRolStore()
const isCreateModalOpen = ref(false);
const isEditModalOpen = ref(false); // Estado para el modal de editar
const selectedRole = ref(null); // Rol seleccionado para editar
const confirmDeleteModal = ref(null);
const rolesToDelete = ref<number | null>(null);

// Llamada a la API para obtener los roles
onMounted(async () => {
  await rolStore.fetchRoles()
})

// Función para abrir el modal de edición con el rol seleccionado
const openEditModal = (role: IRol) => {
  console.log("Rol seleccionado: " + role);
  selectedRole.value = { ...role }; // Pasar el rol seleccionado al modal
  isEditModalOpen.value = true; // Abrir el modal  de edición
}

// Función para confirmar la eliminación del rol
const confirmDelete = (id: number) => {
  rolesToDelete.value = id;
  confirmDeleteModal.value?.show(id);
}

// Eliminar el rol
const deleteRol = async (id: number) => {
  await rolStore.deleteRol(id);
}
</script>
