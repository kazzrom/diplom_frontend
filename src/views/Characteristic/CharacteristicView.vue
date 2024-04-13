<script setup>
import CharacteristicSidebar from "./modules/CharacteristicSidebar.vue";
</script>

<template>
  <CharacteristicSidebar />
  <RouterView class="mx-10 grow" />
</template>

<style scoped>
.wrapper {
  @apply flex flex-row justify-start pt-5;
}
</style>
