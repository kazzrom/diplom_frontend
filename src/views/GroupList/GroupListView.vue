<script setup>
import GroupTable from "./modules/GroupTable.vue";
import GroupToolbar from "./modules/GroupToolbar.vue";
import StudentDialogForm from "./modules/StudentDialogForm.vue";
import ViewHeader from "@/components/ViewHeader.vue";
</script>

<template>
  <div class="wrapper">
    <ViewHeader>Список группы: 403 ИСП</ViewHeader>
    <GroupToolbar />
    <GroupTable />
    <StudentDialogForm />
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col;
}
</style>
