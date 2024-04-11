<script setup>
import ViewHeader from "@/components/ViewHeader.vue";
import GroupActiveList from "./modules/GroupActiveList.vue";
</script>

<template>
  <div class="wrapper">
    <ViewHeader>Актив группы</ViewHeader>
    <GroupActiveList />
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col;
}
</style>
