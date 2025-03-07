<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold underline text-blue-600 transition-all duration-300" :class="{ 'text-red-600': isClicked }">
      {{ message }}
    </h1>
    <button 
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
      @click="toggleMessage">
      Click Me
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const message = ref("Hello world!");
const isClicked = ref(false);

const toggleMessage = () => {
  isClicked.value = !isClicked.value;
  message.value = isClicked.value ? "You clicked me!" : "Hello world!";
};
</script>

<style scoped>
</style>

