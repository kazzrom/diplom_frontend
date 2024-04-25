<script setup>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import ViewHeader from "@/components/ViewHeader.vue";
import OrphansTable from "./modules/OrphansTable.vue";
import GuardiansTable from "./modules/GuardiansTable.vue";
import IncompleteFamiliesTable from "./modules/IncompleteFamiliesTable.vue";
import ProblemFamiliesTable from "./modules/ProblemFamiliesTable.vue";
import LowIncomeFamiliesTable from "./modules/LowIncomeFamiliesTable.vue";
import UneployedParentsColumns from "./modules/UneployedParentsColumns.vue";
import RegisteredOPPNTable from "./modules/RegisteredOPPNTable.vue";
import StudentsWithDiseasesTable from "./modules/StudentsWithDiseasesTable.vue";
import DisabledParentsTable from "./modules/DisabledParentsTable.vue";
</script>

<template>
  <div class="flex flex-col w-1">
    <ViewHeader>Социальный паспорт</ViewHeader>
    <TabView :scrollable="true">
      <TabPanel header="Сироты">
        <OrphansTable/>
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
      <TabPanel header="Малообеспеченные семьи">
        <LowIncomeFamiliesTable />
      </TabPanel>
      <TabPanel header="Обучающиеся, у которых родители безработные">
        <UneployedParentsColumns />
      </TabPanel>
      <TabPanel header="Обучающиеся, стоящие на учете в ОППН">
        <RegisteredOPPNTable />
      </TabPanel>
      <TabPanel header="Обучающиеся с хроническими заболеваниями">
        <StudentsWithDiseasesTable />
      </TabPanel>
      <TabPanel
        header="Обучающиеся, из семей, в которых eсть родители-инвалиды"
      >
        <DisabledParentsTable />
      </TabPanel>
    </TabView>
  </div>
</template>
