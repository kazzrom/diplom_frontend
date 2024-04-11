<script setup>
import Toolbar from "primevue/toolbar";
import ScrollPanel from "primevue/scrollpanel";

import RelativeForm from "./modules/RelativeForm.vue";
import RelativeCard from "./modules/RelativeCard.vue";

import { useFamilySectionStore } from "./stores/family.js";
import { ACTIONS } from "@/constants";
import { storeToRefs } from "pinia";

const store = useFamilySectionStore();
const { dialog, relatives } = storeToRefs(store);
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
    <ScrollPanel>
      <div class="relative-cards">
        <RelativeCard
          v-for="(relative, index) in relatives"
          :key="index"
          :relative="relative"
        />
      </div>
    </ScrollPanel>
  </div>
</template>

<style scoped>
.relative-cards {
  @apply flex flex-col;
}

.toolbar_start {
  @apply flex flex-row;
}
</style>
