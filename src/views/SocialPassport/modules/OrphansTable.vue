<script setup>
import { onMounted, ref } from "vue";
import NoRecordsView from "@/components/NoRecordsView.vue";
import Api from "../api/socialPassport.js";
import { TABLE_API_URL } from "../utils/tables.js";
import { exportOrphansTable } from "../utils/export.js";

onMounted(async () => await fetchOrphans());

const API = new Api(TABLE_API_URL.ORPHANS);

const items = ref([]);
const loading = ref(false);

async function fetchOrphans() {
  loading.value = true;
  const response = await API.getRecords();
  items.value = response;
  loading.value = false;
}

function exportTable() {
  exportOrphansTable(items.value);
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
    <Column header="ФИО родственников">
      <template #body="{ data }">
        <p v-for="familyMember in data.FamilyMembers" :key="familyMember.id">
          {{ familyMember.fullname }} ({{ familyMember.relation }})
        </p>
      </template>
    </Column>
    <Column header="Контакты">
      <template #body="{ data }">
        <p v-for="familyMember in data.FamilyMembers" :key="familyMember.id">
          {{ familyMember.MemberPersonalDatum.phoneNumber }} ({{
            familyMember.relation
          }})
        </p>
      </template>
    </Column>
  </DataTable>
  <NoRecordsView v-else />
</template>
