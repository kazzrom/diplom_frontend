<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import { useGeneralInformationStore } from "./stores/generalInformation.js";
import StudentForm from "./modules/StudentForm.vue";
import StudentPhoto from "./components/StudentPhoto.vue";

const route = useRoute();
const studentId = route.params.id;

const store = useGeneralInformationStore();
const { fetchTestStudent } = store;

onMounted(() => fetchTestStudent(studentId));
</script>
<template>
  <div class="wrapper">
    <StudentPhoto :fullname="store.student.fullname" />
    <StudentForm />
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-row gap-10 items-center
          p-7;
}
</style>
