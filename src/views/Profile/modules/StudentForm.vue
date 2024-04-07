<script setup>
import { ref } from "vue";

const student = ref({
  name: "",
  surname: "",
  patronymic: "",
  residentialAddress: "",
  phoneNumber: "",
  birthday: NaN,
  reportCardNumber: "",
  SNILS: "",
  medicalPolicy: "",
});
</script>

<template>
  <div class="grid grid-cols-3 gap-5">
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
      <InputText id="residentialAddress" v-model="student.residentialAddress" />
    </div>
    <div class="input-text">
      <label for="phoneNumber">Номер телефона</label>
      <InputText id="phoneNumber" v-model="student.phoneNumber" />
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
      <InputText
        id="reportCardNuber"
        v-model.number="student.reportCardNumber"
      />
    </div>
    <div class="input-text">
      <label for="SNILS">СНИЛС</label>
      <InputText id="SNILS" v-model="student.SNILS" />
    </div>
    <div class="input-text">
      <label for="medicalPolicy">Мед. полис</label>
      <InputText id="medicalPolicy" v-model="student.medicalPolicy" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply grid grid-cols-3 gap-5;
}

.input-text {
  @apply flex flex-col gap-2 w-[260px];
}

.input-text label {
  @apply font-bold;
}
</style>
