<script setup>
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div class="app flex">
    <Navbar class="w-[300px]" />
    <router-view class="grow"></router-view>
  </div>
</template>
