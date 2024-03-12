<script setup>
import { useStore } from "vuex";

const store = useStore();

const students = computed(() => store.getters.getTestStudents);

const columns = ref([
  { field: "fullName", header: "ФИО" },
  { field: "reportCardNumber", header: "Номер телефона" },
]);
</script>

<template>
  <DataTable :value="students" tableStyle="min-width: 50rem">
    <Column field="id" header="ID" />
    <Column
      v-for="column in columns"
      :key="column.id"
      :field="column.field"
      :header="column.header"
    />
  </DataTable>
</template>
