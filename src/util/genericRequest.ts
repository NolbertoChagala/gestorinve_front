import api from '@/services/ApiService'
import axios from 'axios'

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
const API_BASE_URL = 'https://localhost:7126/api'

export const genericRequest = async (
  url: string,
  method: HTTPMethod,
  body?: any,
) => {
  try {
    const response = await axios({
      baseURL: API_BASE_URL,
      url,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
    })
    return response.data
  } catch (error: any) {
    const errorMessage = error.response?.data || error.message || 'Error desconocido'
    console.error(`Error en ${method} ${url}: ${errorMessage}`)

    return { error: true, message: error.response?.data || "Error desconocido" };
  }
}

// Peticiones con autenticación
export const genericRequestAuthenticated = async (
  url: string,
  method: HTTPMethod,
  body?: any
) => {
  try {
    const response = await api({
      url: url,
      method,
      data: body
    })
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data || error.message || 'Error desconocido'
    console.error(`Error en ${method} ${url}: ${errorMessage}`)

    return { error: true, message: error.response?.data || "Error desconocido" };
  }
}
