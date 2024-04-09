<script setup>
import { onMounted, ref, watch } from "vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import ViewHeader from "@/components/ViewHeader.vue";
import { useSocialPassportStore } from "@/stores/socialPassport";
import { tables, TABLE_API_URL } from "@/utils/tables.js";
import StudentsTable from "./modules/StudentsTable.vue";

onMounted(() => store.fetchStudents(TABLE_API_URL.ORPHANS));

const store = useSocialPassportStore();

const tableAPI = Object.values(TABLE_API_URL);

const activeTab = ref(0);

watch(activeTab, async (newIndex) => {
  await store.fetchStudents(tableAPI[newIndex]);
});

const students = store.getStudents;
const dataStudentsTable = ref();

const exportCSV = () => {
  dataStudentsTable.value.exportCSV();
};
</script>

<template>
  <div class="flex flex-col">
    <ViewHeader>Социальный паспорт</ViewHeader>
    <TabView v-model:active-index="activeTab">
      <TabPanel
        v-for="table in tables"
        :key="table.header"
        :header="table.header"
      >
        <StudentsTable :items="students" :columns="table.columns" />
      </TabPanel>
    </TabView>
  </div>
</template>
