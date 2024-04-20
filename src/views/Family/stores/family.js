import { defineStore } from "pinia";
import { computed, ref } from "vue";
import DialogForm from "@/utils/dialog";

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

  function addRelative() {
    dialog.value.closeDialog();
  }

  function editRelative() {
    dialog.value.closeDialog();
  }

  return {
    dialog,
    relative,
    relatives,
    kinships,
    addRelative,
    editRelative,
  };
});
