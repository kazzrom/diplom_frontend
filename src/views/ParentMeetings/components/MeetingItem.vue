<script setup>
import { storeToRefs } from "pinia";

import { ACTIONS } from "@/constants";
import { useParentMeetingsStore } from "../stores/parentMeetings.js";

const props = defineProps(["meeting"]);

const store = useParentMeetingsStore();
const { deleteParentMeeting } = store;
const { dialog } = storeToRefs(store);
</script>

<template>
  <div class="wrapper_item">
    <div class="item_info">
      <h4>{{ meeting.title }}</h4>
      <h4>Тема: {{ meeting.theme }}</h4>
      <p>
        <span class="mr-3">Группа {{ meeting.group }}</span>
        <span>Дата: {{ meeting.date }}</span>
      </p>
    </div>
    <div class="item_buttons">
      <Button
        @click="dialog.openDialog(ACTIONS.VIEW)"
        icon="pi pi-eye"
        text
        rounded
      />
      <Button
        @click="dialog.openDialog(ACTIONS.EDIT)"
        icon="pi pi-pencil"
        text
        rounded
      />
      <Button
        @click="deleteParentMeeting(meeting.id)"
        icon="pi pi-trash"
        text
        rounded
      />
    </div>
  </div>
</template>

<style scoped>
.wrapper_item {
  @apply flex flex-row justify-between items-center
  px-10 py-7 border border-solid 
  hover:bg-slate-100;
}
.item_buttons {
  @apply flex flex-row gap-3;
}

.item_info {
  @apply flex flex-col gap-2;
}
</style>
