<script setup>
import Sidebar from "../modules/Sidebar.vue";
</script>

<template>
  <div class="wrapper">
    <Sidebar />
    <RouterView class="m-10 grow" />
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-row justify-start
}
</style>