<script setup>
import { ref } from "vue";

const columns = [
  { field: "workDate", header: "Дата" },
  { field: "participant", header: "С кем проведена беседа" },
  { field: "questions", header: "Какие вопросы обсуждались" },
];
const individualWorks = ref([
  {
    workDate: "11.02.2022",
    participant: "Березина Мария Данииловна",
    questions: "Успеваемость обучающего на первый семестр",
  },
]);
</script>

<template>
  <DataTable :value="individualWorks">
    <Column
      v-for="(column, index) in columns"
      :key="index"
      :field="column.field"
      :header="column.header"
    />
  </DataTable>
</template>
