import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import ky from "ky";
import { useConfirm } from "primevue/useconfirm";
import { API_URL } from "@/constants";

export const useGroupListStore = defineStore("groupList", () => {
  const router = useRouter();

  const loading = ref(false);

  const students = ref([]);

  const studentColumns = ref([
    { field: "Personaldatum.birthday", header: "Дата рождения", minWidth: 200 },
    {
      field: "Personaldatum.phoneNumber",
      header: "Номер телефона",
      minWidth: 200,
    },
    {
      field: "Personaldatum.residentialAddress",
      header: "Домашний адрес",
      minWidth: 300,
    },
    {
      field: "Personaldatum.reportCardNumber",
      header: "Табельный номер",
      minWidth: 200,
    },
    { field: "Personaldatum.SNILS", header: "СНИЛС", minWidth: 150 },
    {
      field: "Personaldatum.medicalPolicy",
      header: "Медицинский полис",
      minWidth: 200,
    },
  ]);

  const selectedColumns = ref(studentColumns.value);

  const onToggle = (val) => {
    selectedColumns.value = studentColumns.value.filter((col) =>
      val.includes(col)
    );
  };

  const fetchStudents = async () => {
    loading.value = true;
    const response = await ky.get(`${API_URL}/students`).json();
    students.value = response;
    loading.value = false;
  };

  function openProfile(event) {
    router.push({ name: "Profile", params: { id: event.data.id } });
  }

  const selectedStudents = ref([]);

  async function deleteStudents() {
    const ids = selectedStudents.value.map((student) => student.id);

    ids.forEach(async (id) => {
      students.value = students.value.filter((stud) => stud.id !== id);
      const answer = await ky.delete(`${API_URL}/students/${id}`).json();
      console.log(answer);
    });

    selectedStudents.value = [];
  }

  const confirm = useConfirm();

  const confirmDeleteStudents = () => {
    confirm.require({
      message: "Вы точно хотите удалить выбранных студентов?",
      header: "Удаление",
      icon: "pi pi-info-circle",
      rejectLabel: "Отмена",
      acceptLabel: "Удалить",
      rejectClass: "p-button-secondary p-button-outlined",
      acceptClass: "p-button-danger",
      accept: () => {
        deleteStudents();
      },
      reject: () => {
        selectedStudents.value = [];
      },
    });
  };

  return {
    students,
    selectedStudents,
    studentColumns,
    selectedColumns,
    onToggle,
    fetchStudents,
    loading,
    openProfile,
    confirmDeleteStudents,
  };
});
