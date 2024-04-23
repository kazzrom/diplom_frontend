import { ref } from "vue";
import { defineStore } from "pinia";
import ky from "ky";
import { API_URL } from "@/constants";
import { useConfirmStore } from "@/stores/confirms";

export const useCharacteristicStore = defineStore("characteristic", () => {
  const { confirmEdit } = useConfirmStore();

  const studentAttitudes = ref({
    attitudeToStudy: undefined,
    attitudeToElders: undefined,
    attitudeToFailures: undefined,
    relationshipPeers: undefined,
  });

  const studentPersonality = ref({
    positiveSides: undefined,
    negativeSides: undefined,
    presenceOffenses: undefined,
    inclinations: undefined,
    leisure: undefined,
  });

  const studentId = ref();
  async function fetchStudentAttitudes(id) {
    const response = await ky.get(`${API_URL}/student-attitudes/${id}`).json();
    studentAttitudes.value = response;
    studentId.value = id;
  }

  async function fetchStudentPersonality(id) {
    const response = await ky
      .get(`${API_URL}/student-personalities/${id}`)
      .json();
    studentPersonality.value = response;
    studentId.value = id;
  }

  async function editStudentAttitudes() {
    await ky.put(`${API_URL}/student-attitudes/${studentAttitudes.value.id}`, {
      json: { studentId: studentId.value, ...studentAttitudes.value },
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
    await ky.put(
      `${API_URL}/student-personalities/${studentPersonality.value.id}`,
      {
        json: { studentId: studentId.value, ...studentPersonality.value },
      }
    );
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
    studentAttitudes,
    studentPersonality,
    fetchStudentAttitudes,
    fetchStudentPersonality,
    confirmEditAttitudes,
    confirmEditPersonality,
  };
});
