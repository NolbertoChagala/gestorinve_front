<template>
    <ConfirmDialog></ConfirmDialog>
</template>

<script setup>
import { useConfirm } from "primevue/useconfirm";
import { defineEmits } from "vue";

const confirm = useConfirm();
const emit = defineEmits(["confirmDelete", "cancelDelete"]);

const show = (id) => {
    confirm.require({
        message: "¿Estás seguro de que deseas eliminar este registro?",
        header: "Confirmación",
        icon: "pi pi-info-circle",
        rejectLabel: "Cancelar",
        acceptLabel: "Eliminar",
        rejectClass: "p-button-secondary",
        acceptClass: "p-button-danger",
        accept: () => {
            emit("confirmDelete", id);
        },
        reject: () => {
            emit("cancelDelete");
        }
    });
};

defineExpose({ show });
</script>
