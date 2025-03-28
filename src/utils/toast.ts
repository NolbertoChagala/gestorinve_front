import { useToast, TYPE } from "vue-toastification";
import type { App } from "vue";

let toastInstance: ReturnType<typeof useToast> | null = null;

/**
 * Inicializa la instancia de toast para ser utilizada globalmente.
 * @param app - La aplicación Vue
 */
export const initToast = (app: App): void => {
    toastInstance = useToast();
};

/**
 * Muestra un toast de error, éxito, advertencia o información.
 * @param message - El mensaje del toast
 * @param type - Tipo de mensaje (error, success, warning, info)
 */
export const showToast = (message: string, type: keyof typeof TYPE = "error"): void => {
    if (toastInstance) {
        toastInstance[type](message);
    } else {
        console.error("Toast no está inicializado");
    }
};
