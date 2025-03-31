import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import type { ILogGet } from "@/interfaces/ILogGet";
import { getLogs, deleteLogs } from "@/services/logService";

export const useLogStore = defineStore('logs', () => {
    const logs = ref<ILogGet[]>([]);
    const errorMessage = ref<string | null>(null);
    const toast = useToast();

    const fetchLogs = async () => {
        try{
            const response = await getLogs();
            if(response.success){
                logs.value = response.data;
            }
        } catch(error) {
            errorMessage.value = "Error al obtener las categorías";
            console.error(error);
        }
    }

    const removeAllLogs = async () => {
        try{
            const response = await deleteLogs();
            if(response.success){
                fetchLogs();
                toast.add({ severity: "success", summary: "Éxito", detail: response.message, life: 3000 });
            }
        } catch(error){
            errorMessage.value = "Error al eliminar todos los logs";
            console.error(error);
            toast.add({ severity: "error", summary: "Error", detail: "Error al eliminar todos los Logs", life: 3000 });
        }
    }

    return{
        fetchLogs,
        logs,
        removeAllLogs
    }

})