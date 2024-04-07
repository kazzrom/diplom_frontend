<script setup>
import StudentCard from "../components/StudentCard.vue";
import StudentForm from "../modules/StudentForm.vue";
</script>
<template>
  <div class="wrapper">
    <StudentCard />
    <StudentForm />
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-row gap-10 items-center
          p-7;
}
</style>
