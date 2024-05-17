<script setup>
import { onMounted, ref } from "vue";
import NoRecordsView from "@/components/NoRecordsView.vue";
import { TABLE_API_URL } from "../utils/tables";
import Api from "../api/socialPassport.js";
import { GROUP_ID } from "@/constants";
import { exportLargeFamiliesTable } from "../utils/export.js";

onMounted(async () => await fetchLargeFamilies());

const items = ref([]);

const API = new Api(TABLE_API_URL.LARGE_FAMILIES);

const loading = ref(false);
async function fetchLargeFamilies() {
  loading.value = true;
  const response = await API.getRecords(GROUP_ID);
  items.value = response;
  loading.value = false;
}

function exportTable() {
  exportLargeFamiliesTable(items.value);
}
</script>

<template>
  <DataTable
    v-if="items.length"
    :loading="loading"
    ref="dataStudentsTable"
    :value="items"
  >
    <template #header>
      <Button
        label="Экспорт в Excel"
        icon="pi pi-file-excel"
        severity="success"
        @click="exportTable"
      />
    </template>
    <Column field="id" header="№" />
    <Column field="fullname" header="ФИО студента" />
    <Column header="Количество детей">
      <template #body="{ data }">
        <p>
          {{ data.FamilyMembers.length + 1 }}
        </p>
      </template>
    </Column>
  </DataTable>
  <NoRecordsView v-else />
</template>
