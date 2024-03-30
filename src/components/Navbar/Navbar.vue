<script setup>
import { ref } from "vue";
import NavbarItem from "./NavbarItem.vue";
import NavbarItems from "./NavbarItems.js";

const items = ref(NavbarItems);
</script>

<template>
  <div class="bg-white h-screen p-3">
    <PanelMenu :model="items">
      <template #item="{ item }">
        <NavbarItem :scr_item="item" />
      </template>
    </PanelMenu>
  </div>
</template>
