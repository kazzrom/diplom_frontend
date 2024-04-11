<script setup>
import { storeToRefs } from "pinia";
import Calendar from "primevue/calendar";
import { useIndividualWorkStore } from "@/stores/individualWork.js";

const store = useIndividualWorkStore();
const { addIndividualWork } = store;
const { individualWorks, columns, individualWork } = storeToRefs(store);
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
  <div class="form">
    <Calendar
      v-model="individualWork.workDate"
      dateFormat="dd.mm.yy"
      showIcon
      iconDisplay="input"
      showButtonBar
    />
    <InputText v-model="individualWork.participant" />
    <InputText v-model="individualWork.questions" />
    <Button @click="addIndividualWork" label="Добавить" />
  </div>
</template>

<style scoped>
.form {
  @apply flex flex-row items-center gap-3
  p-3 bg-white border;
}
</style>
