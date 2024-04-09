<script setup>
import { storeToRefs } from "pinia";
import { useParentMeetingsStore } from "@/stores/parentMeetings.js";
import DataView from "primevue/dataview";
import Toolbar from "primevue/toolbar";
import MeetingItem from "../components/MeetingItem.vue";
import NoRecordsItem from "../components/NoRecordsItem.vue";

const store = useParentMeetingsStore();
const { getParentMeetins, openParentMeetingForm } = store;
const { isNotNullParentMeetings } = storeToRefs(store);

const items = getParentMeetins;
</script>

<template>
  <Toolbar>
    <template #start>
      <div class="toolbar_start">
        <IconField iconPosition="left">
          <InputIcon class="pi pi-search" />
          <InputText placeholder="Поиск" />
        </IconField>
        <Button
          label="Добавить"
          icon="pi pi-plus"
          icon-pos="right"
          @click="openParentMeetingForm"
        />
      </div>
    </template>
  </Toolbar>
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

.toolbar_start {
  @apply flex flex-row gap-5;
}

.none_items {
  @apply flex justify-center items-center;
}
</style>
