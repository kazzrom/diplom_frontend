<script setup>
import { storeToRefs } from "pinia";
import Toolbar from "primevue/toolbar";

import { ACTIONS } from "@/constants";
import { useFamilySectionStore } from "../stores/family.js";

const store = useFamilySectionStore();
const { clearForm } = store;
const { dialog } = storeToRefs(store);

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
      </div>
    </template>
  </Toolbar>
</template>

<style scoped>
.toolbar_start {
  @apply flex flex-row;
}
</style>
