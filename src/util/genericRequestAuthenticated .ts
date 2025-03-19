// genericRequestAuthenticated.ts
import { genericRequest } from './genericRequest'

export const genericRequestAuthenticated = async (
  url: string,
  method: HTTPMethod,
  body?: any
) => {
  return await genericRequest(url, method, body)
}
