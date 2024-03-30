<script setup>
import Navbar from "@/components/Navbar/Navbar.vue";
</script>

<template>
  <div class="app flex">
    <Navbar class="w-80" />
    <router-view class="grow"></router-view>
  </div>
</template>
