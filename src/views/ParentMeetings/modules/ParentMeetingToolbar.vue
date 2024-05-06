<script setup>
import { storeToRefs } from "pinia";
import Toolbar from "primevue/toolbar";

import { ACTIONS } from "@/constants";
import { useParentMeetingsStore } from "../stores/parentMeetings.js";
import { useSearchStore } from "@/stores/search";

const store = useParentMeetingsStore();
const { resetParentMeeting, confirmDeleteParentMeeting } = store;
const { dialog, selectedParentMeetings } = storeToRefs(store);

const searchStore = useSearchStore();
const { filters } = storeToRefs(searchStore);

function openAddDialog() {
  resetParentMeeting();
  dialog.value.openDialog(ACTIONS.ADD);
}
</script>

<template>
  <Toolbar>
    <template #start>
      <div class="toolbar_start">
        <IconField iconPosition="left">
          <InputIcon class="pi pi-search" />
          <InputText placeholder="Поиск" v-model="filters['global'].value" />
        </IconField>
      </div>
    </template>
    <template #end>
      <div class="toolbar_start">
        <Button
          label="Добавить протокол"
          icon="pi pi-plus"
          icon-pos="right"
          @click="openAddDialog"
        />
        <Button
          label="Удалить выбранные протоколы"
          @click="confirmDeleteParentMeeting"
          :disabled="!selectedParentMeetings.length"
          icon="pi pi-trash"
          icon-pos="right"
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
