import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import ky from "ky";
import { TABLE_API_URL } from "@/utils/tables";

export const useSocialPassportStore = defineStore("socialPassport", () => {
  const loading = ref(false);
  const students = ref([]);

  const getStudents = computed(() => students);
  const getOrphansColumns = computed(() => orphansColumns);

  async function fetchStudents(tableName) {
    loading.value = true;
    const response = await ky
      .get(`https://65f9714bdf1514524611a1fc.mockapi.io/journal/${tableName}`)
      .json();

    students.value = response;
    loading.value = false;
  }

  return { getOrphansColumns, fetchStudents, getStudents, loading };
});
