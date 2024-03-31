<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const visibleAddStudentForm = computed(
  () => store.getters.visibleAddStudentForm
);
const student = ref({
  name: "",
  surname: "",
  patronymic: "",
  residentialAddress: "",
  phoneNumber: "",
  birthday: NaN,
  reportCardNuber: "",
  SNILS: "",
  medicalPolicy: "",
});
</script>

<template>
  <Dialog
    v-model:visible="visibleAddStudentForm"
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
        <InputText id="phoneNumber" v-model="student.phoneNumber" />
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
        <InputText
          id="reportCardNuber"
          v-model.number="student.reportCardNuber"
        />
      </div>
      <div class="flex flex-col">
        <label for="SNILS">СНИЛС</label>
        <InputText id="SNILS" v-model="student.SNILS" />
      </div>
      <div class="flex flex-col">
        <label for="medicalPolicy">Мед. полис</label>
        <InputText id="medicalPolicy" v-model="student.medicalPolicy" />
      </div>
      <div class="col-span-3 flex justify-end gap-2 mt-5">
        <Button label="Добавить" icon="pi pi-user-plus" iconPos="right" />
        <Button
          label="Отмена"
          icon="pi pi-times"
          iconPos="right"
          severity="secondary"
          @click="store.commit('closeAddStudentForm')"
        />
      </div>
    </div>
  </Dialog>
</template>
