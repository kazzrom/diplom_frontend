import { ref, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import homeroomRules from "@/validators/homeroomRules.js";
import { defineStore } from "pinia";
import * as API from "../api/homerooms.js";
import homeroomModel from "../models/homeroom.js";

export const useHomeroomStore = defineStore("homeroom", () => {
  const homeroom = ref(homeroomModel.fields);

  const v$ = useVuelidate(
    computed(() => homeroomRules),
    homeroom
  );

  function resetHomeroom() {
    homeroom.value = homeroomModel.fields;
  }

  const selectedHomerooms = ref([]);

  function resetSelectedHomerooms() {
    selectedHomerooms.value = [];
  }

  const homerooms = ref([]);

  async function fetchHomerooms() {
    homerooms.value = await API.getHomerooms();
  }

  async function createHomeroom() {
    const newHomeroom = await API.createHomeroom(homeroom.value);
    homerooms.value.push(newHomeroom);
  }

  async function updateHomeroom() {
    await API.updateHomeroom(homeroom.value);
  }

  async function deleteHomeroom(id) {
    await API.deleteHomeroom(id);
  }

  async function deleteSelectedHomerooms() {
    const ids = selectedHomerooms.value.map((homeroom) => homeroom.id);

    ids.forEach(async (id) => {
      await deleteHomeroom(id);
    });

    homerooms.value = homerooms.value.filter(
      (homeroom) => !selectedHomerooms.value.includes(homeroom)
    );

    resetSelectedHomerooms();
  }

  return {
    homeroom,
    v$,
    selectedHomerooms,
    homerooms,
    resetHomeroom,
    resetSelectedHomerooms,
    fetchHomerooms,
    createHomeroom,
    updateHomeroom,
    deleteHomeroom,
    deleteSelectedHomerooms,
  };
});
