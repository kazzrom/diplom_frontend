<script setup>
import AddStudentForm from "./components/AddStudentForm.vue";
import StudentsTable from "./components/StudentsTable.vue";
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
