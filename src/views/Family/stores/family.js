import { defineStore } from "pinia";
import { computed, ref } from "vue";
import DialogForm from "@/utils/dialog";
import ky from "ky";
import { API_URL } from "@/constants";
import { useConfirm } from "primevue/useconfirm";
import { useVuelidate } from "@vuelidate/core";
import relativeFormRules from "@/validators/relativeFormRules.js";
import { useToast } from "primevue/usetoast";

export const useFamilySectionStore = defineStore("familySection", () => {
  const toast = useToast();
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

  const v$ = useVuelidate(
    computed(() => relativeFormRules),
    relative
  );

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

  async function fetchRelative(id) {
    const response = await ky.get(`${API_URL}/relatives/${id}`).json();
    relative.value = response;
  }
  async function fetchRelatives(id) {
    const response = await ky.get(`${API_URL}/family/${id}`).json();
    relatives.value = response;
    studentId.value = id;
  }

  const isSubmit = ref(false);
  async function addRelative() {
    isSubmit.value = true;
    if (!v$.value.$invalid) {
      const newRelative = await ky
        .post(`${API_URL}/relatives`, {
          json: { relative: relative.value, studentId: studentId.value },
        })
        .json();
      relatives.value.push(newRelative);
      dialog.value.closeDialog();
      isSubmit.value = false;
      toast.add({
        severity: "success",
        summary: "Успех",
        detail: "Родственник успешно добавлен",
        life: 2000,
      });
    } else {
      toast.add({
        severity: "warn",
        summary: "Предупреждение",
        detail: "Заполните все обязательные поля",
        life: 2000,
      });
    }
  }

  async function editRelative() {
    await ky.put(`${API_URL}/relatives/${relative.value.id}`, {
      json: relative.value,
    });
    await fetchRelatives(studentId.value);
    dialog.value.closeDialog();
    isSubmit.value = false;
    toast.add({
      severity: "info",
      summary: "Инфо",
      detail: "Данные о родственнике успешно изменены",
      life: 2000,
    });
  }

  const confirmEditRelative = () => {
    confirm.require({
      message: "Сохранить изменения?",
      header: "Изменение родственника",
      icon: "pi pi-info-circle",
      rejectLabel: "Отмена",
      acceptLabel: "Изменить",
      rejectClass: "p-button-secondary p-button-outlined",
      acceptClass: "p-button-info",
      accept: async () => {
        if (v$.value.$invalid) {
          toast.add({
            severity: "warn",
            summary: "Предупреждение",
            detail: "Заполните все обязательные поля",
            life: 2000,
          });
          return;
        }
        editRelative();
      },
      reject: () => {
        fetchRelative(relative.value.id);
        dialog.value.closeDialog();
      },
    });
  };

  async function deleteRelative(id) {
    relatives.value = relatives.value.filter((relative) => relative.id !== id);
    await ky.delete(`${API_URL}/relatives/${id}`);
    toast.add({
      severity: "success",
      summary: "Успех",
      detail: "Родственник успешно удален",
      life: 2000,
    });
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
    confirmEditRelative,
    confirmDeleteRelative,
    fetchRelatives,
    clearForm,
    v$,
    isSubmit,
  };
});
