<script setup>
import StudentsTable from "./components/StudentsTable.vue";
const items = [
  { label: "Сироты" },
  { label: "Опекаемые" },
  { label: "Неполные семьи" },
  { label: "Проблемные семьи" },
  { label: "Многодетные семьи" },
  { label: "Малообечпеченные семьи " },
];
function tabChange(event) {
  const { index } = event;
}
</script>

<template>
  <div class="flex flex-col">
    <header class="bg-white py-8">
      <h2 class="text-4xl font-medium ml-10">Социальный паспорт</h2>
    </header>
    <TabMenu :model="items" @tab-change="tabChange"></TabMenu>
    <StudentsTable />
  </div>
</template>
