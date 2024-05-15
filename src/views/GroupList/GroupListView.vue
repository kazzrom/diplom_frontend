<script setup>
import GroupTable from "./modules/GroupTable.vue";
import GroupToolbar from "./modules/GroupToolbar.vue";
import StudentDialogForm from "./modules/StudentDialogForm.vue";
import ViewHeader from "@/components/ViewHeader.vue";
</script>

<template>
  <div class="wrapper">
    <ViewHeader>Список группы</ViewHeader>
    <GroupToolbar />
    <GroupTable class="grid" />
    <StudentDialogForm />
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col;
}
</style>
