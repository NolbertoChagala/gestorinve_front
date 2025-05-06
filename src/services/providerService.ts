import type { IProvider } from "@/interfaces/IProvider";
import { genericRequestAuthenticated } from "@/util/genericRequest";

export const getProviders = async () => {
    const response = await genericRequestAuthenticated('/providers', 'GET');
    return response;
}

export const getProviderById = async (id: number) => {
    const response = await genericRequestAuthenticated(`/providers/with-products/${id}`, 'GET');
    return response;
}

export const createProvider = async (data: IProvider) => {
    const response = await genericRequestAuthenticated('/providers', 'POST', data);
    return response;
}

export const updateProvider = async (id: number, data: Partial<IProvider>) => {
    const response = await genericRequestAuthenticated(`/providers/${id}`, 'PUT', data);
    return response;
}

export const deleteProvider = async (id: number) => {
    const response = await genericRequestAuthenticated(`/providers/${id}`, 'DELETE');
    return response;
}
