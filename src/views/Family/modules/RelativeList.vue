<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import ScrollPanel from "primevue/scrollpanel";

import { useFamilySectionStore } from "../stores/family.js";
import RelativeCard from "./RelativeCard.vue";

const route = useRoute();
onMounted(() => fetchRelatives(route.params.id));

const store = useFamilySectionStore();
const { fetchRelatives } = store;
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
