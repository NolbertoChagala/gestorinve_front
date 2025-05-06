import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import type { ICategory } from "@/interfaces/ICategory";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/services/categoryService";

export const useCategoryStore = defineStore('category', () => {
    const categories = ref<ICategory[]>([]);
    const loading = ref(false);
    const errorMessage = ref<string | null>(null);
    const successMessage = ref<string | null>(null);
    const toast = useToast();

    const fetchCategories = async () => {
        loading.value = true;
        errorMessage.value = null;
        successMessage.value = null;

        try {
            const response = await getCategories();
            if (response.success) {
                categories.value = response.data;
                successMessage.value = response.message;
            } else {
                errorMessage.value = response.message;
            }
        } catch (error) {
            errorMessage.value = "Error al obtener las categorías";
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    const addCategory = async (categoryData: ICategory) => {
        loading.value = true;
        errorMessage.value = null;
        successMessage.value = null;

        try {
            const response = await createCategory(categoryData);
            if (response.success) {
                successMessage.value = response.message;
                fetchCategories();
                toast.add({ severity: "success", summary: "Éxito", detail: response.message, life: 3000 });
            } else {
                errorMessage.value = response.message;
                toast.add({ severity: "warn", summary: "Atención", detail: response.message, life: 3000 });
            }
        } catch (error) {
            errorMessage.value = "Error al crear la categoría";
            console.error(error);
            toast.add({ severity: "error", summary: "Error", detail: "Error al crear la categoría", life: 3000 });
        } finally {
            loading.value = false;
        }
    };

    const editCategory = async (id: number, categoryData: ICategory) => {
        loading.value = true;
        errorMessage.value = null;
        successMessage.value = null;

        try {
            const response = await updateCategory(id, categoryData);
            if (response.success) {
                successMessage.value = response.message;
                fetchCategories();
                toast.add({ severity: "success", summary: "Éxito", detail: response.message, life: 3000 });
            } else {
                errorMessage.value = response.message;
                toast.add({ severity: "warn", summary: "Atención", detail: response.message, life: 3000 });
            }
        } catch (error) {
            errorMessage.value = "Error al actualizar la categoría";
            console.error(error);
            toast.add({ severity: "error", summary: "Error", detail: "Error al actualizar la categoría", life: 3000 });
        } finally {
            loading.value = false;
        }
    };

    const removeCategory = async (id: number) => {
        loading.value = true;
        errorMessage.value = null;
        successMessage.value = null;

        try {
            const response = await deleteCategory(id);
            if (response.success) {
                successMessage.value = response.message;
                fetchCategories();
                toast.add({ severity: "success", summary: "Éxito", detail: response.message, life: 3000 });
            } else {
                errorMessage.value = response.message;
                toast.add({ severity: "warn", summary: "Atención", detail: response.message, life: 3000 });
            }
        } catch (error) {
            errorMessage.value = "Error al eliminar la categoría";
            console.error(error);
            toast.add({ severity: "error", summary: "Error", detail: "Error al eliminar la categoría", life: 3000 });
        } finally {
            loading.value = false;
        }
    };

    return {
        categories,
        loading,
        errorMessage,
        successMessage,
        fetchCategories,
        addCategory,
        editCategory,
        removeCategory
    };
});
