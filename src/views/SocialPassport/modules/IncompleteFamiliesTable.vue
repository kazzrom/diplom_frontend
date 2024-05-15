<script setup>
import { onMounted, ref } from "vue";
import NoRecordsView from "@/components/NoRecordsView.vue";
import { TABLE_API_URL } from "../utils/tables";
import Api from "../api/socialPassport.js";
import { GROUP_ID } from "@/constants";

onMounted(async () => await fetchIncompleteFamilies());

const API = new Api(TABLE_API_URL.INCOMPLETE_FAMILIES);

const items = ref([]);

const loading = ref(false);

async function fetchIncompleteFamilies() {
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
    <Column header="ФИО родителя">
      <template #body="{ data }">
        <p>
          {{ data.FamilyMembers[0].fullname }} ({{
            data.FamilyMembers[0].relation
          }})
        </p>
      </template>
    </Column>
  </DataTable>
  <NoRecordsView v-else />
</template>
