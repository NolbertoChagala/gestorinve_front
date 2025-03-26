import type { ILog } from '@/interfaces/ILog'
import { registerLog } from '@/services/logService'
import api from './axiosInstance'
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
    const errorMessage = error.response?.data?.message || error.message || 'Error desconocido'
    const statusCode = error.response?.status || 500;
    const endpoint = url;

    const log: ILog = {
      mensaje: errorMessage,
      stack_trace: error.stack || 'No stack trace disponible',
      endpoint: endpoint,
      status_code: statusCode,
    }

    // Llamamos al servicio para registrar el log
    await registerLog(log);

    // Mostramos el error en la consola para depuración
    console.error(`Error en ${method} ${url}: ${errorMessage}`);

    return { error: true, message: errorMessage };
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
    const errorMessage = error.response?.data?.message || error.message || 'Error desconocido'
    const statusCode = error.response?.status || 500;
    const endpoint = url;

    const log: ILog = {
      mensaje: errorMessage,
      stack_trace: error.stack || 'No stack trace disponible',
      endpoint: endpoint,
      status_code: statusCode,
    }

    // Llamamos al servicio para registrar el log
    await registerLog(log);

    // Mostramos el error en la consola para depuración
    console.error(`Error en ${method} ${url}: ${errorMessage}`);

    return { error: true, message: errorMessage };
  }
}
