<script setup>
import Calendar from "primevue/calendar";
import Textarea from "primevue/textarea";
import { storeToRefs } from "pinia";
import { useIndividualWorkStore } from "../stores/individualWork.js";
import { ACTIONS } from "@/constants";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useIndividualWorkStore();
const {
  addIndividualWork,
  v$,
  confirmEditIndividualWork,
  fetchIndividualWorks,
} = store;

const { individualWork, isSubmit, dialog } = storeToRefs(store);

async function cancelForm() {
  await fetchIndividualWorks(route.params.id);
  dialog.value.closeDialog();
}
</script>

<template>
  <Dialog
    class="p-4"
    modal
    v-model:visible="dialog.isShowDialog"
    :header="dialog.currentHeader"
    :closable="dialog.action === ACTIONS.VIEW"
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
          v-if="dialog.action === ACTIONS.ADD"
          type="submit"
          label="Добавить"
          icon="pi pi-plus"
          iconPos="right"
        />
        <Button
          v-else-if="dialog.action === ACTIONS.EDIT"
          label="Сохранить"
          icon="pi pi-save"
          iconPos="right"
          @click="confirmEditIndividualWork()"
        />
        <Button
          label="Отмена"
          icon="pi pi-times"
          iconPos="right"
          severity="secondary"
          v-show="dialog.action !== ACTIONS.VIEW"
          @click="cancelForm"
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
