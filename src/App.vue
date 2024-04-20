<script setup>
import Navbar from "@/components/Navbar/Navbar.vue";
import ConfirmDialog from "primevue/confirmdialog";
</script>

<template>
  <div class="app flex flex-col h-screen">
    <ConfirmDialog></ConfirmDialog>
    <header class="p-5 bg-white flex flex-row">
      <Avatar class="bg-transparent mr-3" icon="pi pi-book" />
      <h4>Журнал педагогических наблюдений куратора/мастера группы</h4>
    </header>
    <main class="flex flex-row grow">
      <Navbar class="w-80" />
      <router-view class="grow"></router-view>
    </main>
  </div>
</template>
