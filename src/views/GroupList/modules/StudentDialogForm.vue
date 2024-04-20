<script setup>
import { storeToRefs } from "pinia";
import { useStudentFormStore } from "../stores/studentForm.js";
import Dropdown from "primevue/dropdown";

const store = useStudentFormStore();
const { addStudent, v$ } = store;
const { student, dialog, isSubmit } = storeToRefs(store);
</script>

<template>
  <Dialog
    class="p-4"
    modal
    v-model:visible="dialog.isShowDialog"
    :header="dialog.currentHeader"
  >
    <form @submit.prevent="addStudent" method="post">
      <div class="form_wrapper">
        <div class="form_item">
          <label for="surname">Фамилия</label>
          <InputText
            id="surname"
            name="surname"
            v-model="student.surname"
            :invalid="v$.surname.$invalid && isSubmit"
          />
        </div>
        <div class="form_item">
          <label for="name">Имя</label>
          <InputText
            id="name"
            name="name"
            v-model="student.name"
            :invalid="v$.name.$invalid && isSubmit"
          />
        </div>
        <div class="form_item">
          <label for="patronymic">Отчество</label>
          <InputText
            id="patronymic"
            name="patronymic"
            v-model="student.patronymic"
            :invalid="v$.patronymic.$invalid && isSubmit"
          />
        </div>
        <div class="form_item">
          <label for="sex">Пол</label>
          <Dropdown
            id="sex"
            :options="['Мужской', 'Женский']"
            v-model="student.sex"
            :invalid="v$.sex.$invalid && isSubmit"
          />
        </div>
        <div class="form_item">
          <label for="residentialAddress">Домашний адрес</label>
          <InputText
            id="residentialAddress"
            name="residentialAddress"
            v-model="student.Personaldatum.residentialAddress"
            :invalid="v$.Personaldatum.residentialAddress.$invalid && isSubmit"
          />
        </div>
        <div class="form_item">
          <label for="phoneNumber">Номер телефона</label>
          <InputMask
            id="phoneNumber"
            name="phoneNumber"
            mask="+7 999 999-99-99"
            v-model="student.Personaldatum.phoneNumber"
            :invalid="v$.Personaldatum.phoneNumber.$invalid && isSubmit"
          />
        </div>
        <div class="form_item">
          <label for="birthday">Дата рождения</label>
          <Calendar
            id="birthday"
            name="birthday"
            v-model="student.Personaldatum.birthday"
            dateFormat="dd.mm.yy"
            showIcon
            iconDisplay="input"
            :invalid="v$.Personaldatum.birthday.$invalid && isSubmit"
          />
        </div>
        <div class="form_item">
          <label for="reportCardNumber">Табельный номер</label>
          <InputMask
            id="reportCardNumber"
            name="reportCardNumber"
            mask="99999"
            v-model="student.Personaldatum.reportCardNumber"
            :invalid="v$.Personaldatum.reportCardNumber.$invalid && isSubmit"
          />
        </div>
        <div class="form_item">
          <label for="SNILS">СНИЛС</label>
          <InputMask
            id="SNILS"
            name="SNILS"
            mask="999-999-999 99"
            v-model="student.Personaldatum.SNILS"
            :invalid="v$.Personaldatum.SNILS.$invalid && isSubmit"
          />
        </div>
        <div class="form_item">
          <label for="medicalPolicy">Мед. полис</label>
          <InputMask
            id="medicalPolicy"
            name="medicalPolicy"
            mask="9999 9999 9999 9999"
            v-model="student.Personaldatum.medicalPolicy"
            :invalid="v$.Personaldatum.medicalPolicy.$invalid && isSubmit"
          />
        </div>
        <div class="form_buttons">
          <Button
            label="Добавить"
            icon="pi pi-user-plus"
            iconPos="right"
            type="submit"
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
    </form>
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
