<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useGroupListStore } from "../stores/groupList.js";
import { useSearchStore } from "@/stores/search.js";

onMounted(() => fetchTestStudents());

const store = useGroupListStore();
const { fetchTestStudents, getStudents, openProfile } = store;
const { selectedColumns, loading, selectedStudents } = storeToRefs(store);
const students = getStudents;

const search = useSearchStore();
const { filters } = storeToRefs(search);
</script>

<template>
  <DataTable
    :filters="filters"
    :global-filter-fields="['fullname']"
    :loading="loading"
    v-model:selection="selectedStudents"
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
