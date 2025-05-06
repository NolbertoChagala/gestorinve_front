import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import type { IProduct } from "@/interfaces/IProduct";
import type { ICreateProduct } from "@/interfaces/ICreateProduct";
import { getProducts, createProduct, editProduct, deleteProduct, GenerateReport } from "@/services/inventoryService";
import type { IEditProduct } from "@/interfaces/IEditProduct";

export const useInventoryStore = defineStore('inventory', () => {
    const products = ref<IProduct[]>([]);
    const loading = ref(false);
    const errorMessage = ref<string | null>(null);
    const successMessage = ref<string | null>(null);
    const toast = useToast();

    const fetchProducts = async () => {
        loading.value = true;
        errorMessage.value = null;
        successMessage.value = null;

        try {
            const response = await getProducts();
            if (response.success) {
                products.value = response.data;
                successMessage.value = response.message;
            } else {
                errorMessage.value = response.message;
            }
        } catch (error) {
            errorMessage.value = "Error al obtener los productos";
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    const addProduct = async (productData: ICreateProduct) => {
        loading.value = true;
        errorMessage.value = null;
        successMessage.value = null;

        try {
            const response = await createProduct(productData);
            if (response.success) {
                successMessage.value = response.message;
                fetchProducts();
                toast.add({ severity: "success", summary: "Éxito", detail: response.message, life: 3000 });
            } else {
                errorMessage.value = response.message;
                toast.add({ severity: "warn", summary: "Atención", detail: response.message, life: 3000 });
            }
        } catch (error) {
            errorMessage.value = "Error al crear el producto";
            console.error(error);
            toast.add({ severity: "error", summary: "Error", detail: "Error al crear el producto", life: 3000 });
        } finally {
            loading.value = false;
        }
    };

    const updateProduct = async (id: number, productData: IEditProduct) => {
        loading.value = true;
        errorMessage.value = null;
        successMessage.value = null;

        try {
            const response = await editProduct(id, productData);
            if (response.success) {
                successMessage.value = response.message;
                fetchProducts();
                toast.add({ severity: "success", summary: "Éxito", detail: response.message, life: 3000 });
            } else {
                errorMessage.value = response.message;
                toast.add({ severity: "warn", summary: "Atención", detail: response.message, life: 3000 });
            }
        } catch (error) {
            errorMessage.value = "Error al actualizar el producto";
            console.error(error);
            toast.add({ severity: "error", summary: "Error", detail: "Error al actualizar el producto", life: 3000 });
        } finally {
            loading.value = false;
        }
    };

    const removeProduct = async (id: number) => {
        loading.value = true;
        errorMessage.value = null;
        successMessage.value = null;

        try {
            const response = await deleteProduct(id);
            if (response.success) {
                successMessage.value = response.message;
                fetchProducts();
                toast.add({ severity: "success", summary: "Éxito", detail: response.message, life: 3000 });
            } else {
                errorMessage.value = response.message;
                toast.add({ severity: "warn", summary: "Atención", detail: response.message, life: 3000 });
            }
        } catch (error) {
            errorMessage.value = "Error al eliminar el producto";
            console.error(error);
            toast.add({ severity: "error", summary: "Error", detail: "Error al eliminar el producto", life: 3000 });
        } finally {
            loading.value = false;
        }
    };

    const generateReport = async () => {
        loading.value = true;
        try {
            const pdfBlob = await GenerateReport();

            const pdfUrl = URL.createObjectURL(pdfBlob);

            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'LowStockReport.pdf';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();

            setTimeout(() => {
                document.body.removeChild(link);
                URL.revokeObjectURL(pdfUrl);
            }, 100);
            toast.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Reporte descargado correctamente',
                life: 3000
            });
        } catch (error: any) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: error.message || 'Error al generar el reporte',
                life: 3000
            });
        } finally {
            loading.value = false;
        }
    };

    return {
        products,
        loading,
        errorMessage,
        successMessage,
        fetchProducts,
        addProduct,
        updateProduct,
        removeProduct,
        generateReport
    };
});
