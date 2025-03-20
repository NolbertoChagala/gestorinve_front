import { defineStore } from 'pinia'
import api from '@/services/ApiService'
import { ref } from 'vue'
import type { User } from '@/interfaces/user'

export const useUserStore = defineStore('user', () => {
  // Estado
  const usuarios = ref<User[]>([]) // Lista de usuarios
  const currentUser = ref<User | null>(null) // Usuario actual
  const error = ref<string | null>(null) // Estado para manejar errores

  // Función para manejar errores
  const handleError = (message: string, error: any) => {
    console.error(message, error)
    error.value = message
  }

  const fetchUsuarios = async () => {
    try {
      const response = await api.get('/Usuario/ObtenerUsuarios')
      usuarios.value = response.data
    } catch (error) {
      handleError('Error al obtener los usuarios:', error)
    }
  }

  const fetchUsuario = async (id: number) => {
    try {
      const response = await api.get(`/Usuario/ObtenerUsuario/${id}`)
      currentUser.value = response.data
    } catch (error) {
      handleError('Error al obtener los datos del usuario:', error)
    }
  }

  const createUsuario = async (usuario: User) => {
    try {
      const response = await api.post('/Usuario', usuario)
      usuarios.value.push(response.data)
    } catch (error) {
      handleError('Error al crear el usuario:', error)
    }
  }

  const updateUsuario = async (usuario: User) => {
    try {
      const response = await api.put('/Usuario/Editar', usuario)
      const index = usuarios.value.findIndex((u) => u.id_usuario === usuario.id_usuario)
      if (index !== -1) {
        usuarios.value[index] = response.data
      }
    } catch (error) {
      handleError('Error al actualizar el usuario:', error)
    }
  }

  const deleteUsuario = async (id: number | undefined) => {
    if (!id) {
      handleError('ID de usuario inválido:', 'ID es undefined')
      return
    }

    try {
      await api.delete(`/Usuario/Eliminar/${id}`)
      usuarios.value = usuarios.value.filter((u) => u.id_usuario !== id)
    } catch (error) {
      handleError('Error al eliminar el usuario:', error)
    }
  }

  const allUsuarios = () => usuarios.value
  const getCurrentUser = () => currentUser.value
  const getError = () => error.value 

  return {
    usuarios,
    currentUser,
    error,
    fetchUsuarios,
    fetchUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    allUsuarios,
    getCurrentUser,
    getError,
  }
})
