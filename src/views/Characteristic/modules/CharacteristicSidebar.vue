<script setup>
import { storeToRefs } from "pinia";
import { useGeneralInformationStore } from "@/views/GeneralInformation/stores/generalInformation.js";
import { useCharacteristicStore } from "../stores/characteristic.js";
import { exportToCharacteristicInDOCX } from "../utils/export.js";
import Menu from "primevue/menu";
import MenuItem from "@/components/Menu/MenuItem.vue";

const store = useGeneralInformationStore();
const characteristicStore = useCharacteristicStore();
const { student } = storeToRefs(store);
const { characteristic } = storeToRefs(characteristicStore);

const items = [
  { label: "Отношения обучающегося", route: { name: "Relationship" } },
  { label: "Личность обучающегося", route: { name: "Personality" } },
];
</script>

<template>
  <div class="sidebar_wrapper">
    <Menu :model="items">
      <template #item="{ item, props }">
        <MenuItem :item="item" :props="props" />
      </template>
    </Menu>
    <Button
      @click="exportToCharacteristicInDOCX(student, characteristic)"
      label="Экспорт в DOCX"
      severity="info"
      icon="pi pi-file-word"
      iconPos="right"
    />
  </div>
</template>

<style scoped>
.sidebar_wrapper {
  @apply flex flex-col gap-3;
}
</style>
