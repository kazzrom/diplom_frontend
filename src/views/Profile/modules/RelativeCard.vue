<script setup>
import { ref } from "vue";
import { useFamilySectionStore } from "@/stores/familySection";
import { ACTIONS } from "@/constants";
import { storeToRefs } from "pinia";

const store = useFamilySectionStore();
const { dialog } = storeToRefs(store);
const props = defineProps(["relative"]);

const relative = ref(props.relative);
</script>

<template>
  <div class="form_wrapper">
    <Button
      icon="pi pi-pencil"
      text
      rounded
      class="edit_button"
      @click="dialog.openDialog(ACTIONS.EDIT)"
    />
    <h4 class="font-bold mb-5">{{ relative.kinship }}</h4>
    <div class="form">
      <div class="input-text">
        <label for="surname">Фамилия</label>
        <InputText id="surname" v-model="relative.surname" />
      </div>
      <div class="input-text">
        <label for="name">Имя</label>
        <InputText id="name" v-model="relative.name" />
      </div>
      <div class="input-text">
        <label for="patronymic">Отчество</label>
        <InputText id="patronymic" v-model="relative.patronymic" />
      </div>
      <div class="input-text">
        <label for="phoneNumber">Номер телефона</label>
        <InputMask
          id="phoneNumber"
          mask="+7 999 999-99-99"
          v-model="relative.phoneNumber"
        />
      </div>
      <div class="input-text">
        <label for="phoneNumber">Место работы</label>
        <InputText id="phoneNumber" v-model="relative.workPlace" />
      </div>
      <div class="input-text">
        <label for="phoneNumber">Должность</label>
        <InputText id="phoneNumber" v-model="relative.jobTitle" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.form_wrapper {
  @apply flex flex-col relative
  border border-solid border-slate-300 rounded-md
  px-10 pt-8 pb-10
  bg-white;
}

.edit_button {
  @apply absolute top-3 right-3;
}

.form {
  @apply grid grid-cols-3 gap-5;
}

.input-text {
  @apply flex flex-col gap-2 w-[260px];
}

.input-text label {
  @apply font-bold;
}
</style>
