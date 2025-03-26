import { genericRequest, genericRequestAuthenticated } from '../util/genericRequest'
import type { Credentials, RegisterCredentials } from '@/interfaces/IAuth'

export const login = async (credentials: Credentials) => {
  try {
    const response = await genericRequest('/auth/login', 'POST', credentials)

    // Asumiendo que tu backend devuelve { token, usuario } en response.data
    const token = response.token
    const usuario = response.usuario

    if (!token) {
      throw new Error('No se recibió token en la respuesta')
    }

    localStorage.setItem('token', token)
    return { token, usuario }
  } catch (error: any) {
    console.error('Error en login:', error)
    if (error.error) { // Esto cambia según tu genericRequest original
      throw new Error(error.message)
    }
    throw error
  }
}

export const register = async (credentials: RegisterCredentials) => {
  try {
    const response = await genericRequestAuthenticated('/auth/register', 'POST', {
      nombre: credentials.nombre,
      correo: credentials.correo,
      contraseña: credentials.contraseña,
      rol: credentials.rol
    })
    return response
  } catch (error: any) {
    console.error('Error en el registro:', error)
    if (error.error) {
      throw new Error(error.message)
    }
    throw error
  }
}

export const logout = async () => {
  try {
    await genericRequestAuthenticated('/auth/logout', 'POST')
    localStorage.removeItem('token')
    localStorage.removeItem('rol')
    localStorage.removeItem('user')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
    throw error
  }
}
