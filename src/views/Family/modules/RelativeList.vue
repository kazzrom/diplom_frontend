<script setup>
import { storeToRefs } from "pinia";
import ScrollPanel from "primevue/scrollpanel";

import { useFamilySectionStore } from "../stores/family.js";
import RelativeCard from "./RelativeCard.vue";

const store = useFamilySectionStore();
const { relatives } = storeToRefs(store);
</script>

<template>
  <ScrollPanel>
    <div class="relative-cards">
      <RelativeCard
        v-for="(relative, index) in relatives"
        :key="index"
        :relative="relative"
      />
    </div>
  </ScrollPanel>
</template>

<style scoped>
.relative-cards {
  @apply flex flex-col;
}
</style>
