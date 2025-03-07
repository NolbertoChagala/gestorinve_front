<template>
  <div class="about">
    <transition name="fade">
      <h1 v-if="showTitle">{{ title }}</h1>
    </transition>
    <p>{{ description }}</p>
    <button @click="toggleTitle">Toggle Title</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const title = ref("This is an about page");
const description = ref("Learn more about us and what we do.");
const showTitle = ref(true);

const toggleTitle = () => {
  showTitle.value = !showTitle.value;
};
</script>

<style scoped>
.about {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #f4f4f4;
  padding: 20px;
}

h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 10px;
}

p {
  font-size: 1.2rem;
  color: #555;
}

button {
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
}

button:hover {
  background-color: #36976c;
}

/* Animación */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

