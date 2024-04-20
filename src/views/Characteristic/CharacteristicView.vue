<script setup>
import CharacteristicSidebar from "./modules/CharacteristicSidebar.vue";
</script>

<template>
  <div class="wrapper">
    <CharacteristicSidebar />
    <RouterView class="mx-10 pt-5" />
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-row grow justify-start;
}
</style>
