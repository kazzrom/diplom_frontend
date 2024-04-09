<script setup>
import ViewHeader from "@/components/ViewHeader.vue";
import ParentMeetingDialogForm from "./modules/ParentMeetingDialogForm.vue";
import ParentMeetingList from "./modules/ParentMeetingList.vue";
import ParentMeetingToolbar from "./modules/ParentMeetingToolbar.vue";
</script>

<template>
  <div class="wrapper">
    <ViewHeader>Родительские собрания</ViewHeader>
    <ParentMeetingDialogForm />
    <ParentMeetingToolbar />
    <ParentMeetingList />
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col;
}
</style>
