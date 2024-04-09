<script setup>
import { storeToRefs } from "pinia";
import { useParentMeetingsStore } from "../stores/parentMeetings.js";
import DataView from "primevue/dataview";

import MeetingItem from "../components/MeetingItem.vue";
import NoRecordsItem from "../components/NoRecordsItem.vue";

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
  <div v-else class="none_items">
    <NoRecordsItem />
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col;
}

.none_items {
  @apply flex justify-center items-center;
}
</style>
