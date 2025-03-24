import { genericRequestAuthenticated } from "@/util/genericRequest";

export const getMovements = async () => {
    const response = await genericRequestAuthenticated('/movements/all', 'GET');
    return response;
}