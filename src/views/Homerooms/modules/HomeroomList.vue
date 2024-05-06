<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useHomeroomStore } from "../stores/homeroom.js";
import { useCRUDStore } from "../stores/CRUD.js";
import { useSearchStore } from "@/stores/search.js";
import { ACTIONS } from "@/constants";
import NoRecordsView from "@/components/NoRecordsView.vue";

onMounted(async () => await homeroomsStore.fetchHomerooms());

const searchStore = useSearchStore();
const { filters } = storeToRefs(searchStore);

const homeroomsStore = useHomeroomStore();
const { homeroom, homerooms, selectedHomerooms } = storeToRefs(homeroomsStore);

const crudStore = useCRUDStore();
const { dialog } = storeToRefs(crudStore);

const columns = ref([
  { field: "meetingDate", header: "Дата" },
  { field: "theme", header: "Тема" },
  { field: "location", header: "Место проведения" },
]);

function openDialog(action, data) {
  homeroom.value = data;
  dialog.value.openDialog(action);
}
</script>

<template>
  <DataTable
    v-if="homerooms.length"
    paginator
    :rows="10"
    v-model:selection="selectedHomerooms"
    :filters="filters"
    :global-filter-fields="['meetingDate', 'theme']"
    :value="homerooms"
  >
    <Column selectionMode="multiple" />
    <Column
      v-for="column in columns"
      :key="column.field"
      :field="column.field"
      :header="column.header"
    />
    <Column>
      <template #body="{ data }">
        <Button icon="pi pi-eye" text @click="openDialog(ACTIONS.VIEW, data)" />
        <Button
          icon="pi pi-pencil"
          text
          @click="openDialog(ACTIONS.EDIT, data)"
        />
      </template>
    </Column>
  </DataTable>
  <NoRecordsView v-else />
</template>
