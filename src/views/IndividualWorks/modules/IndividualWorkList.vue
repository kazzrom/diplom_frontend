<script setup>
import { storeToRefs } from "pinia";
import { useIndividualWorkStore } from "../stores/individualWork.js";

const store = useIndividualWorkStore();
const { individualWorks, columns } = storeToRefs(store);
</script>

<template>
  <DataTable
    :value="individualWorks"
    :paginator="individualWorks.length > 10"
    :rows="10"
  >
    <Column
      v-for="(column, index) in columns"
      :key="index"
      :field="column.field"
      :header="column.header"
    />
  </DataTable>
</template>

<style scoped></style>
