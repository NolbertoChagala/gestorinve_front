import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import type { User } from '@/interfaces/user'
import { getUsers, getUserById, createUser ,updateUser, deleteUser } from "@/services/userService";

export const useUserStore = defineStore('user', () => {
  const usuarios = ref<User[]>([])
  const currentUser = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const toast = useToast()

  const fetchUsers = async () => {
    isLoading.value = true;
    error.value = null;
    try {
        const data = await getUsers();
        console.log("Datos obtenidos de la API:", data);
        usuarios.value = data;
    } catch (err) {
        error.value = 'Error al obtener los usuarios.';
        console.error('Error fetching usuarios:', err);
    } finally {
        isLoading.value = false;
    }
  };

  const fetchUserById = async (id: number) => {
    isLoading.value = true;
    error.value = null;
    try {
      const user = await getUserById(id);
      currentUser.value = user;
    } catch (err) {
      error.value = 'Error al obtener el usuario.';
      console.error(error.value, err);
    } finally {
      isLoading.value = false;
    }
  };

  const createUsers = async (usuario: User) => {
    isLoading.value = true;
    error.value = null;
    try {
      await createUser(usuario);
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Usuario creado correctamente.',
        life: 3000,
      });
      await fetchUsers();
    } catch (err) {
      error.value = 'Error al crear el usuario.';
      console.error(error.value, err);
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: error.value,
        life: 3000,
      });
    } finally {
      isLoading.value = false;
    }
  };

  const updateUsers = async (id_usuario: number, usuario: Partial<User>) => {
    isLoading.value = true;
    error.value = null;
    try {
      await updateUser(id_usuario, usuario);
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Usuario actualizado correctamente.',
        life: 3000,
      });
      await fetchUsers();
    } catch (err) {
      error.value = 'Error al actualizar el usuario.';
      console.error(error.value, err);
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: error.value,
        life: 3000,
      });
    } finally {
      isLoading.value = false;
    }
  };

  const deleteUsers = async (id: number) => {
    isLoading.value = true;
    error.value = null;
    try {
      await deleteUser(id);
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Usuario eliminado exitosamente.',
        life: 3000,
      });
      await fetchUsers();
      if (currentUser.value?.id_usuario === id) {
        currentUser.value = null;
      }
    } catch (err) {
      error.value = 'Error al eliminar el usuario.';
      console.error(error.value, err);
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: error.value,
        life: 3000,
      });
    } finally {
      isLoading.value = false;
    }
  };

  return {
    usuarios,
    currentUser,
    isLoading,
    error,
    fetchUsers,
    fetchUserById,
    createUsers,
    updateUsers,
    deleteUsers,
  }
})
