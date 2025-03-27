import { genericRequestAuthenticated } from "@/util/genericRequest";


// Obtener todos los productos del inventario
export const getProducts = async () => {
    const response = await genericRequestAuthenticated('/inventory', 'GET')
    return response;
};

export const createProduct = async (data: any) => {
    const response = await genericRequestAuthenticated('/inventory', 'POST', data);
    return response;
}

export const editProduct = async (id: number, data: any) => {
    const response = await genericRequestAuthenticated(`/inventory/${id}`, 'PUT', data);
    return response;
}

export const deleteProduct = async (id: number) => {
    const response = await genericRequestAuthenticated(`/inventory/${id}`, 'DELETE')
    return response;
};

