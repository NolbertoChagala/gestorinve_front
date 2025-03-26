import type { IProvider } from "@/interfaces/IProvider";
import { genericRequestAuthenticated } from "@/util/genericRequest";

//* Obtener todos los proveedores
export const getProviders = async () => {
    const response = await genericRequestAuthenticated('/providers', 'GET');
    return response;
}

//* Obtener proveedor por ID
export const getProviderById = async (id: number) => {
    const response = await genericRequestAuthenticated(`/providers/with-products/${id}`, 'GET');
    return response;
}

//* Crear un proveedor
export const createProvider = async (data: IProvider) => {
    const response = await genericRequestAuthenticated('/providers', 'POST', data);
    return response;
}

//* Editar un proveedor por ID
export const updateProvider = async (id: number, data: Partial<IProvider>) => {
    const response = await genericRequestAuthenticated(`/providers/${id}`, 'PUT', data);
    return response;
}

//* Eliminar un proveedor por ID
export const deleteProvider = async (id: number) => {
    const response = await genericRequestAuthenticated(`/providers/${id}`, 'DELETE');
    return response;
}