import { defineStore } from 'pinia'
import { login, register, logout } from '@/services/AuthService'
import type { Credentials, RegisterCredentials } from '@/interfaces/IAuth'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { nombre: string; rol: { rol: string } },
    errorMessage: '',
    loading: false
  }),

  actions: {
    async loginUser(credentials: Credentials, router: any) { // Recibimos el router como parámetro
      this.loading = true
      this.errorMessage = ''

      try {
        const response = await login(credentials)
        this.user = response.usuario

        localStorage.setItem('token', response.token)
        localStorage.setItem('rol', response.usuario.rol.rol)
        localStorage.setItem('user', response.usuario.nombre)

        // Usamos el router que recibimos como parámetro
        if (response.usuario.rol.rol === 'Administrador') {
          router.push('/usuarios')
        } else {
          router.push('/inventario')
        }
      } catch (error: any) {
        this.errorMessage = error.message || 'Hubo un problema al iniciar sesión. Intente de nuevo'
        throw error
      } finally {
        this.loading = false
      }
    },

    async registerUser(credentials: RegisterCredentials) {
      this.loading = true
      this.errorMessage = ''

      try {
        const response = await register(credentials)
        return response
      } catch (error: any) {
        this.errorMessage = error.message || 'Hubo un problema al registrar el usuario'
        throw error
      } finally {
        this.loading = false
      }
    },

    async logoutUser() {
      try {
        await logout()
        this.user = null
        const router = useRouter()
        router.push('/login')
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
        throw error
      }
    }
  }
})
