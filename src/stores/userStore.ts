import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/interfaces/user'
import * as userService from '@/services/userService'

export const useUserStore = defineStore('user', () => {
  // Estado
  const usuarios = ref<User[]>([]) // Lista de usuarios
  const currentUser = ref<User | null>(null) // Usuario actual
  const error = ref<string | null>(null) // Estado para manejar errores


  const handleError = (message: string, err: any) => {
    console.error(message, err)
    error.value = `${message} ${err.response?.data?.message || err.message}`
  }

  // Obtener todos los usuarios
  const fetchUsuarios = async () => {
    try {
      console.log("Llamando api para obtener usuarios")
      usuarios.value = await userService.getUsers()
      console.log("Usuarios obtenidos", usuarios.value)
    } catch (err) {
      handleError('Error al obtener los usuarios:', err)
    }
  }


  // Obtener un usuario por ID
  const fetchUsuarioById = async (id: number) => {
    try {
      currentUser.value = await userService.getUserById(id)
    } catch (err) {
      handleError('Error al obtener los datos del usuario:', err)
    }
  }

  // Crear un usuario
  const createUsuario = async (usuario: User) => {
    try {
      const newUser = await userService.createUser(usuario)
      if (newUser) {
        usuarios.value.push(newUser)
      }
    } catch (err) {
      handleError('Error al crear el usuario:', err)
    }
  }

  // Actualizar un usuario
  const updateUsuario = async (usuario: User) => {
    try {
      const updatedUser = await userService.updateUser(usuario.id_usuario, usuario)
      const index = usuarios.value.findIndex((u) => u.id_usuario === usuario.id_usuario)
      if (index !== -1) {
        usuarios.value[index] = updatedUser
      }
    } catch (err) {
      handleError('Error al actualizar el usuario:', err)
    }
  }

  // Eliminar un usuario por ID
  const deleteUsuario = async (id: number) => {
    try {
      await userService.deleteUser(id)
      usuarios.value = usuarios.value.filter((u) => u.id_usuario !== id)
    } catch (err) {
      handleError('Error al eliminar el usuario:', err)
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
    fetchUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    allUsuarios,
    getCurrentUser,
    getError,
  }
})
