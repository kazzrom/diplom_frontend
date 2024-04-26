<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useGroupMeetingsStore } from "../stores/groupMeetings.js";
import Calendar from "primevue/calendar";
import Editor from "primevue/editor";
import DefaultDialog from "@/components/Toolbar/DefaultDialog.vue";
import { ACTIONS } from "@/constants";

const groupMeetingsStore = useGroupMeetingsStore();
const {
  v$,
  confirmAddGroupMeeting,
  confirmEditGroupMeeting,
  fetchGroupMeetings,
} = groupMeetingsStore;
const { dialog, groupMeeting, isSubmit } = storeToRefs(groupMeetingsStore);
</script>

<template>
  <DefaultDialog
    :dialog="dialog"
    :addItem="confirmAddGroupMeeting"
    :editItem="confirmEditGroupMeeting"
    :cancelDialog="fetchGroupMeetings"
  >
    <div class="form_wrapper">
      <div class="form_left_part">
        <div class="form_item">
          <label for="date">Дата</label>
          <Calendar
            id="date"
            v-model="groupMeeting.meetingDate"
            :invalid="v$.meetingDate.$invalid && isSubmit"
            :readonly="dialog.action === ACTIONS.VIEW"
          />
        </div>
        <div class="form_item">
          <label for="theme">Тема</label>
          <InputText
            id="theme"
            v-model="groupMeeting.theme"
            :invalid="v$.theme.$invalid && isSubmit"
            :readonly="dialog.action === ACTIONS.VIEW"
          />
        </div>
        <div class="form_item">
          <label for="presence">Присутствовало</label>
          <InputNumber
            id="presence"
            v-model="groupMeeting.presence"
            :invalid="v$.presence.$invalid && isSubmit"
            :readonly="dialog.action === ACTIONS.VIEW"
          />
        </div>
      </div>
      <div class="form_editor">
        <label for="content">Повестка</label>
        <Editor
          editorStyle="height: 300px"
          id="content"
          v-model="groupMeeting.meetingContent"
          :readonly="dialog.action === ACTIONS.VIEW"
        />
      </div>
    </div>
  </DefaultDialog>
</template>

<style scoped>
.form_wrapper {
  @apply flex flex-row gap-5;
}

.form_left_part {
  @apply flex flex-col gap-5;
}

.form_item {
  @apply flex flex-col gap-2;
}

.form_item label {
  @apply font-bold;
}

.form_editor {
  @apply form_item;
}
</style>
