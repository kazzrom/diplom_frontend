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

async function cancelDialog() {
  dialog.value.closeDialog();
  await fetchGroupMeetings();
}
</script>

<template>
  <Dialog
    class="p-5"
    modal
    v-model:visible="dialog.isShowDialog"
    :header="dialog.currentHeader"
    :closable="dialog.action === ACTIONS.VIEW"
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
            name="theme"
            autocomplete="off"
            v-model="groupMeeting.theme"
            :invalid="v$.theme.$invalid && isSubmit"
            :readonly="dialog.action === ACTIONS.VIEW"
          />
        </div>
        <div class="form_item">
          <label for="presence">Присутствовало</label>
          <InputNumber
            id="numberPeoplePresent"
            name="numberPeoplePresent"
            autocomplete="off"
            v-model="groupMeeting.numberPeoplePresent"
            :invalid="v$.numberPeoplePresent.$invalid && isSubmit"
            :readonly="dialog.action === ACTIONS.VIEW"
          />
        </div>
      </div>
      <div class="form_editor">
        <label for="content">Повестка</label>
        <Editor
          editorStyle="height: 300px"
          id="content"
          v-model="groupMeeting.content"
          :readonly="dialog.action === ACTIONS.VIEW"
        />
      </div>
    </div>
    <div class="buttons">
      <Button
        v-show="dialog.action === ACTIONS.ADD"
        label="Добавить"
        @click="confirmAddGroupMeeting"
      />
      <Button
        v-show="dialog.action === ACTIONS.EDIT"
        label="Сохранить"
        @click="confirmEditGroupMeeting"
      />
      <Button
        v-show="dialog.action !== ACTIONS.VIEW"
        label="Отмена"
        severity="secondary"
        @click="cancelDialog"
      />
    </div>
  </Dialog>
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

.buttons {
  @apply flex justify-end mt-10 gap-3;
}
</style>
