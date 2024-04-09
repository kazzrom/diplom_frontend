<script setup>
import Toolbar from "primevue/toolbar";

import RelativeForm from "../modules/RelativeForm.vue";
import RelativeCard from "../modules/RelativeCard.vue";

import { useFamilySectionStore } from "@/stores/familySection";
import { ACTIONS } from "@/constants";

const store = useFamilySectionStore();
const { getIsShowDialog, getRelatives, openDialog, getHeaderForm } = store;

const isShowDialog = getIsShowDialog;
const header = getHeaderForm;
const relatives = getRelatives;
</script>
<template>
  <div class="wrapper">
    <Dialog modal v-model:visible="isShowDialog" :header="header">
      <RelativeForm />
    </Dialog>
    <Toolbar>
      <template #start>
        <div class="toolbar_start">
          <IconField iconPosition="left">
            <InputIcon class="pi pi-search" />
            <InputText placeholder="Поиск" />
          </IconField>
          <Button
            label="Добавить члена семьи"
            icon="pi pi-plus"
            icon-pos="right"
            @click="openDialog(ACTIONS.ADD)"
          />
        </div>
      </template>
    </Toolbar>
    <div class="relative-cards">
      <RelativeCard
        v-for="(relative, index) in relatives"
        :key="index"
        :relative="relative"
      />
    </div>
  </div>
</template>

<style scoped>
.relative-cards {
  @apply flex flex-col gap-14 px-14 pt-10;
}

.toolbar_start {
  @apply flex flex-row gap-5;
}
</style>
