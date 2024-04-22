<script setup>
import { storeToRefs } from "pinia";
import Toolbar from "primevue/toolbar";
import { useIndividualWorkStore } from "../stores/individualWork";
import { ACTIONS } from "@/constants.js";
import { useSearchStore } from "@/stores/search";

const searchStore = useSearchStore();
const { filters } = storeToRefs(searchStore);
const store = useIndividualWorkStore();
const { confirmDeleteIndividualWorks } = store;
const { dialog, selectedIndividualWorks } = storeToRefs(store);
</script>

<template>
  <Toolbar>
    <template #start>
      <IconField iconPosition="left">
        <InputIcon class="pi pi-search" />
        <InputText placeholder="Поиск" v-model="filters['global'].value" />
      </IconField>
    </template>
    <template #end>
      <div class="toolbar_buttons">
        <Button
          label="Добавить запись"
          @click="dialog.openDialog(ACTIONS.ADD)"
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
</style>
