import { ref } from "vue";
import { defineStore } from "pinia";
import * as API from "../api/characteristics.js";
import { useConfirmStore } from "@/stores/confirms";
import characteristicModel from "../models/characteristic.js";

export const useCharacteristicStore = defineStore("characteristic", () => {
  const { confirmEdit } = useConfirmStore();

  const characteristic = ref(characteristicModel.fields);
  const studentId = ref(null);

  async function fetchCharacteristicByStudentId(id) {
    const response = await API.fetchCharacteristicByStudentId(id);
    characteristic.value = response;
    characteristic.value.inclinations = response.inclinations.map(
      (inclination) => inclination.name
    );
    characteristic.value.hobbies = response.hobbies.map((hobby) => hobby.name);
    studentId.value = id;
  }

  async function editStudentAttitudes() {
    await API.updateStudentAttitudesByStudentId({
      studentId: studentId.value,
      studentAttitudes: characteristic.value.studentAttitudes,
    });
  }

  async function confirmEditAttitudes() {
    confirmEdit({
      invalid: false,
      funcAccept: async () => {
        await editStudentAttitudes();
      },
    });
  }

  async function editStudentPersonality() {
    await API.updateStudentPersonalityByStudentId({
      studentId: studentId.value,
      studentPersonality: characteristic.value.studentPersonality,
      hobbies: characteristic.value.hobbies,
      inclinations: characteristic.value.inclinations,
    });
  }

  async function confirmEditPersonality() {
    confirmEdit({
      invalid: false,
      funcAccept: async () => {
        await editStudentPersonality();
      },
    });
  }

  return {
    characteristic,
    fetchCharacteristicByStudentId,
    confirmEditAttitudes,
    confirmEditPersonality,
  };
});
