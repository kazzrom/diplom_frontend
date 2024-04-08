<script setup>
import TabMenu from "primevue/tabmenu";
import TabMenuItem from "@/components/TabMenu/TabMenuItem.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const items = [
  { label: "Общие сведения", route: { name: "GeneralInformation" } },
  { label: "Характеристика", route: { name: "Characteristic" } },
  { label: "Семья", route: { name: "Family" } },
  { label: "Индивидуальная работа", route: { name: "IndividualWork" } },
];
function toGroupList() {
  router.push({ name: "Students" });
}
</script>

<template>
  <div class="wrapper">
    <header class="header">
      <Button
        @click="toGroupList"
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
