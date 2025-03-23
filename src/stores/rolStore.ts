import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import type { Rol } from '@/interfaces/rol'
import * as rolService from '@/services/rolServices'

export const useRolStore = defineStore('rol', () => {
  const roles = ref<Rol[]>([])
  const currentRol = ref<Rol | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const toast = useToast()

  // Traer todos los roles
  const fetchRoles = async () => {
    isLoading.value = true
    error.value = null
    try {
      roles.value = await rolService.getRoles()
    } catch (err) {
      error.value = 'Error al cargar los roles'
      console.error('Error fetching roles:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Crear un rol
  const createRol = async (rol: Omit<Rol, 'id_rol'>) => {
    isLoading.value = true
    error.value = null
    try {
      await rolService.createRol(rol)
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Rol creado exitosamente.',
        life: 3000,
      })
      await fetchRoles()
    } catch (err) {
      error.value = 'Error al crear el rol'
      console.error('Error creando el rol:', err)

      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo crear el rol. Intenta de nuevo.',
        life: 3000,
      })
    } finally {
      isLoading.value = false
    }
  }

  const updateRol = async (id: number, rol: Partial<Rol>) => {
    isLoading.value = true;
    error.value = null;
    try {
      console.log("🔄 Enviando solicitud para actualizar rol:", { id, rol });

      // Llamada a la API
      const response = await rolService.updateRol(id, rol);
      console.log("✅ Respuesta recibida del servicio:", response);

      // Aseguramos que la respuesta no sea undefined
      if (!response) {
        throw new Error("La respuesta de la API es vacía.");
      }

      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Rol actualizado correctamente.',
        life: 3000,
      });

      await fetchRoles();

      // Actualizar el rol en el array
      const index = roles.value.findIndex((r) => r.id_rol === id);
      if (index !== -1) {
        roles.value[index] = response; // Se usa la respuesta de la API
      }

      // Si el rol actualizado es el actual, lo reemplazamos
      if (currentRol.value?.id_rol === id) {
        currentRol.value = response;
      }

    } catch (err) {
      error.value = 'Error al actualizar el rol';
      console.error('Error actualizando el rol:', err);

      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo actualizar el rol. Intenta de nuevo.',
        life: 3000,
      });
    } finally {
      isLoading.value = false;
    }
 };


  // Eliminar un rol
  const deleteRol = async (id: number) => {
    isLoading.value = true
    error.value = null
    try {
      await rolService.deleteRol(id)

      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Rol eliminado exitosamente.',
        life: 3000,
      })
      await fetchRoles()

      if (currentRol.value?.id_rol === id) {
        currentRol.value = null
      }
    } catch (err) {
      error.value = 'Error al eliminar el rol'
      console.error('Error eliminando el rol:', err)

      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo eliminar el rol. Intenta de nuevo.',
        life: 3000,
      })
    } finally {
      isLoading.value = false
    }
  }

  return {
    roles,
    currentRol,
    isLoading,
    error,
    fetchRoles,
    createRol,
    updateRol,
    deleteRol,
  }
})
