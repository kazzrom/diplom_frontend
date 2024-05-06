<script setup>
import ViewHeader from "@/components/ViewHeader.vue";
import HomeroomToolbar from "./modules/HomeroomToolbar.vue";
import HomeroomDialogForm from "./modules/HomeroomDialogForm.vue";
import HomeroomList from "./modules/HomeroomList.vue";
</script>

<template>
  <div class="wrapper">
    <ViewHeader>Классные часы</ViewHeader>
    <HomeroomDialogForm />
    <HomeroomToolbar />
    <HomeroomList />
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col;
}
</style>
