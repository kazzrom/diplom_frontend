<!-- <script setup>
import Button from "primevue/button";
import { useHomeStore } from "../stores/Home.js";
import { useAuthProvider } from "../stores/AuthContext";
import { storeToRefs } from "pinia";

const { handleFetchProtected } = useAuthProvider();
const { data } = storeToRefs(useHomeStore());
</script>

<template>
  <main class="flex justify-center">
    <div class="container">
      <h1 class="text-3xl font-bold">Hello world</h1>
      <p v-if="data">{{ data }}</p>
      <Button label="Клик, клик" @click="handleFetchProtected" />
    </div>
  </main>
</template>

<style scoped>
.container {
  @apply flex flex-col items-center gap-3 w-1/5;
}
</style> -->
