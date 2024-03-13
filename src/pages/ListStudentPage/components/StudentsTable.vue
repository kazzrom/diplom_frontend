<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import TableHeader from "./TableHeader.vue";

const store = useStore();

const students = computed(() => store.getters.testStudents);

const columns = ref([
  { field: "fullName", header: "ФИО" },
  { field: "reportCardNumber", header: "Табельный номер" },
]);
</script>

<template>
  <DataTable :value="students" tableStyle="min-width: 50rem">
    <template #header>
      <TableHeader />
    </template>
    <Column field="id" header="ID" />
    <Column
      v-for="column in columns"
      :key="column.id"
      :field="column.field"
      :header="column.header"
    />
  </DataTable>
</template>
