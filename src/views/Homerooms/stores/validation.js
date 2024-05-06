import { computed, ref } from "vue";
import { defineStore } from "pinia";
import useVuelidate from "@vuelidate/core";
import { useHomeroomStore } from "./homeroom";
import homeroomRules from "@/validators/homeroomRules.js";

export const useValidationStore = defineStore("validation", () => {
  const homeroomStore = useHomeroomStore();

  const v$ = useVuelidate(
    computed(() => homeroomRules),
    homeroomStore.homeroom
  );

  return { v$ };
});
