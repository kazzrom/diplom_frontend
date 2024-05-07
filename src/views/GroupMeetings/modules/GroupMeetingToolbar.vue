<script setup>
import Toolbar from "primevue/toolbar";
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/stores/search";
import { useGroupMeetingsStore } from "../stores/groupMeetings";
import { ACTIONS } from "@/constants";

const searchStore = useSearchStore();
const { filters } = storeToRefs(searchStore);

const groupMeetingsStore = useGroupMeetingsStore();
const { confirmDeleteGroupMeeting } = groupMeetingsStore;
const { dialog, selectedGroupMeetings } = storeToRefs(groupMeetingsStore);

function openAddDialog() {
  groupMeetingsStore.resetGroupMeeting();
  dialog.value.openDialog(ACTIONS.ADD);
}
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
      <div class="toolbar_end">
        <Button
          label="Добавить протокол"
          icon="pi pi-plus"
          iconPos="right"
          @click="openAddDialog"
        />
        <Button
          label="Удалить выбранные протоколы"
          icon="pi pi-trash"
          iconPos="right"
          @click="confirmDeleteGroupMeeting"
          :disabled="!selectedGroupMeetings.length"
        />
      </div>
    </template>
  </Toolbar>
</template>

<style scoped>
.toolbar_end {
  @apply flex flex-row gap-3;
}
</style>
