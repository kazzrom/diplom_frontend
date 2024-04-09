<script setup>
import { useSocialPassportStore } from "../stores/socialPassport.js";
import { storeToRefs } from "pinia";

const store = useSocialPassportStore();
const { loading } = storeToRefs(store);

const props = defineProps(["items", "columns"]);
</script>

<template>
  <DataTable :loading="loading" ref="dataStudentsTable" :value="items">
    <Column field="id" header="№" />
    <Column
      v-for="column in columns"
      :key="column.field"
      :field="column.field"
      :header="column.header"
    />
  </DataTable>
</template>
