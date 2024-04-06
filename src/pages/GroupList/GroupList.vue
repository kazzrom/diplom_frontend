<script setup>
import AddStudentForm from "./components/StudentForm.vue";
import StudentsTable from "./components/GroupTable.vue";
</script>

<template>
  <div class="wrapper flex flex-col">
    <header class="bg-white py-8">
      <h2 class="text-4xl font-medium ml-10">Список группы</h2>
    </header>
    <StudentsTable />
    <AddStudentForm />
  </div>
</template>
