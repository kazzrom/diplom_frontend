<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useGroupListStore } from "../stores/groupList.js";
import { useSearchStore } from "@/stores/search.js";
import NoRecordsView from "@/components/NoRecordsView.vue";

const store = useGroupListStore();
const { getStudents, openProfile } = store;
const { selectedColumns, loading, selectedStudents, students } =
  storeToRefs(store);

const search = useSearchStore();
const { filters } = storeToRefs(search);
</script>

<template>
  <DataTable
    scrollable
    v-if="students.length"
    :filters="filters"
    :global-filter-fields="['fullname']"
    :loading="loading"
    v-model:selection="selectedStudents"
    :value="students"
    tableStyle="min-width: 50rem"
    paginator
    :rows="9"
    @row-dblclick="openProfile"
  >
    <Column selectionMode="multiple" />
    <Column field="fullname" header="ФИО" style="min-width: 200px" />
    <Column
      v-for="column in selectedColumns"
      :key="column.id"
      :field="column.field"
      :header="column.header"
      :style="'min-width: ' + column.minWidth + 'px'"
    />
  </DataTable>
  <NoRecordsView v-else message="Нет ни одного студента" />
</template>
