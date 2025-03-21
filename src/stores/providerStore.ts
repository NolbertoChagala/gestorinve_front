import { defineStore } from "pinia";
import { ref } from "vue";
import type { IProvider } from "@/interfaces/IProvider";
import { getProviders, getProviderById, createProvider, updateProvider, deleteProvider } from "@/services/providerService";

export const useProviderStore = defineStore('provider', () => {
    const providers = ref<IProvider[]>([]);
    const selectedProvider = ref<IProvider | null>(null);

    //* Obtener todos los proveedores
    const fetchProviders = async () => {
        try {
            const response = await getProviders();
            providers.value = response.data;
        } catch (error) {
            console.error("Error al obtener proveedores:", error);
        }
    };

    //* Obtener un proveedor por ID
    const fetchProviderById = async (id_proveedor: number) => {
        try {
            const response = await getProviderById(id_proveedor);
            selectedProvider.value = response.data;
        } catch (error) {
            console.error(`Error al obtener proveedor con ID ${id_proveedor}:`, error);
        }
    };

    //* Crear un proveedor
    const addProvider = async (provider: IProvider) => {
        try {
            const response = await createProvider(provider);
            console.log("Proveedor creado:", response);
            // Si la respuesta tiene el mensaje de éxito, debes obtener la lista de proveedores
            if (response.success) {
                // Aquí podrías volver a cargar los proveedores, ya que no se devuelven los datos creados
                await fetchProviders(); // Actualizar la lista de proveedores
            } else {
                console.error("Error al crear el proveedor: ", response.message);
            }
            return response;  // Retorna la respuesta
        } catch (error) {
            console.error("Error al crear proveedor:", error);
            throw error;
        }
    };


    //* Editar un proveedor
    const editProvider = async (id_proveedor: number, data: IProvider) => {
        try {
            await updateProvider(id_proveedor, data);
            await fetchProviders(); // Actualizar la lista de proveedores
        } catch (error) {
            console.error(`Error al actualizar proveedor con ID ${id_proveedor}:`, error);
        }
    };

    //* Eliminar un proveedor
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
