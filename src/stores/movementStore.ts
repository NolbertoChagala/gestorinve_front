import { defineStore } from "pinia";
import { ref } from "vue";
import type { IMovement } from "@/interfaces/IMovement";
import type { IMovementDetails } from "@/interfaces/IMovementDetails";
import { getMovements, getMovementDetails } from "@/services/movementService";

export const useMovementStore = defineStore('movements', () => {
    const movements = ref<IMovement[]>([]);
    const movementDetails = ref<IMovementDetails | null>(null);
    const isLoading = ref(false);
    const errorMessage = ref("");

    // Función para obtener todos los movimientos
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

    // Función para obtener los detalles de un movimiento por ID
    const fetchMovementDetails = async (id: number) => {
        try {
            const response = await getMovementDetails(id);
            movementDetails.value = response;
        } catch (error) {
            console.error('Error al obtener detalles del movimiento:', error);
        }
    };

    return{
        movements,
        fetchMovements,
        fetchMovementDetails,
        movementDetails
    }
})
