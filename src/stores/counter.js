import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCounterStore = defineStore("counter", () => {
  const counter = ref(0);
  const getCounter = computed(() => counter);
  const increment = () => counter.value++;

  return { getCounter, increment };
});
