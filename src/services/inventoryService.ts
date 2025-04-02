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

export const GenerateReport = async () => {
    try {
        // Usa genericRequestAuthenticated con responseType: 'blob'
        const response = await genericRequestAuthenticated(
            '/Report/report',
            'GET',
            null,
            { responseType: 'blob' } // ¡Esto es crucial!
        );

        // Verifica si la respuesta es un Blob
        if (response instanceof Blob) {
            // Verifica que el Blob no esté vacío y sea un PDF
            if (response.size === 0) {
                throw new Error('El reporte generado está vacío');
            }
            if (response.type !== 'application/pdf') {
                throw new Error('La respuesta no es un PDF válido');
            }
            return response;
        }

        throw new Error('Respuesta inesperada del servidor');
    } catch (error: any) {
        console.error('Error en GenerateReport:', error);

        // Manejo específico para errores 404
        if (error.response?.status === 404) {
            throw new Error('No hay productos con bajo stock para generar el reporte');
        }

        throw new Error(error.message || 'Error al generar el reporte');
    }
};




