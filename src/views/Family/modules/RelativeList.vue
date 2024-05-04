<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import NoRecordsView from "@/components/NoRecordsView.vue";

import { useFamilySectionStore } from "../stores/family.js";
import RelativeCard from "./RelativeCard.vue";

const route = useRoute();
onMounted(() => fetchRelatives(route.params.id));

const store = useFamilySectionStore();
const { fetchRelatives } = store;
const { familyMembers } = storeToRefs(store);
</script>

<template>
  <div class="family-member-cards" v-if="familyMembers.length">
    <RelativeCard
      v-for="(familyMember, index) in familyMembers"
      :key="index"
      :family-member="familyMember"
    />
  </div>
  <NoRecordsView message="Пока не добавлено никаких родственников" v-else />
</template>

<style scoped>
.family-member-cards {
  @apply flex flex-col gap-3 m-3;
}
</style>
