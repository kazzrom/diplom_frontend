<script setup>
import { storeToRefs } from "pinia";
import Toolbar from "primevue/toolbar";
import { useGeneralInformationStore } from "@/views/GeneralInformation/stores/generalInformation.js";
import { useIndividualWorkStore } from "../stores/individualWork";
import { ACTIONS } from "@/constants.js";
import { useSearchStore } from "@/stores/search";
import { exportToIndividualWorkInDOCX } from "../utils/export.js";

const searchStore = useSearchStore();
const { filters } = storeToRefs(searchStore);
const store = useIndividualWorkStore();
const { confirmDeleteIndividualWorks, setEmptyIndividualWork } = store;
const { dialog, selectedIndividualWorks, individualWorks } = storeToRefs(store);

function openAddDialog() {
  setEmptyIndividualWork();
  dialog.value.openDialog(ACTIONS.ADD);
}

const generalInformationStore = useGeneralInformationStore();
const { student } = storeToRefs(generalInformationStore);
</script>

<template>
  <Toolbar>
    <template #start>
      <div class="toolbar_start">
        <IconField iconPosition="left">
          <InputIcon class="pi pi-search" />
          <InputText placeholder="Поиск" v-model="filters['global'].value" />
        </IconField>
        <Button
          label="Экспорт в DOCX"
          @click="exportToIndividualWorkInDOCX(student, individualWorks)"
          severity="info"
          icon="pi pi-file-word"
          iconPos="right"
        />
      </div>
    </template>
    <template #end>
      <div class="toolbar_buttons">
        <Button
          label="Добавить запись"
          @click="openAddDialog"
          icon="pi pi-plus"
          iconPos="right"
        />
        <Button
          label="Удалить выбранные записи"
          @click="confirmDeleteIndividualWorks"
          :disabled="!selectedIndividualWorks.length"
          icon="pi pi-trash"
          iconPos="right"
        />
      </div>
    </template>
  </Toolbar>
</template>

<style scoped>
.toolbar_buttons {
  @apply flex gap-2;
}

.toolbar_start {
  @apply flex flex-row gap-3;
}
</style>
