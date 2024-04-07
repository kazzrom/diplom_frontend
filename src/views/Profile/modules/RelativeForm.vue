<script setup>
import { ref } from "vue";

const props = defineProps(["relative"]);

const relative = ref(props.relative);
</script>

<template>
  <div class="form_wrapper">
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
        <InputText id="phoneNumber" v-model="relative.phoneNumber" />
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
  @apply flex flex-col;
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
