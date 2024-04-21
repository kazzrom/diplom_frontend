<script setup>
import { storeToRefs } from "pinia";
import { useParentMeetingsStore } from "../stores/parentMeetings.js";
import DataView from "primevue/dataview";

import MeetingItem from "../components/MeetingItem.vue";
import NoRecordsView from "@/components/NoRecordsView.vue";

const store = useParentMeetingsStore();
const { getParentMeetins } = store;
const { isNotNullParentMeetings } = storeToRefs(store);

const items = getParentMeetins;
</script>

<template>
  <DataView v-if="isNotNullParentMeetings" :value="items">
    <template #list="slotProps">
      <MeetingItem
        v-for="(meeting, index) in slotProps.items"
        :key="index"
        :meeting="meeting"
      />
    </template>
  </DataView>
  <NoRecordsView v-else />
</template>

<style scoped>
.wrapper {
  @apply flex flex-col;
}
</style>
