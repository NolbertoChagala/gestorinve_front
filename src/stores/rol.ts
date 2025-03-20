import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Rol } from '@/interfaces/rol' // Asegúrate de que esta ruta sea correcta
import api from '@/services/ApiService'// Ajusta la ruta según tu estructura

export const useRolStore = defineStore('rol', () => {
  // Estado
  const roles = ref<Rol[]>([])
  const currentRol = ref<Rol | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Acciones
  const fetchRoles = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await api.get<Rol[]>('/roles')
      roles.value = response.data
    } catch (err) {
      error.value = 'Error al cargar los roles'
      console.error('Error fetching roles:', err)
    } finally {
      isLoading.value = false
    }
  }

  const fetchRolById = async (id: number) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await api.get<Rol>(`/roles/${id}`)
      currentRol.value = response.data
    } catch (err) {
      error.value = 'Error al cargar el rol'
      console.error('Error fetching rol:', err)
    } finally {
      isLoading.value = false
    }
  }

  const createRol = async (rol: Omit<Rol, 'id_rol'>) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await api.post<Rol>('/roles', rol)
      roles.value.push(response.data)
    } catch (err) {
      error.value = 'Error al crear el rol'
      console.error('Error creating rol:', err)
    } finally {
      isLoading.value = false
    }
  }

  const updateRol = async (id: number, rol: Partial<Rol>) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await api.put<Rol>(`/roles/${id}`, rol)

      // Actualiza la lista de roles en el frontend
      const index = roles.value.findIndex((r) => r.id_rol === id)
      if (index !== -1) {
        roles.value[index] = response.data
      }
      if (currentRol.value?.id_rol === id) {
        currentRol.value = response.data
      }
    } catch (err) {
      error.value = 'Error al actualizar el rol'
      console.error('Error updating rol:', err)
    } finally {
      isLoading.value = false
    }
  }

  const deleteRol = async (id: number) => {
    isLoading.value = true
    error.value = null
    try {
      await api.delete(`/roles/${id}`)
      roles.value = roles.value.filter((r) => r.id_rol !== id)
      if (currentRol.value?.id_rol === id) {
        currentRol.value = null
      }
    } catch (err) {
      error.value = 'Error al eliminar el rol'
      console.error('Error deleting rol:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Getters
  const getRolById = (id: number) => {
    return roles.value.find((r) => r.id_rol === id)
  }

  return {
    roles,
    currentRol,
    isLoading,
    error,
    fetchRoles,
    fetchRolById,
    createRol,
    updateRol,
    deleteRol,
    getRolById,
  }
})
