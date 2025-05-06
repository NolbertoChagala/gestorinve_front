import { genericRequestAuthenticated } from "@/util/genericRequest";

export const getRoles = async () => {
    const response = await genericRequestAuthenticated('/roles', 'GET');
    console.log("API response:", response )
    return response.data;
}

export const getRolById = async (id: number) =>{
  const response = await genericRequestAuthenticated(`/roles/${id}`, 'GET');
  return response.data;
}

export const createRol = async (data: any) => {
    const response = await genericRequestAuthenticated('/roles', 'POST', data);
    return response.data;
}

export const updateRol = async (id: number, data: any) => {
    const response = await genericRequestAuthenticated(`/roles/${id}`, 'PUT', data);
    return response;
}

export const deleteRol = async (id: number) => {
    const response = await genericRequestAuthenticated(`/roles/${id}`, 'DELETE');
    return response.data
}
