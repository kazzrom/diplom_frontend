<script setup>
import StudentCard from "../components/StudentCard.vue";
import StudentForm from "../modules/StudentForm.vue";
import { useProfileStore } from "@/stores/profile.js";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

const store = useProfileStore();
const route = useRoute();

const studentId = route.params.id;
onMounted(() => store.fetchTestStudent(studentId));
</script>
<template>
  <div class="wrapper">
    <StudentCard :fullname="store.student.fullname" />
    <StudentForm />
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-row gap-10 items-center
          p-7;
}
</style>
