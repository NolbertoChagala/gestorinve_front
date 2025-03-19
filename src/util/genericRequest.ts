// genericRequest.ts
import { apiClient } from '../services/ApiService'

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
    console.error(`Error en ${method} ${url}: ${errorMessage}`)

    throw new Error(errorMessage)
  }
}
