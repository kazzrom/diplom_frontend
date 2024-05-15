<script setup>
import { ref } from "vue";
import ViewHeader from "@/components/ViewHeader.vue";
import Dropdown from "primevue/dropdown";
import { useRouter } from "vue-router";

const router = useRouter();

const items = [
  { label: "Сироты", route: { name: "Orphans" } },
  { label: "Опекаемые", route: { name: "Guardians" } },
  { label: "Неполные семьи", route: { name: "IncompleteFamilies" } },
  { label: "Многодетные семьи", route: { name: "LargeFamilies" } },
  { label: "Проблемные семьи", route: { name: "ProblemFamilies" } },
  { label: "Малообеспеченные семьи", route: { name: "LowIncomeFamilies" } },
  {
    label: "Обучающиеся, у которых родители безработные",
    route: { name: "UneployedParents" },
  },
  {
    label: "Обучающиеся, стоящие на учете в ОППН",
    route: { name: "RegisteredOPPN" },
  },
  {
    label: "Обучающиеся с хроническими заболеваниями",
    route: { name: "StudentsWithDiseases" },
  },
  {
    label: "Обучающиеся, из семей, в которых eсть родители-инвалиды",
    route: { name: "DisabledParents" },
  },
];

const selecredItem = ref(items[0]);
router.push(items[0].route);

function change(event) {
  router.push(event.value.route);
}
</script>

<template>
  <div class="wrapper">
    <ViewHeader>Социальный паспорт</ViewHeader>
    <main>
      <Dropdown
        v-model="selecredItem"
        :options="items"
        optionLabel="label"
        @change="change"
        placeholder="Выберите таблицу"
      />
      <RouterView class="grow" />
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col gap-5;
}

main {
  @apply flex flex-col px-5 gap-5 grow;
}
</style>
