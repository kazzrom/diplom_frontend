<script setup>
import GroupTable from "./modules/GroupTable.vue";
import GroupToolbar from "./modules/GroupToolbar.vue";
import StudentDialogForm from "./modules/StudentDialogForm.vue";
import ViewHeader from "@/components/ViewHeader.vue";

import ConfirmDialog from "primevue/confirmdialog";
</script>

<template>
  <div class="wrapper">
    <ViewHeader>Список группы: 403 ИСП</ViewHeader>
    <ConfirmDialog></ConfirmDialog>
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
