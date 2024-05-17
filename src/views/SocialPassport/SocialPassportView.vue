<script setup>
import ViewHeader from "@/components/ViewHeader.vue";
import Dropdown from "primevue/dropdown";
import { useRouter } from "vue-router";
import { useSocialPassportStore } from "./stores/store.js";
import { storeToRefs } from "pinia";

const router = useRouter();

const store = useSocialPassportStore();
const { items } = store;
const { selectedItem } = storeToRefs(store);

router.push(items[0].route);

function change(event) {
  router.push(event.value.route);
}
</script>

<template>
  <div class="wrapper">
    <ViewHeader>Социальный паспорт</ViewHeader>
    <main>
      <Dropdown
        v-model="selectedItem"
        :options="items"
        optionLabel="label"
        @change="change"
        placeholder="Выберите таблицу"
      />
      <RouterView class="grow" />
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col gap-5;
}

main {
  @apply flex flex-col px-5 gap-5 grow;
}
</style>
