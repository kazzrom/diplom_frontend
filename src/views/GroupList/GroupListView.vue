<script setup>
import StudentForm from "./modules/StudentForm.vue";
import StudentsTable from "./modules/GroupTable.vue";
</script>

<template>
  <div class="wrapper flex flex-col">
    <header class="bg-white py-8">
      <h2 class="ml-10">Список группы</h2>
    </header>
    <StudentsTable />
    <StudentForm />
  </div>
</template>
