<script setup>
import { useGeneralInformationStore } from "../stores/generalInformation.js";
import { storeToRefs } from "pinia";
import Textarea from "primevue/textarea";

const store = useGeneralInformationStore();
const { editStudent, v$ } = store;
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
          :invalid="v$.surname.$invalid"
        />
      </div>
      <div class="input-text">
        <label for="name">Имя</label>
        <InputText
          :readonly="isEditForm"
          id="name"
          v-model="student.name"
          :invalid="v$.name.$invalid"
        />
      </div>
      <div class="input-text">
        <label for="patronymic">Отчество</label>
        <InputText
          :readonly="isEditForm"
          id="patronymic"
          v-model="student.patronymic"
          :invalid="v$.patronymic.$invalid"
        />
      </div>
      <div class="input-text">
        <label for="sex">Пол</label>
        <Dropdown
          :class="{ dropdown_readonly: isEditForm }"
          id="sex"
          v-model="student.sex"
          :options="['Мужской', 'Женский']"
          :invalid="v$.sex.$invalid"
        />
      </div>
      <div class="input-text">
        <label for="residentialAddress">Домашний адрес</label>
        <InputText
          :readonly="isEditForm"
          id="residentialAddress"
          v-model="student.PersonalDatum.residentialAddress"
          :invalid="v$.PersonalDatum.residentialAddress.$invalid"
        />
      </div>
      <div class="input-text">
        <label for="whereFrom">Городской/Сельский/Иногородний</label>
        <Dropdown
          :class="{ dropdown_readonly: isEditForm }"
          id="whereFrom"
          v-model="student.PersonalDatum.whereFrom"
          :options="['Городской', 'Сельский', 'Иногородний']"
        />
      </div>
      <div class="input-text">
        <label for="phoneNumber">Номер телефона</label>
        <InputMask
          :readonly="isEditForm"
          id="phoneNumber"
          mask="+7 999 999-99-99"
          v-model="student.PersonalDatum.phoneNumber"
          :invalid="v$.PersonalDatum.phoneNumber.$invalid"
        />
      </div>
      <div class="input-text">
        <label for="email">Почта</label>
        <InputText
          :readonly="isEditForm"
          id="email"
          v-model="student.PersonalDatum.email"
          :invalid="v$.PersonalDatum.email.$invalid"
        />
      </div>
      <div class="input-text">
        <label for="birthday">Дата рождения</label>
        <Calendar
          :readonly="isEditForm"
          v-model="student.PersonalDatum.birthday"
          :invalid="v$.PersonalDatum.birthday.$invalid"
          dateFormat="dd.mm.yy"
          showIcon
          iconDisplay="input"
        />
      </div>
      <div class="input-text">
        <label for="reportCardNuber">Табельный номер</label>
        <InputMask
          :readonly="isEditForm"
          id="reportCardNuber"
          mask="99999"
          v-model="student.PersonalDatum.reportCardNumber"
          :invalid="v$.PersonalDatum.reportCardNumber.$invalid"
        />
      </div>
      <div class="input-text">
        <label for="SNILS">СНИЛС</label>
        <InputMask
          :readonly="isEditForm"
          id="SNILS"
          mask="999-999-999 99"
          v-model="student.PersonalDatum.SNILS"
        />
      </div>
      <div class="input-text">
        <label for="medicalPolicy">Мед. полис</label>
        <InputMask
          :readonly="isEditForm"
          id="medicalPolicy"
          mask="9999 9999 9999 9999"
          v-model="student.PersonalDatum.medicalPolicy"
        />
      </div>
      <div class="input-text">
        <label for="note">Примечание</label>
        <Textarea id="note" v-model="student.note" :readonly="isEditForm" />
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
  @apply grid grid-cols-4 gap-5;
}

.input-text {
  @apply flex flex-col gap-2 w-[260px] relative;
}

.input-text label {
  @apply font-bold;
}

.dropdown_readonly {
  pointer-events: none;
}
</style>
