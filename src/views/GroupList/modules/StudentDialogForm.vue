<script setup>
import { storeToRefs } from "pinia";
import { useGroupListStore } from "../stores/groupList.js";

const store = useGroupListStore();
const { addStudent } = store;
const { student, dialog } = storeToRefs(store);
</script>

<template>
  <Dialog
    class="p-4"
    modal
    v-model:visible="dialog.isShowDialog"
    :header="dialog.currentHeader"
  >
    <div class="form_wrapper">
      <div class="form_item">
        <label for="surname">Фамилия</label>
        <InputText id="surname" name="surname" v-model="student.surname" />
      </div>
      <div class="form_item">
        <label for="name">Имя</label>
        <InputText id="name" name="name" v-model="student.name" />
      </div>
      <div class="form_item">
        <label for="patronymic">Отчество</label>
        <InputText
          id="patronymic"
          name="patronymic"
          v-model="student.patronymic"
        />
      </div>
      <div class="form_item">
        <label for="residentialAddress">Домашний адрес</label>
        <InputText
          id="residentialAddress"
          name="residentialAddress"
          v-model="student.residentialAddress"
        />
      </div>
      <div class="form_item">
        <label for="phoneNumber">Номер телефона</label>
        <InputMask
          id="phoneNumber"
          name="phoneNumber"
          mask="+7 999 999-99-99"
          v-model="student.phoneNumber"
        />
      </div>
      <div class="form_item">
        <label for="birthday">Дата рождения</label>
        <Calendar
          id="birthday"
          name="birthday"
          v-model="student.birthday"
          dateFormat="dd.mm.yy"
          showIcon
          iconDisplay="input"
        />
      </div>
      <div class="form_item">
        <label for="reportCardNumber">Табельный номер</label>
        <InputNumber
          id="reportCardNumber"
          name="reportCardNumber"
          v-model="student.reportCardNumber"
          :use-grouping="false"
        />
      </div>
      <div class="form_item">
        <label for="SNILS">СНИЛС</label>
        <InputMask
          id="SNILS"
          name="SNILS"
          mask="999-999-999 99"
          v-model="student.SNILS"
        />
      </div>
      <div class="form_item">
        <label for="medicalPolicy">Мед. полис</label>
        <InputMask
          id="medicalPolicy"
          name="medicalPolicy"
          mask="9999 9999 9999 9999"
          v-model="student.medicalPolicy"
        />
      </div>
      <div class="form_buttons">
        <Button
          label="Добавить"
          icon="pi pi-user-plus"
          iconPos="right"
          @click="addStudent"
        />
        <Button
          label="Отмена"
          icon="pi pi-times"
          iconPos="right"
          severity="secondary"
          @click="dialog.closeDialog()"
        />
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.form_wrapper {
  @apply grid grid-cols-3 gap-5;
}
.form_buttons {
  @apply col-span-3 flex justify-end gap-2 mt-5;
}

.form_item {
  @apply flex flex-col;
}
</style>
