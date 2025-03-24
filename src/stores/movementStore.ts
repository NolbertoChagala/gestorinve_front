import { defineStore } from "pinia";
import { ref } from "vue";
import type { IMovement } from "@/interfaces/IMovement";
import { getMovements } from "@/services/movementService";

export const useMovementStore = defineStore('movements', () => {
    const movements = ref<IMovement[]>([]);
    const isLoading = ref(false);
    const errorMessage = ref("");

    const fetchMovements = async () => {
        isLoading.value = true;
        errorMessage.value = "";
        try {
            const response = await getMovements();
            movements.value = response?.data || [];
        } catch (error) {
            console.error("Error al obtener movimientos:", error);
            errorMessage.value = "No se pudieron cargar los movimientos.";
        } finally {
            isLoading.value = false;
        }
    }

    return{
        movements,
        fetchMovements
    }
})
