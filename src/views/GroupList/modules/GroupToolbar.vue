<script setup>
import { storeToRefs } from "pinia";
import Toolbar from "primevue/toolbar";

import { ACTIONS } from "@/constants";
import { useGroupListStore } from "../stores/groupList.js";

const store = useGroupListStore();
const { onToggle, getStudentColumns } = store;
const { selectedColumns, dialog } = storeToRefs(store);

const studentColumns = getStudentColumns;
</script>

<template>
  <Toolbar class="px-10">
    <template #start>
      <div class="toolbar_part">
        <IconField iconPosition="left">
          <InputIcon class="pi pi-search" />
          <InputText placeholder="Поиск" />
        </IconField>
        <MultiSelect
          :model-value="selectedColumns"
          :options="studentColumns"
          optionLabel="header"
          @update:model-value="onToggle"
          :max-selected-labels="3"
          placeholder="Выберите столбцы"
        />
      </div>
    </template>
    <template #end>
      <div class="toolbar_part">
        <Button
          label="Добавить обучающегося"
          icon="pi pi-user-plus"
          iconPos="right"
          @click="dialog.openDialog(ACTIONS.ADD)"
        />
        <Button
          label="Удалить обучающегося"
          icon="pi pi-user-minus"
          iconPos="right"
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
