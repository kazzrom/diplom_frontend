<script setup>
import { ref } from "vue";
import NavbarItem from "./NavbarItem.vue";
import NavbarItems from "./NavbarItems.js";

const items = ref(NavbarItems);
</script>

<template>
  <div class="wrapper">
    <Avatar class="mb-4 bg-transparent" icon="pi pi-book" size="xlarge" />
    <PanelMenu class="self-start w-full" :model="items">
      <template #item="{ item }">
        <NavbarItem :item="item" />
      </template>
    </PanelMenu>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col items-center 
  bg-white h-screen p-3;
}
</style>
