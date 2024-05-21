<script setup>
import { storeToRefs } from "pinia";
import Dialog from "primevue/dialog";
import Editor from "primevue/editor";
import Listbox from "primevue/listbox";

import { ACTIONS } from "@/constants";
import { useParentMeetingsStore } from "../stores/parentMeetings.js";
import MultiSelect from "primevue/multiselect";
import { onMounted } from "vue";

onMounted(async () => await fetchParents());

const store = useParentMeetingsStore();
const {
  addParentMetting,
  confirmEditParentMeeting,
  v$,
  fetchParentMeetings,
  fetchParents,
} = store;
const { parentMeeting, dialog, isSubmit, parents } = storeToRefs(store);

async function cancelForm() {
  await fetchParentMeetings();
  isSubmit.value = false;
  dialog.value.closeDialog();
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
      <div class="form_items">
        <div class="form_left_part">
          <div class="form_item">
            <label for="date">Дата</label>
            <Calendar
              id="date"
              name="date"
              show-button-bar
              show-icon
              icon-display="input"
              v-model="parentMeeting.meetingDate"
              dateFormat="dd.mm.yy"
              :readonly="dialog.action === ACTIONS.VIEW"
              :invalid="v$.meetingDate.$invalid && isSubmit"
            />
          </div>
          <div class="form_item">
            <label for="theme">Тема</label>
            <InputText
              id="theme"
              name="theme"
              autocomplete="off"
              v-model="parentMeeting.theme"
              :readonly="dialog.action === ACTIONS.VIEW"
              :invalid="v$.theme.$invalid && isSubmit"
            />
          </div>
          <div class="items">
            <div class="form_item" v-if="dialog.action !== ACTIONS.VIEW">
              <label for="present">Присутствовали</label>
              <MultiSelect
                id="present"
                v-model="parentMeeting.FamilyMembers"
                :options="parents"
                option-label="fullname"
                :max-selected-labels="0"
                filter
              />
            </div>
            <div class="form_item" listStyle="max-height: 50px" v-else>
              <label for="present">Присутствовали</label>
              <Listbox
                id="present"
                :options="parentMeeting.FamilyMembers"
                option-label="fullname"
              />
            </div>
          </div>
        </div>
        <div class="form_item">
          <label for="content">Повестка</label>
          <Editor
            id="content"
            editorStyle="height: 300px;"
            v-model="parentMeeting.content"
            :readonly="dialog.action === ACTIONS.VIEW"
          />
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
          @click="confirmEditParentMeeting"
          label="Сохранить"
          icon="pi pi-save"
          iconPos="right"
        />
        <Button
          v-show="dialog.action !== ACTIONS.VIEW"
          @click="cancelForm"
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
