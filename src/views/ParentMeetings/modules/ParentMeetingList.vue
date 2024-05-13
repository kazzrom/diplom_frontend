<script setup>
import { storeToRefs } from "pinia";
import { useParentMeetingsStore } from "../stores/parentMeetings.js";
import { useSearchStore } from "@/stores/search";
import NoRecordsView from "@/components/NoRecordsView.vue";
import { ACTIONS } from "@/constants";
import { onMounted } from "vue";
import { useAuthProvider } from "@/auth/stores/AuthContext.js";

onMounted(async () => {
  await fetchParentMeetings();
});

const store = useParentMeetingsStore();
const { fetchParentMeetings } = store;
const {
  parentMeeting,
  parentMeetings,
  dialog,
  selectedParentMeetings,
  isSubmit,
} = storeToRefs(store);

const searchStore = useSearchStore();
const { filters } = storeToRefs(searchStore);

const columns = [
  { field: "meetingDate", header: "Дата" },
  { field: "theme", header: "Тема" },
];

function openDialog(data, action) {
  parentMeeting.value = data;
  dialog.value.openDialog(action);

  if (action === ACTIONS.EDIT) {
    isSubmit.value = true;

    parentMeetings.value.forEach((meet) => {
      meet.FamilyMembers.forEach((member) => {
        delete member.AttendanceParentMeetings;
      });
    });
  }
}
</script>

<template>
  <DataTable
    v-if="parentMeetings.length"
    :value="parentMeetings"
    :filters="filters"
    :global-filter-fields="['theme', 'date']"
    v-model:selection="selectedParentMeetings"
  >
    <Column selection-mode="multiple" />
    <Column
      v-for="column in columns"
      :key="column.theme"
      :field="column.field"
      :header="column.header"
    />
    <Column>
      <template #body="slotProps">
        <Button
          @click="openDialog(slotProps.data, ACTIONS.VIEW)"
          icon="pi pi-eye"
          text
          rounded
        />
        <Button
          @click="openDialog(slotProps.data, ACTIONS.EDIT)"
          icon="pi pi-pencil"
          text
          rounded
        />
      </template>
    </Column>
  </DataTable>
  <NoRecordsView v-else />
</template>

<style scoped>
.wrapper {
  @apply flex flex-col;
}
</style>
