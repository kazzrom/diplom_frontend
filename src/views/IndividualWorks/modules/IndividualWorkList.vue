<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useIndividualWorkStore } from "../stores/individualWork.js";
import NoRecordsView from "@/components/NoRecordsView.vue";
import { ACTIONS } from "@/constants";
import { useSearchStore } from "@/stores/search.js";

const route = useRoute();

const searchStore = useSearchStore();
const { filters } = storeToRefs(searchStore);
const store = useIndividualWorkStore();
const { fetchIndividualWorks } = store;
const {
  individualWorks,
  columns,
  selectedIndividualWorks,
  dialog,
  individualWork,
} = storeToRefs(store);

onMounted(() => fetchIndividualWorks(route.params.id));
function openDialog(data, action) {
  individualWork.value = data;
  dialog.value.openDialog(action);
}
</script>

<template>
  <DataTable
    v-if="individualWorks.length"
    :value="individualWorks"
    :paginator="individualWorks.length > 10"
    :rows="10"
    :filters="filters"
    :global-filter-fields="['workDate', 'participant', 'workContent']"
    v-model:selection="selectedIndividualWorks"
  >
    <Column selection-mode="multiple" />
    <Column
      v-for="(column, index) in columns"
      :key="index"
      :field="column.field"
      :header="column.header"
    />
    <Column>
      <template #body="slotProps">
        <div class="flex flex-row gap-2">
          <Button
            icon="pi pi-eye"
            size="small"
            rounded
            text
            @click="openDialog(slotProps.data, ACTIONS.VIEW)"
          />
          <Button
            icon="pi pi-pencil"
            size="small"
            rounded
            text
            @click="openDialog(slotProps.data, ACTIONS.EDIT)"
          />
        </div>
      </template>
    </Column>
  </DataTable>
  <NoRecordsView v-else />
</template>

<style scoped></style>
