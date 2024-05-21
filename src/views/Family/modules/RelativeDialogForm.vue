<script setup>
import { storeToRefs } from "pinia";
import Dropdown from "primevue/dropdown";

import { ACTIONS } from "@/constants";
import { useFamilySectionStore } from "../stores/family.js";
import { KINSHIPS } from "../constants/constants";

const store = useFamilySectionStore();
const { addRelative, confirmEditRelative, fetchRelative, v$ } = store;
const { familyMember, relations, dialog, isSubmit } = storeToRefs(store);

async function cancelForm() {
  await fetchRelative(familyMember.value.id);
  dialog.value.closeDialog();
}
</script>

<template>
  <Dialog
    v-model:visible="dialog.isShowDialog"
    :header="dialog.currentHeader"
    modal
    :closable="dialog.action === ACTIONS.VIEW"
  >
    <div class="form_wrapper">
      <div class="form_items">
        <div class="form_item">
          <label for="surname">Фамилия</label>
          <InputText
            id="surname"
            name="surname"
            autocomplete="all-off"
            v-model="familyMember.surname"
            :invalid="v$.surname.$invalid && isSubmit"
          />
        </div>
        <div class="form_item">
          <label for="name">Имя</label>
          <InputText
            id="name" 
            name="name"
            autocomplete="all-off"
            v-model="familyMember.name"
            :invalid="v$.name.$invalid && isSubmit"
          />
        </div>
        <div class="form_item">
          <label for="patronymic">Отчество</label>
          <InputText
            id="patronymic"
            name="patronymic"
            autocomplete="all-off"
            v-model="familyMember.patronymic"
            :invalid="v$.patronymic.$invalid && isSubmit"
          />
        </div>
        <div class="form_item">
          <label for="relation">Родство</label>
          <Dropdown
            id="relation"
            name="relation"
            autocomplete="all-off"
            v-model="familyMember.relation"
            :options="relations"
            :invalid="v$.relation.$invalid && isSubmit"
          />
        </div>
        <div class="form_item">
          <label for="phoneNumber">Номер телефона</label>
          <InputMask
            id="phoneNumber"
            name="phoneNumber"
            autocomplete="all-off"
            mask="+7 999 999-99-99"
            v-model="familyMember.MemberPersonalDatum.phoneNumber"
            :invalid="v$.MemberPersonalDatum.phoneNumber.$invalid && isSubmit"
          />
        </div>
        <div class="form_item">
          <label for="residentialAddress">Адрес</label>
          <InputText
            id="residentialAddress"
            name="residentialAddress"
            autocomplete="all-off"
            v-model="familyMember.MemberPersonalDatum.residentialAddress"
          />
        </div>
        <div class="form_item">
          <label for="phoneNumber">Место работы</label>
          <InputText
            id="phoneNumber"
            name="phoneNumber"
            autocomplete="all-off"
            v-model.trim="familyMember.MemberPersonalDatum.workplace"
          />
        </div>
        <div class="form_item">
          <label for="post">Должность</label>
          <InputText
            id="post"
            name="post"
            autocomplete="all-off"
            v-model.trim="familyMember.MemberPersonalDatum.post"
          />
        </div>
      </div>
      <div class="form_buttons">
        <Button
          v-show="dialog.action === ACTIONS.ADD"
          @click="addRelative"
          label="Добавить"
          icon="pi pi-plus"
          iconPos="right"
        />
        <Button
          v-show="dialog.action === ACTIONS.EDIT"
          @click="confirmEditRelative"
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
  @apply flex flex-col
  p-5;
}
.form_buttons {
  @apply flex flex-row justify-end gap-5;
}
.form_items {
  @apply grid grid-cols-3 gap-5;
}

.form_item {
  @apply flex flex-col gap-2 w-[260px];
}

.form_item label {
  @apply font-bold;
}
</style>
