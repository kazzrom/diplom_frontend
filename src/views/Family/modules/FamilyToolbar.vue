<script setup>
import { storeToRefs } from "pinia";
import Toolbar from "primevue/toolbar";

import { ACTIONS } from "@/constants";
import { useGeneralInformationStore } from "@/views/GeneralInformation/stores/generalInformation.js";
import { useFamilySectionStore } from "../stores/family.js";
import { exportToFamilyInDOCX } from "../utils/export.js";

const store = useGeneralInformationStore();
const { student } = storeToRefs(store);

const familyStore = useFamilySectionStore();
const { clearForm } = familyStore;
const { dialog, familyMembers } = storeToRefs(familyStore);

function openAddDialog() {
  clearForm();
  dialog.value.openDialog(ACTIONS.ADD);
}
</script>

<template>
  <Toolbar class="px-5">
    <template #start>
      <div class="toolbar_start">
        <Button
          label="Добавить члена семьи"
          icon="pi pi-plus"
          icon-pos="right"
          @click="openAddDialog"
        />
        <Button
          label="Экспорт в DOCX"
          severity="info"
          icon="pi pi-file-word"
          icon-pos="right"
          @click="exportToFamilyInDOCX(student, familyMembers)"
        />
      </div>
    </template>
  </Toolbar>
</template>

<style scoped>
.toolbar_start {
  @apply flex flex-row gap-3;
}
</style>
