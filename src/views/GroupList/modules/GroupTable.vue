<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useGroupListStore } from "../stores/groupList.js";

onMounted(() => fetchTestStudents());

const store = useGroupListStore();
const { fetchTestStudents, getStudents, openProfile } = store;
const { selectedColumns, loading } = storeToRefs(store);

const students = getStudents;
</script>

<template>
  <DataTable
    :loading="loading"
    v-model:selection="selectedColumns"
    :value="students"
    tableStyle="min-width: 50rem"
    paginator
    :rows="13"
    @row-dblclick="openProfile"
  >
    <Column selectionMode="multiple" />
    <Column field="fullname" header="ФИО" />
    <Column
      v-for="column in selectedColumns"
      :key="column.id"
      :field="column.field"
      :header="column.header"
    />
  </DataTable>
</template>
