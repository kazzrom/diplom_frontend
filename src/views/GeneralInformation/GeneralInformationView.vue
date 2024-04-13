<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import { useGeneralInformationStore } from "./stores/generalInformation.js";
import StudentForm from "./modules/StudentForm.vue";
import StudentPhoto from "./components/StudentPhoto.vue";
import { storeToRefs } from "pinia";

const route = useRoute();
const studentId = route.params.id;

onMounted(() => fetchStudent(studentId));

const store = useGeneralInformationStore();
const { fetchStudent } = store;
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
