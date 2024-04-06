import { defineStore } from "pinia";
import { computed, ref } from "vue";
import ky from "ky";

export const useSocialPassportStore = defineStore("socialPassport", () => {
  const students = ref([]);

  const orphansColumns = [
    { field: "studentFullname", header: "ФИО студента" },
    { field: "relativeFullname", header: "ФИО родственника" },
    { field: "address", header: "Адрес проживания" },
    { field: "contacts", header: "Контакты" },
  ];

  const getStudents = computed(() => students);
  const getOrphansColumns = computed(() => orphansColumns);

  async function fetchOrphans() {
    const response = await ky
      .get("https://65f9714bdf1514524611a1fc.mockapi.io/journal/orphans")
      .json();

    students.value = response;
  }

  return { getOrphansColumns, fetchOrphans, getStudents };
});
