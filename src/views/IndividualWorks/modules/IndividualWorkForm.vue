<script setup>
import Calendar from "primevue/calendar";
import { storeToRefs } from "pinia";
import { useIndividualWorkStore } from "../stores/individualWork.js";

const store = useIndividualWorkStore();
const { addIndividualWork } = store;
const { individualWork } = storeToRefs(store);
</script>

<template>
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
