import { computed, ref } from "vue";
import { defineStore } from "pinia";
import ky from "ky";

export const useGroupListStore = defineStore("groupList", () => {
  const loading = ref(false);
  const students = ref([]);

  const studentColumns = ref([
    { field: "gender", header: "Пол" },
    { field: "birthday", header: "Дата рождения" },
    { field: "phoneNumber", header: "Номер телефона" },
    { field: "residentialAddress", header: "Домашний адрес" },
    { field: "reportCardNumber", header: "Табельный номер" },
  ]);

  const selectedColumns = ref(studentColumns.value);

  const onToggle = (val) => {
    selectedColumns.value = studentColumns.value.filter((col) =>
      val.includes(col)
    );
  };

  const _visibleStudentForm = ref(false);

  const getVisibleStudentForm = computed(() => _visibleStudentForm);

  const openStudentForm = () => (_visibleStudentForm.value = true);

  const closeStudentForm = () => (_visibleStudentForm.value = false);

  const fetchStudents = async () => {
    loading.value = true;
    const response = await ky.get("http://localhost:5000/students").json();
    students.value = response;
    loading.value = false;
  };

  const fetchTestStudents = async () => {
    loading.value = true;
    const response = await ky
      .get("https://65f9714bdf1514524611a1fc.mockapi.io/journal/students")
      .json();

    students.value = response;
    loading.value = false;
  };

  return {
    students,
    studentColumns,
    selectedColumns,
    onToggle,
    getVisibleStudentForm,
    openStudentForm,
    closeStudentForm,
    fetchStudents,
    fetchTestStudents,
    loading,
  };
});
