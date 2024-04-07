<script setup>
import { ref } from "vue";
import { useGroupListStore } from "@/stores/groupList.js";

const { getVisibleStudentForm, closeStudentForm } = useGroupListStore();

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

function AddStudent() {
  closeStudentForm();
}
</script>

<template>
  <Dialog
    v-model:visible="getVisibleStudentForm"
    modal
    header="Добавление студента"
    class="p-4"
  >
    <div class="grid grid-cols-3 gap-5">
      <div class="flex flex-col">
        <label for="surname">Фамилия</label>
        <InputText id="surname" v-model="student.surname" />
      </div>
      <div class="flex flex-col">
        <label for="name">Имя</label>
        <InputText id="name" v-model="student.name" />
      </div>
      <div class="flex flex-col">
        <label for="patronymic">Отчество</label>
        <InputText id="patronymic" v-model="student.patronymic" />
      </div>
      <div class="flex flex-col">
        <label for="residentialAddress">Домашний адрес</label>
        <InputText
          id="residentialAddress"
          v-model="student.residentialAddress"
        />
      </div>
      <div class="flex flex-col">
        <label for="phoneNumber">Номер телефона</label>
        <InputMask
          id="phoneNumber"
          mask="+7 999 999-99-99"
          v-model="student.phoneNumber"
        />
      </div>
      <div class="flex flex-col">
        <label for="birthday">Дата рождения</label>
        <Calendar
          v-model="student.birthday"
          dateFormat="dd.mm.yy"
          showIcon
          iconDisplay="input"
        />
      </div>
      <div class="flex flex-col">
        <label for="reportCardNuber">Табельный номер</label>
        <InputNumber
          id="reportCardNuber"
          v-model="student.reportCardNumber"
          :use-grouping="false"
        />
      </div>
      <div class="flex flex-col">
        <label for="SNILS">СНИЛС</label>
        <InputMask id="SNILS" mask="999-999-999 99" v-model="student.SNILS" />
      </div>
      <div class="flex flex-col">
        <label for="medicalPolicy">Мед. полис</label>
        <InputMask
          id="medicalPolicy"
          mask="9999 9999 9999 9999"
          v-model="student.medicalPolicy"
        />
      </div>
      <div class="col-span-3 flex justify-end gap-2 mt-5">
        <Button
          label="Добавить"
          icon="pi pi-user-plus"
          iconPos="right"
          @click="AddStudent"
        />
        <Button
          label="Отмена"
          icon="pi pi-times"
          iconPos="right"
          severity="secondary"
          @click="closeStudentForm"
        />
      </div>
    </div>
  </Dialog>
</template>
