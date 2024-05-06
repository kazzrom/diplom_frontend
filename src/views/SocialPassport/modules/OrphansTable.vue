<script setup>
import { onMounted, ref } from "vue";
import NoRecordsView from "@/components/NoRecordsView.vue";
import Api from "../api/socialPassport.js";
import { GROUP_ID } from "@/constants.js";
import { TABLE_API_URL } from "../utils/tables.js";

onMounted(async () => await fetchOrphans());

const API = new Api(TABLE_API_URL.ORPHANS);

const items = ref([]);
const loading = ref(false);

async function fetchOrphans() {
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
    <Column header="ФИО родственников">
      <template #body="{ data }">
        <p v-for="familyMember in data.FamilyMembers" :key="familyMember.id">
          {{ familyMember.fullname }} ({{
            familyMember.relation
          }})
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
