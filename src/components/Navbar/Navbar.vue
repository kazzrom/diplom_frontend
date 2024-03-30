<script setup>
import { ref } from "vue";
import NavbarItem from "./NavbarItem.vue";
import NavbarItems from "./NavbarItems.js";

const items = ref(NavbarItems);
</script>

<template>
  <div class="bg-white h-screen p-3 flex flex-col items-center">
    <Avatar class="mb-4 bg-transparent" icon="pi pi-book" size="xlarge" />
    <PanelMenu class="self-start w-full" :model="items">
      <template #item="{ item }">
        <NavbarItem :scr_item="item" />
      </template>
    </PanelMenu>
  </div>
</template>
