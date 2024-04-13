<script setup>
import Navbar from "@/components/Navbar/Navbar.vue";
import ConfirmDialog from "primevue/confirmdialog";
</script>

<template>
  <div class="app flex">
    <ConfirmDialog></ConfirmDialog>
    <Navbar class="w-80" />
    <router-view class="grow"></router-view>
  </div>
</template>
