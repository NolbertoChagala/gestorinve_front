import { genericRequestAuthenticated } from "@/util/genericRequest";

export const getMovements = async () => {
    const response = await genericRequestAuthenticated('/movements/all', 'GET');
    return response;
}

export const getMovementDetails = async (id: number) => {
    const response = await genericRequestAuthenticated(`/movements/${id}`, 'GET');
    return response;
}

export const registerMovement = async (data: any) => {
    const response = await genericRequestAuthenticated('/movements/register', 'POST', data);
    return response;
}
