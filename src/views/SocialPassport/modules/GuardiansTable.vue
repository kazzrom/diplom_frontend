<script setup>
import ky from "ky";
import { API_URL } from "@/constants";
import { onMounted, ref } from "vue";
import NoRecordsView from "@/components/NoRecordsView.vue";
import { TABLE_API_URL } from "../utils/tables";

onMounted(async () => await fetchGuardians());

const items = ref([]);

const loading = ref(false);
async function fetchGuardians() {
  loading.value = true;
  const response = await ky.get(`${API_URL}${TABLE_API_URL.GUARDIANS}`).json();
  items.value = response;
  loading.value = false;
}
</script>

<template>
  <DataTable
    v-if="items.length"
    :loading="loading"
    ref="dataStudentsTable"
    :value="items"
  >
    <Column field="id" header="№" />
    <Column field="fullname" header="ФИО студента" />
    <Column header="ФИО опекуна">
      <template #body="{ data }">
        <p v-for="familyTie in data.Familyties" :key="familyTie.id">
          {{ familyTie.Relative.fullname }}
        </p>
      </template>
    </Column>
    <Column header="Контакты">
      <template #body="{ data }">
        <p v-for="familyTie in data.Familyties" :key="familyTie.id">
          {{ familyTie.Relative.phoneNumber }}
        </p>
      </template>
    </Column>
  </DataTable>
  <NoRecordsView v-else />
</template>
