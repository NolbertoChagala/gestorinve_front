import { genericRequestAuthenticated } from "@/util/genericRequest";

// Obtener todos los productos del inventario
export const getProducts = async () => {
    const response = await genericRequestAuthenticated('/inventory', 'GET');
    return response;
}

// Obtener producto por ID
export const getProductById = async (id: number) => {
    const response = await genericRequestAuthenticated(`/inventory/${id}`, 'GET');
    return response;
}

// Crear un producto
export const createProduct = async (data: any) => {
    const response = await genericRequestAuthenticated('/inventory', 'POST', data);
    return response;
}

// Editar un producto por ID
export const updateProduct = async (id: number, data: any) => {
    const response = await genericRequestAuthenticated(`/inventory/${id}`, 'PUT', data);
    return response;
}

// Eliminar un producto por ID
export const deleteProduct = async (id: number) => {
    const response = await genericRequestAuthenticated(`/inventory/${id}`, 'DELETE');
    return response;
}