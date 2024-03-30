<script setup>
import AddStudentForm from "./components/AddStudentForm.vue";
import StudentsTable from "./components/StudentsTable.vue";
</script>

<template>
  <div class="wrapper flex flex-col">
    <header class="flex items-center bg-white h-[100px]">
      <h2 class="text-4xl font-medium ml-[35px]">Список группы</h2>
    </header>
    <StudentsTable />
    <AddStudentForm />
  </div>
</template>
