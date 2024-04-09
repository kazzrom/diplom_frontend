<script setup>
import CharacteristicSidebar from "../modules/CharacteristicSidebar.vue";
</script>

<template>
  <div class="wrapper">
    <CharacteristicSidebar />
    <RouterView class="mx-10 grow" />
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-row justify-start pt-5;
}
</style>
