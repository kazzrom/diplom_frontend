<script setup>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import ViewHeader from "@/components/ViewHeader.vue";
import OrphansTable from "./modules/OrphansTable.vue";
import GuardiansTable from "./modules/GuardiansTable.vue";
import IncompleteFamiliesTable from "./modules/IncompleteFamiliesTable.vue";
import ProblemFamiliesTable from "./modules/ProblemFamiliesTable.vue";
</script>

<template>
  <div class="flex flex-col w-1">
    <ViewHeader>Социальный паспорт</ViewHeader>
    <TabView class="w-full" :scrollable="true">
      <TabPanel header="Сироты">
        <OrphansTable />
      </TabPanel>
      <TabPanel header="Опекаемые">
        <GuardiansTable />
      </TabPanel>
      <TabPanel header="Неполные семьи">
        <IncompleteFamiliesTable />
      </TabPanel>
      <TabPanel header="Проблемные семьи">
        <ProblemFamiliesTable />
      </TabPanel>
    </TabView>
  </div>
</template>
