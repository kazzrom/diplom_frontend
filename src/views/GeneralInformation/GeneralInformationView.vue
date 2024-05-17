<script setup>
import { useGeneralInformationStore } from "./stores/generalInformation.js";
import { storeToRefs } from "pinia";
import StudentForm from "./modules/StudentForm.vue";
import StudentPhoto from "./components/StudentPhoto.vue";

const store = useGeneralInformationStore();
const { student } = storeToRefs(store);
</script>

<template>
  <div class="wrapper">
    <StudentPhoto :fullname="student.surname + ' ' + student.name" />
    <StudentForm />
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-row gap-10 items-center
          p-7;
}
</style>
