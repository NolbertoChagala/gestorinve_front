import { genericRequestAuthenticated } from "@/util/genericRequest";


export const getUsers = async () => {
    const response = await genericRequestAuthenticated('/users', 'GET');
    console.log('API Response:', response);
    return response;
}

export const getUserById = async (id: number) => {
    const response = await genericRequestAuthenticated(`/users/${id}`, 'GET');
    return response;
}

export const createUser = async (data: any) => {
    const response = await genericRequestAuthenticated('/users', 'POST', data);
    return response;
}

export const updateUser = async (id: number, data: any) => {
  const response = await genericRequestAuthenticated(`/users/${id}`, 'PUT', data);
  return response;
}

export const deleteUser = async (id: number) => {
    const response = await genericRequestAuthenticated(`/users/${id}`, 'DELETE');
    return response;
}
