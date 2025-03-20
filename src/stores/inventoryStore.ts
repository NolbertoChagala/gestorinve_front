import { defineStore } from "pinia";
import { ref } from "vue";
import type { IProduct } from "@/interfaces/IProduct";
import { getProducts } from "@/services/inventoryService";

export const useInventoryStore = defineStore('inventory', () => {
    const products = ref<IProduct[]>([]);

    // Obtener todos los productos
    const fetchProducts = async () => {
        try{
            const response = await getProducts();
            console.log(response);
            products.value = response.data;
        } catch (error){
            console.error("Error al obtener productos:", error);
        }
    }

    return {
        products,
        fetchProducts
    }
})