<script setup>
import TabMenu from "primevue/tabmenu";
import TabMenuItem from "@/components/TabMenu/TabMenuItem.vue";

const items = [
  { label: "Общие сведения", route: { name: "GeneralInformation" } },
  { label: "Характеристика", route: { name: "Characteristic" } },
  { label: "Семья", route: { name: "Family" } },
  { label: "Индивидуальная работа", route: { name: "IndividualWork" } },
];
</script>

<template>
  <TabMenu :model="items">
    <template #item="{ item, props }">
      <TabMenuItem :item="item" :props="props" />
    </template>
  </TabMenu>
</template>
