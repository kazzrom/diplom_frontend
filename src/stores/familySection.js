import { ACTIONS } from "@/constants";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useFamilySectionStore = defineStore("familySection", () => {
  const dialogAction = ref(ACTIONS.VIEW);
  const getAction = computed(() => dialogAction);

  const relative = ref({
    name: "",
    surname: "",
    patronymic: "",
    phoneNumber: "",
    workPlace: "",
    jobTitle: "",
    kinship: "",
  });

  const kinships = ref([
    "Отец",
    "Мать",
    "Бабушка",
    "Дедушка",
    "Опекун",
    "Сестра",
    "Брат",
  ]);

  const relatives = ref([
    {
      id: 1,
      name: "Фёдор",
      surname: "Молчанов",
      patronymic: "Глебович",
      phoneNumber: "+79122717256",
      workPlace: "Кухня",
      jobTitle: "Повар",
      kinship: "Отец",
    },
    {
      id: 2,
      name: "Ясмина",
      surname: "Молчанова",
      patronymic: "Тимуровна",
      phoneNumber: "+79122717256",
      workPlace: "Кухня",
      jobTitle: "Повар",
      kinship: "Мать",
    },
  ]);

  const isShowDialog = ref(false);

  const getIsShowDialog = computed(() => isShowDialog);

  const getRelatives = computed(() => relatives);

  const headerForm = ref("");
  function setHeaderForm() {
    switch (dialogAction.value) {
      case ACTIONS.ADD:
        headerForm.value = "Добавление члена семьи";
        break;
      case ACTIONS.EDIT:
        headerForm.value = "Редактирование члена семьи";
        break;
      default:
        headerForm.value = "Просмотр информации";
        break;
    }
  }
  const getHeaderForm = computed(() => headerForm);

  const openDialog = (action) => {
    dialogAction.value = action;
    setHeaderForm();
    isShowDialog.value = true;
  };

  const closeDialog = () => (isShowDialog.value = false);

  function AddRelative() {}
  function EditRelative() {}

  function getByIdRelative(id) {
    return relatives.value.find((relative) => relative.id === id);
  }

  return {
    getIsShowDialog,
    getRelatives,
    openDialog,
    closeDialog,
    relative,
    selectedKinship,
    kinships,
    getByIdRelative,
    getAction,
    getHeaderForm,
  };
});
