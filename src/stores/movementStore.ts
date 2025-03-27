import { defineStore } from "pinia";
import { ref } from "vue";
import type { IMovement } from "@/interfaces/IMovement";
import type { IMovementDetails } from "@/interfaces/IMovementDetails";
import type { IRegisterMovement } from "@/interfaces/IRegisterMovement";
import { useToast } from "primevue/usetoast";
import { getMovements, getMovementDetails, registerMovement } from "@/services/movementService";

export const useMovementStore = defineStore('movements', () => {
    const movements = ref<IMovement[]>([]);
    const movementDetails = ref<IMovementDetails | null>(null);
    const isLoading = ref(false);
    const errorMessage = ref("");
    const toast = useToast();

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

    // Registrar un nuevo movimiento
    const addMovement = async (movementData: IRegisterMovement) => {
        errorMessage.value = "";
        
        try {
            const response = await registerMovement(movementData);
            if (response.success) {
                toast.add({ severity: "success", summary: "Éxito", detail: response.message, life: 3000 });
                fetchMovements(); // Recargar lista de movimientos
            } else {
                errorMessage.value = response.message;
                toast.add({ severity: "warn", summary: "Atención", detail: response.message, life: 3000 });
            }
            return response;
        } catch (error) {
            errorMessage.value = "Error al registrar el movimiento";
            console.error(error);
            toast.add({ severity: "error", summary: "Error", detail: "Error al registrar el movimiento", life: 3000 });
        }
    };

    return{
        movements,
        fetchMovements,
        fetchMovementDetails,
        movementDetails,
        addMovement
    }
})
