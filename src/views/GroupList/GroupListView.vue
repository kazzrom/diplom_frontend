<script setup>
import StudentForm from "./modules/StudentForm.vue";
import StudentsTable from "./modules/GroupTable.vue";
import ViewHeader from "@/components/ViewHeader.vue";
</script>

<template>
  <div class="wrapper flex flex-col">
    <ViewHeader>Список группы</ViewHeader>
    <StudentsTable />
    <StudentForm />
  </div>
</template>
