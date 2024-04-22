<script setup>
import Calendar from "primevue/calendar";
import Textarea from "primevue/textarea";
import { storeToRefs } from "pinia";
import { useIndividualWorkStore } from "../stores/individualWork.js";
import { ACTIONS } from "@/constants";

const store = useIndividualWorkStore();
const { addIndividualWork, v$, confirmEditIndividualWork } = store;
const { individualWork, isSubmit, selectedIndividualWorks, dialog } =
  storeToRefs(store);
</script>

<template>
  <Dialog
    class="p-4"
    modal
    v-model:visible="dialog.isShowDialog"
    :header="dialog.currentHeader"
  >
    <form @submit.prevent="addIndividualWork" class="form">
      <div class="form_item">
        <label for="workDate">Дата</label>
        <Calendar
          id="workDate"
          v-model="individualWork.workDate"
          :invalid="v$.workDate.$invalid && isSubmit"
          dateFormat="dd.mm.yy"
          showIcon
          iconDisplay="input"
          showButtonBar
          :readonly="dialog.action === ACTIONS.VIEW"
        />
      </div>
      <div class="form_item">
        <label for="participant">С кем проведена беседа</label>
        <InputText
          id="participant"
          v-model="individualWork.participant"
          :invalid="v$.participant.$invalid && isSubmit"
          :readonly="dialog.action === ACTIONS.VIEW"
        />
      </div>
      <div class="form_item">
        <label for="workContent">Какие вопросы обсуждались</label>
        <Textarea
          id="workContent"
          v-model="individualWork.workContent"
          :invalid="v$.workContent.$invalid && isSubmit"
          :readonly="dialog.action === ACTIONS.VIEW"
        />
      </div>
      <div class="form_buttons">
        <Button
          type="submit"
          label="Добавить"
          icon="pi pi-plus"
          iconPos="right"
          v-if="dialog.action === ACTIONS.ADD"
        />
        <Button
          label="Сохранить"
          icon="pi pi-save"
          iconPos="right"
          v-else-if="dialog.action === ACTIONS.EDIT"
          @click="confirmEditIndividualWork()"
        />
        <Button
          label="Отмена"
          icon="pi pi-times"
          iconPos="right"
          severity="secondary"
          v-show="dialog.action !== ACTIONS.VIEW"
          @click="dialog.closeDialog()"
        />
      </div>
    </form>
  </Dialog>
</template>

<style scoped>
.form {
  @apply flex flex-col gap-3
  p-3;
}

.form_buttons {
  @apply flex flex-row justify-end gap-3 mt-5;
}

.form_item {
  @apply flex flex-col gap-1;
}
</style>
