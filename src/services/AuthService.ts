import { genericRequest, genericRequestAuthenticated } from '@/util/genericRequest';
import type { Credentials } from '@/interfaces/IAuth';

export const login = async (credentials: Credentials) => {
    const response = await genericRequest('/auth/login', 'POST', credentials);
    return response;
}

export const logout = async () => {
    return await genericRequestAuthenticated('/auth/logout', 'POST');
}
