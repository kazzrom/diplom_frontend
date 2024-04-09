<script setup>
import { storeToRefs } from "pinia";
import Toolbar from "primevue/toolbar";

import { ACTIONS } from "@/constants";
import { useParentMeetingsStore } from "../stores/parentMeetings.js";

const store = useParentMeetingsStore();
const { dialog } = storeToRefs(store);
</script>

<template>
  <Toolbar>
    <template #start>
      <div class="toolbar_start">
        <IconField iconPosition="left">
          <InputIcon class="pi pi-search" />
          <InputText placeholder="Поиск" />
        </IconField>
        <Button
          label="Добавить"
          icon="pi pi-plus"
          icon-pos="right"
          @click="dialog.openDialog(ACTIONS.ADD)"
        />
      </div>
    </template>
  </Toolbar>
</template>

<style scoped>
.toolbar_start {
  @apply flex flex-row gap-5;
}
</style>
