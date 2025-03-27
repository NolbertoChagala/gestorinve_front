import { genericRequest, genericRequestAuthenticated } from '@/util/genericRequest';
import type { Credentials } from '@/interfaces/IAuth';

// Iniciar sesión
export const login = async (credentials: Credentials) => {
    const response = await genericRequest('/auth/login', 'POST', credentials);
    if (!response.token) {
        throw new Error('No se recibió token en la respuesta');
    }
    return response;
}

// Cerrar sesión
export const logout = async () => {
    return await genericRequestAuthenticated('/auth/logout', 'POST');
}
