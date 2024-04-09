<script setup>
import ProfileNavbar from "./modules/ProfileNavbar.vue";
import ViewHeader from "@/components/ViewHeader.vue";
</script>

<template>
  <div class="wrapper">
    <ViewHeader>Профиль студента</ViewHeader>
    <ProfileNavbar />
    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col;
}
</style>
