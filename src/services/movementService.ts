import { genericRequestAuthenticated } from "@/util/genericRequest";

// Obtener todos los movimientos
export const getMovements = async () => {
    const response = await genericRequestAuthenticated('/movements/all', 'GET');
    return response;
}

// Obtener los detalles de un movimiento
export const getMovementDetails = async (id: number) => {
    const response = await genericRequestAuthenticated(`movements/${id}`, 'GET');
    return response;
}