<script setup>
import RelativeForm from "../modules/RelativeForm.vue";
const relatives = [
  {
    name: "Фёдор",
    surname: "Молчанов",
    patronymic: "Глебович",
    phoneNumber: "+79122717256",
    workPlace: "Кухня",
    jobTitle: "Повар",
    kinship: "Отец",
  },
  {
    name: "Ясмина",
    surname: "Молчанова",
    patronymic: "Тимуровна",
    phoneNumber: "+79122717256",
    workPlace: "Кухня",
    jobTitle: "Повар",
    kinship: "Мать",
  },
];
</script>
<template>
  <div class="wrapper">
    <RelativeForm
      v-for="(relative, index) in relatives"
      :key="index"
      :relative="relative"
    />
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col gap-14 px-14 pt-10;
}
</style>
