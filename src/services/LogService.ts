import axios from 'axios'

class LogService {
  private static instance: LogService
  private apiClient

  private constructor() {
    this.apiClient = axios.create({
      baseURL: import.meta.env.VITE_LOG_ENDPOINT_API ?? 'http://localhost:7126/logs',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  public static getInstance(): LogService {
    if (!LogService.instance) {
      LogService.instance = new LogService()
    }
    return LogService.instance
  }

  public async log(level: 'error' | 'warning', message: string, details: any = {}) {
    try {
      if (typeof details !== 'object') {
        console.warn('Detalles inválidos para el log, se enviará un objeto vacío.')
        details = {}
      }

      await this.apiClient.post('/', {
        level,
        message,
        details,
        timestamp: new Date().toISOString(),
      })
    } catch (error: any) {
      console.error('Falló loguear el error:', error.response?.data || error.message)
    }
  }
}

export const logService = LogService.getInstance()
