<script setup>
import Toolbar from "primevue/toolbar";

import RelativeForm from "../modules/RelativeForm.vue";
import RelativeCard from "../modules/RelativeCard.vue";

import { useFamilySectionStore } from "@/stores/familySection";
import { ACTIONS } from "@/constants";
import { storeToRefs } from "pinia";

const store = useFamilySectionStore();
const { getRelatives } = store;
const relatives = getRelatives;
const { dialog } = storeToRefs(store);
</script>
<template>
  <div class="wrapper">
    <Dialog
      v-model:visible="dialog.isShowDialog"
      :header="dialog.currentHeader"
      modal
    >
      <RelativeForm />
    </Dialog>
    <Toolbar class="px-5">
      <template #start>
        <div class="toolbar_start">
          <Button
            label="Добавить члена семьи"
            icon="pi pi-plus"
            icon-pos="right"
            @click="dialog.openDialog(ACTIONS.ADD)"
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
  @apply flex flex-row;
}
</style>
