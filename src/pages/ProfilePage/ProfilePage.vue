<script setup>
import TabMenu from "primevue/tabmenu";
import TabMenuItem from "@/components/TabMenu/TabMenuItem.vue";
const items = [
  { label: "Общие сведения", route: { name: "generalInformation" } },
  { label: "Характеристика", route: { name: "characteristic" } },
  { label: "Семья", route: { name: "family" } },
  { label: "Индивидуальная работа", route: { name: "individualWork" } },
];
</script>

<template>
  <div class="wrapper">
    <header class="header">
      <Button
        icon="pi pi-arrow-left text-xl"
        text
        rounded
        severity="secondary"
      />
      <h2>Профиль студента</h2>
    </header>
    <main class="main">
      <TabMenu :model="items">
        <template #item="{ item, props }">
          <TabMenuItem :item="item" :props="props" />
        </template>
      </TabMenu>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col;
}

.header {
  @apply flex items-center h-24 pl-10 gap-5;
}
.main {
  @apply flex flex-col;
}
</style>
