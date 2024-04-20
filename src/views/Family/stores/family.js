import { defineStore } from "pinia";
import { computed, ref } from "vue";
import DialogForm from "@/utils/dialog";
import ky from "ky";
import { API_URL } from "@/constants";
import { useConfirm } from "primevue/useconfirm";

export const useFamilySectionStore = defineStore("familySection", () => {
  const dialog = ref(
    new DialogForm({
      add: "Добавление члена семьи",
      edit: "Редактирование информации",
      view: "Просмотр информации",
    })
  );

  const relative = ref({
    name: "",
    surname: "",
    patronymic: "",
    phoneNumber: "",
    workplace: "",
    post: "",
    kinship: "",
  });

  function clearForm() {
    relative.value = {
      name: "",
      surname: "",
      patronymic: "",
      phoneNumber: "",
      workplace: "",
      post: "",
      kinship: "",
    };
  }

  const kinships = ref([
    "Отец",
    "Мать",
    "Бабушка",
    "Дедушка",
    "Опекун",
    "Сестра",
    "Брат",
  ]);

  const relatives = ref([]);

  const studentId = ref();
  async function fetchRelatives(id) {
    const response = await ky.get(`${API_URL}/family/${id}`).json();
    relatives.value = response;
    studentId.value = id;
  }

  async function addRelative() {
    const newRelative = await ky
      .post(`${API_URL}/family`, {
        json: { relative: relative.value, studentId: studentId.value },
      })
      .json();
    relatives.value.push(newRelative);
    dialog.value.closeDialog();
  }

  function editRelative() {
    dialog.value.closeDialog();
  }

  async function deleteRelative(id) {
    await ky.delete(`${API_URL}/family/${id}`);
    relatives.value = relatives.value.filter((relative) => relative.id !== id);
  }

  const confirm = useConfirm();

  const confirmDeleteRelative = (id) => {
    confirm.require({
      message: "Вы точно хотите удалить данного родственника?",
      header: "Удаление",
      icon: "pi pi-info-circle",
      rejectLabel: "Отмена",
      acceptLabel: "Удалить",
      rejectClass: "p-button-secondary p-button-outlined",
      acceptClass: "p-button-danger",
      accept: () => {
        deleteRelative(id);
      },
      reject: () => {},
    });
  };

  return {
    dialog,
    relative,
    relatives,
    kinships,
    addRelative,
    editRelative,
    confirmDeleteRelative,
    fetchRelatives,
    clearForm,
  };
});
