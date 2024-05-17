<script setup>
import StudentForm from "./modules/StudentForm.vue";
import StudentPhoto from "./components/StudentPhoto.vue";
</script>

<template>
  <div class="wrapper">
    <StudentPhoto />
    <StudentForm />
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-row gap-10 items-center
          p-7;
}
</style>
