import { genericRequest } from "@/util/genericRequest";
import type { ILog } from "@/interfaces/ILog";

export const getLogs = async () => {
    const response = await genericRequest('/logs', 'GET');
    return response;
}

export const registerLog = async (log: ILog) => {
    const response = await genericRequest('/logs', 'POST', log);
    return response;
}

export const deleteLogs = async () => {
    const response = await genericRequest('/logs', 'DELETE');
    return response;
}