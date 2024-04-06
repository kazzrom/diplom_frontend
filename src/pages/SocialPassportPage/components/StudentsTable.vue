<script setup>
import { computed, onMounted } from "vue";
import { useSocialPassportStore } from "@/stores/socialPassport.js";

const store = useSocialPassportStore();
onMounted(() => store.fetchOrphans());
const orphans = store.getStudents;
const columns = store.getOrphansColumns;
</script>

<template>
  <DataTable :value="orphans">
    <Column field="id" header="№" />
    <Column
      v-for="column in columns"
      :key="column.field"
      :field="column.field"
      :header="column.header"
    />
  </DataTable>
</template>
