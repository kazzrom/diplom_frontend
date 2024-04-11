<script setup>
import { useGeneralInformationStore } from "../stores/generalInformation.js";
import { storeToRefs } from "pinia";

const store = useGeneralInformationStore();
const { editStudent } = store;
const { student } = storeToRefs(store);
</script>

<template>
  <div class="wrapperr">
    <div class="form_items">
      <div class="input-text">
        <label for="surname">Фамилия</label>
        <InputText id="surname" v-model="student.surname" />
      </div>
      <div class="input-text">
        <label for="name">Имя</label>
        <InputText id="name" v-model="student.name" />
      </div>
      <div class="input-text">
        <label for="patronymic">Отчество</label>
        <InputText id="patronymic" v-model="student.patronymic" />
      </div>
      <div class="input-text">
        <label for="residentialAddress">Домашний адрес</label>
        <InputText
          id="residentialAddress"
          v-model="student.residentialAddress"
        />
      </div>
      <div class="input-text">
        <label for="phoneNumber">Номер телефона</label>
        <InputMask
          id="phoneNumber"
          mask="+7 999 999-99-99"
          v-model="student.phoneNumber"
        />
      </div>
      <div class="input-text">
        <label for="birthday">Дата рождения</label>
        <Calendar
          v-model="student.birthday"
          dateFormat="dd.mm.yy"
          showIcon
          iconDisplay="input"
        />
      </div>
      <div class="input-text">
        <label for="reportCardNuber">Табельный номер</label>
        <InputNumber
          id="reportCardNuber"
          v-model="student.reportCardNumber"
          :useGrouping="false"
        />
      </div>
      <div class="input-text">
        <label for="SNILS">СНИЛС</label>
        <InputMask id="SNILS" mask="999-999-999 99" v-model="student.SNILS" />
      </div>
      <div class="input-text">
        <label for="medicalPolicy">Мед. полис</label>
        <InputMask
          id="medicalPolicy"
          mask="9999 9999 9999 9999"
          v-model="student.medicalPolicy"
        />
      </div>
    </div>
    <div class="form_buttons">
      <Button
        @click="editStudent"
        label="Сохранить"
        icon="pi pi-save"
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
  @apply flex flex-col gap-2 w-[260px];
}

.input-text label {
  @apply font-bold;
}
</style>
