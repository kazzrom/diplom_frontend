<script setup>
import Toolbar from "primevue/toolbar";
import SearchInput from "../components/SearchInput.vue";
import { storeToRefs } from "pinia";
import { useHomeroomStore } from "../stores/homeroom";
import { useCRUDStore } from "../stores/CRUD.js";
import { ACTIONS } from "@/constants";

const homeroomStore = useHomeroomStore();
const { selectedHomerooms } = storeToRefs(homeroomStore);

const crudStore = useCRUDStore();
const { deleteHomerooms } = crudStore;
const { dialog } = storeToRefs(crudStore);
</script>

<template>
  <Toolbar>
    <template #start>
      <SearchInput />
    </template>
    <template #end>
      <div class="toolbar_buttons">
        <Button
          label="Добавить протокол"
          icon="pi pi-plus"
          iconPos="right"
          @click="dialog.openDialog(ACTIONS.ADD)"
        />
        <Button
          label="Удалить выбранные протоколы"
          icon="pi pi-trash"
          iconPos="right"
          :disabled="!selectedHomerooms.length"
          @click="deleteHomerooms"
        />
      </div>
    </template>
  </Toolbar>
</template>

<style scoped>
.toolbar_buttons {
  @apply flex flex-row gap-3;
}
</style>
