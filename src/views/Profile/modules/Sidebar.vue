<script setup>
import Menu from "primevue/menu";
import MenuItem from "@/components/Menu/MenuItem.vue";

const items = [
  { label: "Отношения обучающегося", route: { name: "Relationship" } },
  { label: "Личность обучающегося", route: { name: "Personality" } },
];
</script>

<template>
  <Menu :model="items">
    <template #item="{ item, props }">
      <MenuItem :item="item" :props="props" />
    </template>
  </Menu>
</template>
