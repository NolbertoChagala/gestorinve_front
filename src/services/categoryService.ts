import { genericRequestAuthenticated } from "@/util/genericRequest";

export const getCategories = async () => {
    const response = await genericRequestAuthenticated('/categoria', 'GET');
    return response;
}

export const createCategory = async (data: any) => {
    const response = await genericRequestAuthenticated('/categoria', 'POST', data);
    return response;
}

export const updateCategory = async (id: number, data: any) => {
    const response = await genericRequestAuthenticated(`/categoria/${id}`, 'PUT', data);
    return response;
}

export const deleteCategory = async (id: number) => {
    const response = await genericRequestAuthenticated(`/categoria/${id}`, 'DELETE');
    return response;
}
