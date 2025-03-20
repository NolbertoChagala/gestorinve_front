<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <!--Componente de notificaciones-->
  <Toast />
  
  <div class="bg-[#EFEFEF] min-h-screen m-0 p-0">
    <RouterView />
  </div>
</template>

<script setup>
import Toast from "primevue/toast";
</script>
