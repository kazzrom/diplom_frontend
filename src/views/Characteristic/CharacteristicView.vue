<script setup>
import CharacteristicSidebar from "./modules/CharacteristicSidebar.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCharacteristicStore } from "./stores/characteristic";

const route = useRoute();
const store = useCharacteristicStore();
const { fetchCharacteristicByStudentId } = store;

onMounted(async () => {
  await fetchCharacteristicByStudentId(route.params.id);
});
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
