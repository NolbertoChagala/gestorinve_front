import { genericRequestAuthenticated } from "@/util/genericRequest";

// Obtener todas las categorías
export const getCategories = async () => {
    const response = await genericRequestAuthenticated('/categoria', 'GET');
    return response;
}

// Crear una nueva categoría
export const createCategory = async (data: any) => {
    const response = await genericRequestAuthenticated('/categoria', 'POST', data);
    return response;
}

// Editar una categoría por ID
export const updateCategory = async (id: number, data: any) => {
    const response = await genericRequestAuthenticated(`/categoria/${id}`, 'PUT', data);
    return response;
}

// Eliminar una categoría por ID
export const deleteCategory = async (id: number) => {
    const response = await genericRequestAuthenticated(`/categoria/${id}`, 'DELETE');
    return response;
}
