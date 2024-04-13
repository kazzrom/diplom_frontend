import { defineStore } from "pinia";
import { computed, ref } from "vue";
import ky from "ky";
import { API_URL } from "@/constants";

export const useSocialPassportStore = defineStore("socialPassport", () => {
  const loading = ref(false);
  const students = ref([]);

  const getStudents = computed(() => students);
  const getOrphansColumns = computed(() => orphansColumns);

  async function fetchStudents(tableName) {
    loading.value = true;
    const response = await ky
      .get(`${API_URL}${tableName}`)
      .json();

    students.value = response;
    loading.value = false;
  }

  return { getOrphansColumns, fetchStudents, getStudents, loading };
});
