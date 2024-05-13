<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useGroupMeetingsStore } from "../stores/groupMeetings.js";
import { GROUP_MEETINGS_COLUMNS } from "../constants/groupMeetings.js";
import { useSearchStore } from "@/stores/search.js";
import { useExportStore } from "../utils/export.js";
import { ACTIONS } from "@/constants";
import NoRecordsView from "@/components/NoRecordsView.vue";

onMounted(async () => await fetchGroupMeetings());

const { exportToGroupMeetingInDOCX } = useExportStore();

const searchStore = useSearchStore();
const { filters } = storeToRefs(searchStore);

const groupMeetingsStore = useGroupMeetingsStore();
const { fetchGroupMeetings } = groupMeetingsStore;
const { groupMeetings, selectedGroupMeetings, dialog, groupMeeting } =
  storeToRefs(groupMeetingsStore);

function openDialog(action, data) {
  dialog.value.openDialog(action);
  groupMeeting.value = data;
}
</script>

<template>
  <DataTable
    v-if="groupMeetings.length"
    :value="groupMeetings"
    v-model:selection="selectedGroupMeetings"
    :filters="filters"
    :globalFilterFields="['theme', 'date']"
  >
    <Column selectionMode="multiple" />
    <Column
      v-for="column in GROUP_MEETINGS_COLUMNS"
      :key="column.field"
      :field="column.field"
      :header="column.header"
    />
    <Column>
      <template #body="{ data }">
        <div class="button_menu">
          <Button
            icon="pi pi-eye"
            text
            rounded
            @click="openDialog(ACTIONS.VIEW, data)"
          />
          <Button
            icon="pi pi-pencil"
            text
            rounded
            @click="openDialog(ACTIONS.EDIT, data)"
          />
          <Button
            @click="exportToGroupMeetingInDOCX(data)"
            icon="pi pi-file-word"
            severity="info"
            text
            rounded
          />
        </div>
      </template>
    </Column>
  </DataTable>
  <NoRecordsView class="grow" v-else />
</template>
