<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import TableHeader from "./TableHeader.vue";

const store = useStore();
onMounted(() => store.dispatch("fetchTestStudents"));
const students = computed(() => store.getters.testStudents);

const columns = ref([
  { field: "fullname", header: "ФИО" },
  { field: "gender", header: "Пол" },
  { field: "birthday", header: "Дата рождения" },
  { field: "residentialAddress", header: "Домашний адрес" },
  { field: "reportCardNumber", header: "Табельный номер" },
]);
const selectedStudents = ref();
</script>

<template>
  <DataTable
    v-model:selection="selectedStudents"
    :value="students"
    tableStyle="min-width: 50rem"
    paginator
    :rows="13"
  >
    <template #header>
      <TableHeader />
    </template>
    <Column selectionMode="multiple" />
    <Column
      v-for="column in columns"
      :key="column.id"
      :field="column.field"
      :header="column.header"
    />
  </DataTable>
</template>
