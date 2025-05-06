import { defineStore } from "pinia";
import { ref } from "vue";
import type { IProvider } from "@/interfaces/IProvider";
import { getProviders, getProviderById, createProvider, updateProvider, deleteProvider } from "@/services/providerService";

export const useProviderStore = defineStore('provider', () => {
    const providers = ref<IProvider[]>([]);
    const selectedProvider = ref<IProvider | null>(null);

    const fetchProviders = async () => {
        try {
            const response = await getProviders();
            providers.value = response.data;
        } catch (error) {
            console.error("Error al obtener proveedores:", error);
        }
    };

    const fetchProviderById = async (id_proveedor: number) => {
        try {
            const response = await getProviderById(id_proveedor);
            selectedProvider.value = response.data;
        } catch (error) {
            console.error(`Error al obtener proveedor con ID ${id_proveedor}:`, error);
        }
    };

    const addProvider = async (provider: IProvider) => {
        try {
            const response = await createProvider(provider);
            console.log("Proveedor creado:", response);

            if (response.success) {

                await fetchProviders();
            } else {
                console.error("Error al crear el proveedor: ", response.message);
            }
            return response;
        } catch (error) {
            console.error("Error al crear proveedor:", error);
            throw error;
        }
    };



    const editProvider = async (id_proveedor: number, data: IProvider) => {
        try {
            await updateProvider(id_proveedor, data);
            await fetchProviders();
        } catch (error) {
            console.error(`Error al actualizar proveedor con ID ${id_proveedor}:`, error);
        }
    };

    
    const removeProvider = async (id_proveedor: number) => {
        try {
            await deleteProvider(id_proveedor);
            providers.value = providers.value.filter(provider => provider.id_proveedor !== id_proveedor);
        } catch (error) {
            console.error(`Error al eliminar proveedor con ID ${id_proveedor}:`, error);
        }
    };

    return {
        providers,
        selectedProvider,
        fetchProviders,
        fetchProviderById,
        addProvider,
        editProvider,
        removeProvider
    };
});
