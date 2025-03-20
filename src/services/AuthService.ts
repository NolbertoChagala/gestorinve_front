import api from './ApiService'
import axios from 'axios';


interface Credentials {
  correo: string
  contraseña: string
}

export const login = async (credentials: Credentials) => {
  try {
    // Realizamos la solicitud a la API para obtener el token
    const response = await api.post('/auth/login', credentials)

    // Verificamos si el token está en la respuesta
    const token = response.data.token
    if (token) {
      // Guardamos el token en el localStorage
      localStorage.setItem('token', token)
    }

    // Retornamos solo los datos necesarios (por ejemplo, el token o la respuesta completa)
    return response.data
  } catch (error) {
    console.error('Error en login:', error)
    // Manejo de errores más específico (si es posible)
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('Credenciales inválidas')
      }
      throw new Error(error.response.data || 'Error en el login')
    }
    throw new Error('Error en el login')
  }
}

export const logout = () => {
  // Eliminamos el token del localStorage
  localStorage.removeItem('token')

  // Redirigimos a la página de login, preferentemente usando el router si se usa Vue Router
  window.location.href = '/login'
}
