<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import { useProfileStore } from "@/stores/profile.js";
import StudentForm from "../modules/StudentForm.vue";
import StudentPhoto from "../components/StudentPhoto.vue";

const store = useProfileStore();
const route = useRoute();

const studentId = route.params.id;
onMounted(() => store.fetchTestStudent(studentId));
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
