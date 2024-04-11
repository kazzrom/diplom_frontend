import { defineStore } from "pinia";
import { FilterMatchMode } from "primevue/api";
import { ref } from "vue";

export const useSearchStore = defineStore("search", () => {
  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  return { filters };
});
