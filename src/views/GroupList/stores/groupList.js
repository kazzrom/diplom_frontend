import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import ky from "ky";
import DialogForm from "@/utils/dialog.js";
import { useConfirm } from "primevue/useconfirm";

export const useGroupListStore = defineStore("groupList", () => {
  const dialog = ref(
    new DialogForm({
      add: "Добавление студента",
      edit: "",
      view: "",
    })
  );

  const router = useRouter();

  const loading = ref(false);

  const student = ref({
    name: "",
    surname: "",
    patronymic: "",
    residentialAddress: "",
    phoneNumber: "",
    birthday: NaN,
    reportCardNumber: "",
    SNILS: "",
    medicalPolicy: "",
  });

  const students = ref([]);

  const studentColumns = ref([
    { field: "gender", header: "Пол" },
    { field: "birthday", header: "Дата рождения" },
    { field: "phoneNumber", header: "Номер телефона" },
    { field: "residentialAddress", header: "Домашний адрес" },
    { field: "reportCardNumber", header: "Табельный номер" },
  ]);

  const selectedColumns = ref(studentColumns.value);

  const getStudents = computed(() => students);
  const getStudentColumns = computed(() => studentColumns);

  const onToggle = (val) => {
    selectedColumns.value = studentColumns.value.filter((col) =>
      val.includes(col)
    );
  };

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

  function openProfile(event) {
    router.push({ name: "Profile", params: { id: Number(event.data.id) } });
  }

  function addStudent() {
    dialog.value.closeDialog();
  }

  const selectedStudents = ref([]);

  async function deleteStudents() {
    const ids = selectedStudents.value.map((student) => student.id);

    ids.forEach(async (id) => {
      students.value = students.value.filter((stud) => stud.id !== id);
      const answer = await ky
        .delete(
          `https://65f9714bdf1514524611a1fc.mockapi.io/journal/students/${id}`
        )
        .json();
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
    });
  };

  return {
    dialog,
    student,
    selectedStudents,
    getStudents,
    selectedColumns,
    getStudentColumns,
    onToggle,
    fetchStudents,
    fetchTestStudents,
    loading,
    openProfile,
    addStudent,
    confirmDeleteStudents,
  };
});
