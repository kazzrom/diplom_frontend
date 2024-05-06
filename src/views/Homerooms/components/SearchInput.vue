<script setup>
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/stores/search.js";

const searchStore = useSearchStore();
const { filters } = storeToRefs(searchStore);
</script>

<template>
  <IconField iconPosition="left">
    <InputIcon class="pi pi-search" />
    <InputText placeholder="Поиск" v-model="filters['global'].value" />
  </IconField>
</template>
