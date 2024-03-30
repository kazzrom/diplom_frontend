<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import TableHeader from "./TableHeader.vue";

const store = useStore();

onMounted(() => store.dispatch("fetchTestStudents"));

const students = computed(() => store.getters.testStudents);
const studentColumns = computed(() => store.getters.studentColumns);

const columns = ref(studentColumns);
// const selectedColumns = ref(columns.value);

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
