<script setup>
import { useGeneralInformationStore } from "../stores/generalInformation.js";
import { storeToRefs } from "pinia";

const store = useGeneralInformationStore();
const { editStudent } = store;
const { student, isEditForm } = storeToRefs(store);
</script>

<template>
  <div class="wrapperr">
    <div class="form_items">
      <div class="input-text">
        <label for="surname">Фамилия</label>
        <InputText
          :readonly="isEditForm"
          id="surname"
          v-model="student.surname"
        />
      </div>
      <div class="input-text">
        <label for="name">Имя</label>
        <InputText :readonly="isEditForm" id="name" v-model="student.name" />
      </div>
      <div class="input-text">
        <label for="patronymic">Отчество</label>
        <InputText
          :readonly="isEditForm"
          id="patronymic"
          v-model="student.patronymic"
        />
      </div>
      <div class="input-text">
        <label for="residentialAddress">Домашний адрес</label>
        <InputText
          :readonly="isEditForm"
          id="residentialAddress"
          v-model="student.Personaldatum.residentialAddress"
        />
      </div>
      <div class="input-text">
        <label for="phoneNumber">Номер телефона</label>
        <InputMask
          :readonly="isEditForm"
          id="phoneNumber"
          mask="+7 999 999-99-99"
          v-model="student.Personaldatum.phoneNumber"
        />
      </div>
      <div class="input-text">
        <label for="birthday">Дата рождения</label>
        <Calendar
          :readonly="isEditForm"
          v-model="student.Personaldatum.birthday"
          dateFormat="dd.mm.yy"
          showIcon
          iconDisplay="input"
        />
      </div>
      <div class="input-text">
        <label for="reportCardNuber">Табельный номер</label>
        <InputNumber
          :readonly="isEditForm"
          id="reportCardNuber"
          v-model="student.Personaldatum.reportCardNumber"
          :useGrouping="false"
        />
      </div>
      <div class="input-text">
        <label for="SNILS">СНИЛС</label>
        <InputMask
          :readonly="isEditForm"
          id="SNILS"
          mask="999-999-999 99"
          v-model="student.Personaldatum.SNILS"
        />
      </div>
      <div class="input-text">
        <label for="medicalPolicy">Мед. полис</label>
        <InputMask
          :readonly="isEditForm"
          id="medicalPolicy"
          mask="9999 9999 9999 9999"
          v-model="student.Personaldatum.medicalPolicy"
        />
      </div>
    </div>
    <div class="form_buttons">
      <Button
        @click="editStudent"
        :label="isEditForm ? 'Редактировать' : 'Сохранить'"
        :icon="isEditForm ? 'pi pi-pencil' : 'pi pi-save'"
        iconPos="right"
      />
    </div>
  </div>
</template>

<style scoped>
.wrapperr {
  @apply flex flex-col items-center gap-7;
}
.form_items {
  @apply grid grid-cols-3 gap-5;
}

.input-text {
  @apply flex flex-col gap-2 w-[260px] relative;
}

.input-text label {
  @apply font-bold;
}
</style>
