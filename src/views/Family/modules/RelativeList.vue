<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import ScrollPanel from "primevue/scrollpanel";
import NoRecordsView from "@/components/NoRecordsView.vue";

import { useFamilySectionStore } from "../stores/family.js";
import RelativeCard from "./RelativeCard.vue";

const route = useRoute();
onMounted(() => fetchRelatives(route.params.id));

const store = useFamilySectionStore();
const { fetchRelatives } = store;
const { relatives } = storeToRefs(store);
</script>

<template>
  <div class="relative-cards" v-if="relatives.length">
    <RelativeCard
      v-for="(relative, index) in relatives"
      :key="index"
      :relative="relative"
    />
  </div>
  <NoRecordsView message="Пока не добавлено никаких родственников" v-else />
</template>

<style scoped>
.relative-cards {
  @apply flex flex-col gap-3 m-3;
}
</style>
