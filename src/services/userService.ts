import { genericRequestAuthenticated } from "@/util/genericRequest";


// Obtener todos los usuarios
export const getUsers = async () => {
    const response = await genericRequestAuthenticated('/Usuario', 'GET');
    return response.data;
}

// Obtener usuario por ID
export const getUserById = async (id: number) => {
    const response = await genericRequestAuthenticated(`/Usuario/${id}`, 'GET');
    return response.data;
}

// Crear un usuario
export const createUser = async (data: any) => {
    const response = await genericRequestAuthenticated('/Usuario/Crear', 'POST', data);
    return response.data;
}

// Editar un usuario
export const updateUser = async (id: number, data: any) => {
    const response = await genericRequestAuthenticated('/Usuario/${id}', 'PUT', data);
    return response.data;
}

// Eliminar un usuario por ID
export const deleteUser = async (id: number) => {
    const response = await genericRequestAuthenticated(`/Usuario/${id}`, 'DELETE');
    return response.data;
}

