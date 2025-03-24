<template>
  <SidebarComponent>
    <div class="bg-white w-full h-[28vh] rounded-2xl shadow-xl mb-8">
      <div class="pt-10 pl-8 pr-8">
        <h1 class="text-5xl font-bold text-gray-800">Roles</h1>
        <div class="bg-gray-300 w-full h-[2px] mt-3"></div>
        <div>
          <button
            @click="abrirModalCrear"
            class="bg-blue-500 text-white py-3 px-6 rounded-lg mt-5 shadow-md hover:bg-blue-600 transition cursor-pointer"
          >
            <strong>+</strong> CREAR ROL
          </button>
        </div>
      </div>
    </div>

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

          <tbody class="divide-y divide-gray-300">
            <tr v-for="role in rolStore.roles" :key="role.id_rol" class="hover:bg-gray-100 even:bg-gray-50 transition">
              <td class="py-3 px-4 text-center">{{ role.rol }}</td>
              <td class="py-3 px-4 text-center space-x-2">

                <Button
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-warning"
                  @click="abrirModalEditar(role)"
                />


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

    <!-- Modal para agregar/editar rol -->
    <AddRolModal
      v-if="mostrarModal"
      :is-open="mostrarModal"
      :rol-para-editar="rolSeleccionado"
      @close="cerrarModal"
    />

    <!-- Modal de confirmación para eliminar rol -->
    <ConfirmDelete
      ref="confirmDeleteModal"
      @confirmDelete="deleteRol"
    />
  </SidebarComponent>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
import AddRolModal from '@/components/Modals/AddRolModal.vue';
import ConfirmDelete from '@/components/ConfirmDelete.vue';
import { useRolStore } from '@/stores/rolStore';
import type { Rol } from '@/interfaces/rol';

const rolStore = useRolStore();
const mostrarModal = ref(false);
const confirmDeleteModal = ref<InstanceType<typeof ConfirmDelete> | null>(null);

const rolSeleccionado = ref<Rol>({
  id_rol: 0,
  rol: ''
});


onMounted(async () => {
  await rolStore.fetchRoles();
});


const abrirModalCrear = () => {
  rolSeleccionado.value = { id_rol: 0, rol: '' };
  mostrarModal.value = true;
};


const abrirModalEditar = (role: Rol) => {
  rolSeleccionado.value = { ...role };
  mostrarModal.value = true;
};


const cerrarModal = () => {
  mostrarModal.value = false;
  rolSeleccionado.value = { id_rol: 0, rol: '' };
};

// Confirmar eliminación de un rol
const confirmDelete = (id: number) => {
  if (confirmDeleteModal.value) {
    confirmDeleteModal.value.show(id);
  } else {
    console.error("El modal de confirmación no está disponible");
  }
};


const deleteRol = async (id: number) => {
  await rolStore.deleteRol(id);
};
</script>
