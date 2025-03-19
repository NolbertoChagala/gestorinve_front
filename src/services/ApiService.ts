import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7126/api'


let authToken = localStorage.getItem('token') ?? ''

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Interceptor para agregar el token a cada solicitud
api.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la respuesta:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// Funciones para manejar el token
export const setAuthToken = (token: string) => {
  authToken = token
  localStorage.setItem('token', token)
}

export const clearAuthToken = () => {
  authToken = ''
  localStorage.removeItem('token')
}

export default api
