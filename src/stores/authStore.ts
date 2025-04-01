import { defineStore } from 'pinia'
import { login, logout } from '@/services/AuthService'
import type { Credentials } from '@/interfaces/IAuth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<null | { id: number; nombre: string; rol: { rol: string } }>(null)
  const userId = ref<number | null>(null)
  const errorMessage = ref('')
  const loading = ref(false)

  const router = useRouter()
  const loginUser = async (credentials: Credentials) => {
    loading.value = true
    errorMessage.value = ''
    const cleanedData = JSON.parse(JSON.stringify(credentials))

    try {
      const response = await login(cleanedData)

      // Verificar si se recibió el token en la respuesta
      if (!response.token) {
        errorMessage.value = 'Usuario no registrado'
        throw new Error('Usuario no registrado')
      }

      user.value = response.usuario
      console.log('Usuario logueado:', response.usuario)
      userId.value = response.usuario.id_usuario
      console.log("ID del usuario", response.usuario.id_usuario)
      localStorage.setItem('token', response.token)
      localStorage.setItem('userId', response.usuario.id_usuario)
      localStorage.setItem('rol', response.usuario.rol.rol)
      localStorage.setItem('user', response.usuario.nombre)

      if (response.usuario.rol.rol === 'admin') {
        router.push('/dashboard')
      } else {
        router.push('/dashboard')
      }
    } catch (error: any) {
      // En caso de que haya un error al hacer login o si no se recibió el token
      if (!errorMessage.value) {
        errorMessage.value = error.message || 'Hubo un problema al iniciar sesión. Intente de nuevo'
      }
      throw error
    } finally {
      loading.value = false
    }
  }

  const logoutUser = async () => {
    try {
      await logout()
      user.value = null
      userId.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('rol')
      localStorage.removeItem('user')

      router.push('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      throw error
    }
  }

  return {
    user,
    userId,
    errorMessage,
    loading,
    loginUser,
    logoutUser,
  }
})
