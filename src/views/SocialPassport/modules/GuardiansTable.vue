<script setup>
import { onMounted, ref } from "vue";
import NoRecordsView from "@/components/NoRecordsView.vue";
import { TABLE_API_URL } from "../utils/tables";
import Api from "../api/socialPassport.js";
import { GROUP_ID } from "@/constants";

onMounted(async () => await fetchGuardians());

const items = ref([]);

const API = new Api(TABLE_API_URL.UNDER_WARDSHIPS);

const loading = ref(false);
async function fetchGuardians() {
  loading.value = true;
  const response = await API.getRecords(GROUP_ID);
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
        <p v-for="familyMember in data.FamilyMembers" :key="familyMember.id">
          {{ familyMember.fullname }}
        </p>
      </template>
    </Column>
    <Column header="Контакты">
      <template #body="{ data }">
        <p v-for="familyMember in data.FamilyMembers" :key="familyMember.id">
          {{ familyMember.MemberPersonalDatum.phoneNumber }}
        </p>
      </template>
    </Column>
  </DataTable>
  <NoRecordsView v-else />
</template>
