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
const { individualWorks, selectedIndividualWorks, dialog, individualWork } =
  storeToRefs(store);

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
    <Column field="workDate" header="Дата" />
    <Column field="participant" header="С кем проведена беседа" />
    <Column field="workContent" header="Какие вопросы обсуждались">
      <template #body="{ data }">
        <span>{{ data.workContent.substring(0, 20) }}</span>
        <span v-show="data.workContent.length > 20">...</span>
      </template>
    </Column>
    <Column field="expectedResult" header="Предполагаемый результат">
      <template #body="{ data }">
        <span>{{ data.expectedResult.substring(0, 20) }}</span>
        <span v-show="data.expectedResult.length > 20">...</span>
      </template>
    </Column>
    <Column>
      <template #body="slotProps">
        <div class="flex flex-row gap-2">
          <Button
            icon="pi pi-eye"
            title="Просмотреть запись"
            size="small"
            rounded
            text
            @click="openDialog(slotProps.data, ACTIONS.VIEW)"
          />
          <Button
            icon="pi pi-pencil"
            title="Редактировать запись"
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
