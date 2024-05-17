<script setup>
import { storeToRefs } from "pinia";
import Toolbar from "primevue/toolbar";

import { ACTIONS } from "@/constants";
import { useGroupListStore } from "../stores/groupList.js";
import { useStudentFormStore } from "../stores/studentForm.js";
import { useSearchStore } from "@/stores/search.js";
import { exportXLSX } from "@/utils/export.js";

const groupListStore = useGroupListStore();
const { onToggle, getStudentColumns, confirmDeleteStudents } = groupListStore;
const { selectedColumns, selectedStudents, studentColumns, studentList } =
  storeToRefs(groupListStore);

const studentFormStore = useStudentFormStore();
const { dialog } = storeToRefs(studentFormStore);

const search = useSearchStore();
const { filters } = storeToRefs(search);

function exportInExcel() {
  exportXLSX(
    studentList.value.value,
    selectedColumns.value,
    "Список студентов",
    true
  );
}
</script>

<template>
  <Toolbar class="px-10">
    <template #start>
      <div class="toolbar_part">
        <IconField iconPosition="left">
          <InputIcon class="pi pi-search" />
          <InputText placeholder="Поиск" v-model="filters['global'].value" />
        </IconField>
        <MultiSelect
          :model-value="selectedColumns"
          :options="studentColumns"
          optionLabel="header"
          @update:model-value="onToggle"
          :max-selected-labels="3"
          placeholder="Выберите столбцы"
        />
        <Button
          @click="exportInExcel"
          label="Экспорт в Excel"
          icon="pi pi-file-excel"
          severity="success"
          iconPos="right"
        />
      </div>
    </template>
    <template #end>
      <div class="toolbar_part">
        <Button
          label="Добавить студента"
          icon="pi pi-user-plus"
          iconPos="right"
          @click="dialog.openDialog(ACTIONS.ADD)"
        />
        <Button
          :disabled="!selectedStudents.length"
          label="Удалить студентов"
          icon="pi pi-user-minus"
          iconPos="right"
          @click="confirmDeleteStudents()"
        />
      </div>
    </template>
  </Toolbar>
</template>

<style scoped>
.toolbar_part {
  @apply flex justify-between items-center gap-5;
}
</style>
