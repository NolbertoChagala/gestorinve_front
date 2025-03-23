import api from '../util/axiosInstance'

interface Credentials {
  correo: string
  contraseña: string
}

interface RegisterCredentials {
  nombre: string
  correo: string
  contraseña: string
}

export const login = async (credentials: Credentials) => {
  try {
    const response = await api.post('/auth/login', credentials)
    const token = response.data.token
    if (token) {
      localStorage.setItem('token', token)
    }
    return response.data
  } catch (error: any) {
    console.error('Error en login:', error)
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('Credenciales inválidas')
      }
      throw new Error(error.response.data?.message || 'Error en el login')
    }
    throw new Error('Error en el login')
  }
}

export const register = async (credentials: RegisterCredentials) => {
  try {
    // Enviamos los datos al backend
    const response = await api.post('/auth/register', {
      nombre: credentials.nombre,
      correo: credentials.correo,
      contraseña: credentials.contraseña,
    })

    return response.data
  } catch (error: any) {
    console.error('Error en el registro:', error)
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error(error.response.data?.message || 'Error en el registro')
      }
      throw new Error(error.response.data?.message || 'Error en el registro')
    }
    throw new Error('Error en el registro')
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  window.location.href = '/login'
}
