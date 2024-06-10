<script setup>
import ViewHeader from "@/components/ViewHeader.vue";
import GroupForm from "./modules/GroupMeetingForm.vue";
import GroupMeetingToolbar from "./modules/GroupMeetingToolbar.vue";
import GroupMeetingList from "./modules/GroupMeetingList.vue";
</script>

<template>
  <div class="wrapper">
    <ViewHeader>Собрания группы</ViewHeader>
    <GroupForm />
    <GroupMeetingToolbar />
    <GroupMeetingList />
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col;
}
</style>
