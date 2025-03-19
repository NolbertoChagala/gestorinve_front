// Objetivo: Contiene las funciones para realizar peticiones genéricas a la API.
import { apiClient } from '../services/ApiService'
import { logService } from '../services/LogService'

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const genericRequest = async (
  url: string,
  method: HTTPMethod,
  body?: any,
  headers: Record<string, string> = {}
) => {
  try {
    const response = await apiClient({
      url,
      method,
      headers: { ...apiClient.defaults.headers, ...headers },
      data: body,
    })
    return response.data
  } catch (error: any) {
    const errorMessage = error.response?.data || error.message || 'Error desconocido'

    await logService.log('error', `Error en genericRequest: ${errorMessage}`, {
      url,
      method,
      body,
      headers,
      error: errorMessage,
    })

    throw new Error(errorMessage)
  }
}

export const genericRequestAuthenticated = async (
  url: string,
  method: HTTPMethod,
  body?: any
) => {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('No se encontró el token de autenticación')
  }

  return await genericRequest(url, method, body, {
    Authorization: `Bearer ${token}`,
  })
}
