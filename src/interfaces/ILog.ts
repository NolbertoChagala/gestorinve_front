export interface ILog {
  mensaje: string,
  stack_trace?: string,
  endpoint: string,
  status_code: number
}