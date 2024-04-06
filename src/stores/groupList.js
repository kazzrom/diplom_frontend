import { computed, ref } from "vue";
import { defineStore } from "pinia";
import ky from "ky";

export const useGroupListStore = defineStore("groupList", () => {
  const students = ref([]);

  const studentColumns = [
    { field: "gender", header: "Пол" },
    { field: "birthday", header: "Дата рождения" },
    { field: "phoneNumber", header: "Номер телефона" },
    { field: "residentialAddress", header: "Домашний адрес" },
    { field: "reportCardNumber", header: "Табельный номер" },
  ];

  const visibleStudentForm = ref(false);

  const getStudents = computed(() => students);

  const getStudentsColumns = computed(() => studentColumns);

  const getVisibleStudentForm = computed(() => visibleStudentForm);

  const openStudentForm = () => (visibleStudentForm.value = true);

  const closeStudentForm = () => (visibleStudentForm.value = false);

  const fetchStudents = async () => {
    const response = await ky.get("http://localhost:5000/students").json();
    students.value = response;
  };

  const fetchTestStudents = async () => {
    const response = await ky
      .get("https://65f9714bdf1514524611a1fc.mockapi.io/journal/students")
      .json();

    students.value = response;
  };

  return {
    getVisibleStudentForm,
    getStudents,
    getStudentsColumns,
    openStudentForm,
    closeStudentForm,
    fetchStudents,
    fetchTestStudents,
  };
});
