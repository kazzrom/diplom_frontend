<script setup>
import DataView from "primevue/dataview";
import Toolbar from "primevue/toolbar";
import MeetingItem from "@/views/ParentMeetings/components/MeetingItem.vue";
import NoRecordsItem from "@/components/NoRecordsItem.vue";
import { useParentMeetingsStore } from "@/stores/parentMeetings.js";
import ParentMeetingForm from "./modules/ParentMeetingForm.vue";

const store = useParentMeetingsStore();

const { getVisibleParentMeetingForm } = store;
const items = store.getParentMeetins;
</script>

<template>
  <div class="wrapper">
    <Dialog
      v-model:visible="getVisibleParentMeetingForm"
      modal
      header="Добавление родительского собрания"
    >
      <ParentMeetingForm />
    </Dialog>
    <header class="bg-white py-8">
      <h2 class="text-4xl font-medium ml-10">Родительские собрания</h2>
    </header>
    <Toolbar>
      <template #start>
        <div class="toolbar_start">
          <IconField iconPosition="left">
            <InputIcon class="pi pi-search"> </InputIcon>
            <InputText placeholder="Поиск" />
          </IconField>
          <Button
            label="Добавить"
            icon="pi pi-plus"
            icon-pos="right"
            @click="store.openParentMeetingForm"
          />
        </div>
      </template>
    </Toolbar>
    <DataView v-if="store.isNotNullParentMeetings" :value="items">
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
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col;
}

.none_items {
  @apply grow flex justify-center items-center;
}

.toolbar_start {
  @apply flex flex-row gap-5;
}
</style>
