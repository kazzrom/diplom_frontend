<script setup>
import { storeToRefs } from "pinia";
import Dialog from "primevue/dialog";
import Editor from "primevue/editor";

import { ACTIONS } from "@/constants";
import { useParentMeetingsStore } from "../stores/parentMeetings.js";

const store = useParentMeetingsStore();
const { addParentMetting, editParentMetting } = store;
const { parentMeeting, dialog } = storeToRefs(store);
</script>

<template>
  <Dialog
    class="p-5"
    modal
    v-model:visible="dialog.isShowDialog"
    :header="dialog.currentHeader"
  >
    <div class="form_wrapper">
      <div class="form_items">
        <div class="form_left_part">
          <div class="form_item">
            <label for="date">Дата</label>
            <Calendar id="date" v-model="parentMeeting.date" />
          </div>
          <div class="form_item">
            <label for="theme">Тема</label>
            <InputText id="theme" v-model="parentMeeting.theme" />
          </div>
          <div class="form_item">
            <label for="present">Присутствовали</label>
            <InputText id="present" />
          </div>
          <div class="form_item">
            <label for="absent">Отсутствовали</label>
            <InputText id="absent" />
          </div>
        </div>
        <div class="form_item">
          <label for="content">Повестка</label>
          <Editor id="content" editorStyle="height: 300px;" />
        </div>
      </div>
      <div class="form_buttons">
        <Button
          v-show="dialog.action === ACTIONS.ADD"
          @click="addParentMetting"
          label="Добавить"
          icon="pi pi-plus"
          iconPos="right"
        />
        <Button
          v-show="dialog.action === ACTIONS.EDIT"
          @click="editParentMetting"
          label="Сохранить"
          icon="pi pi-save"
          iconPos="right"
        />
        <Button
          v-show="dialog.action !== ACTIONS.VIEW"
          @click="dialog.closeDialog()"
          label="Отмена"
          severity="secondary"
        />
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.form_wrapper {
  @apply flex flex-col gap-7
  bg-white;
}

.form_items {
  @apply flex flex-row gap-10;
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

.form_buttons {
  @apply flex flex-row justify-end gap-5;
}
</style>
