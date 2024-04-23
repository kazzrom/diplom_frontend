import { ref } from "vue";
import { defineStore } from "pinia";
import ky from "ky";
import { API_URL } from "@/constants";
import { useToast } from "primevue/usetoast";

export const useCharacteristicStore = defineStore("characteristic", () => {
  const toast = useToast();

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
    await ky
      .put(`${API_URL}/student-attitudes/${studentAttitudes.value.id}`, {
        json: { studentId: studentId.value, ...studentAttitudes.value },
      })
      .json();
    toast.add({
      severity: "info",
      summary: "Инфо",
      detail: "Данные об отношениях успешно изменены",
      life: 2000,
    });
  }

  async function editStudentPersonality() {
    await ky
      .put(`${API_URL}/student-personalities/${studentPersonality.value.id}`, {
        json: { studentId: studentId.value, ...studentPersonality.value },
      })
      .json();
    toast.add({
      severity: "info",
      summary: "Инфо",
      detail: "Данные об личности успешно изменены",
      life: 2000,
    });
  }

  return {
    studentAttitudes,
    studentPersonality,
    fetchStudentAttitudes,
    fetchStudentPersonality,
    editStudentAttitudes,
    editStudentPersonality,
  };
});
