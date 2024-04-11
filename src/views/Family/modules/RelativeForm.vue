<script setup>
import { useFamilySectionStore } from "../stores/family.js";
import { storeToRefs } from "pinia";
import Dropdown from "primevue/dropdown";
import { ACTIONS } from "@/constants";

const store = useFamilySectionStore();
const { AddRelative, EditRelative } = store;
const { relative, kinships, dialog } = storeToRefs(store);
</script>

<template>
  <div class="form_wrapper">
    <div class="form_items">
      <div class="form_item">
        <label for="surname">Фамилия</label>
        <InputText id="surname" v-model="relative.surname" />
      </div>
      <div class="form_item">
        <label for="name">Имя</label>
        <InputText id="name" v-model="relative.name" />
      </div>
      <div class="form_item">
        <label for="patronymic">Отчество</label>
        <InputText id="patronymic" v-model="relative.patronymic" />
      </div>
      <div class="form_item">
        <label for="phoneNumber">Номер телефона</label>
        <InputMask
          id="phoneNumber"
          mask="+7 999 999-99-99"
          v-model="relative.phoneNumber"
        />
      </div>
      <div class="form_item">
        <label for="phoneNumber">Место работы</label>
        <InputText id="phoneNumber" v-model="relative.workPlace" />
      </div>
      <div class="form_item">
        <label for="phoneNumber">Должность</label>
        <InputText id="phoneNumber" v-model="relative.jobTitle" />
      </div>
      <div class="form_item">
        <label for="kinship">Родство</label>
        <Dropdown id="kinship" v-model="relative.kinship" :options="kinships" />
      </div>
    </div>
    <div class="form_buttons">
      <Button
        v-show="dialog.action === ACTIONS.ADD"
        @click="AddRelative"
        label="Добавить"
        icon="pi pi-plus"
        iconPos="right"
      />
      <Button
        v-show="dialog.action === ACTIONS.EDIT"
        @click="EditRelative"
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
