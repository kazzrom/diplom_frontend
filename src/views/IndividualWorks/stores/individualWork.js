import { ref } from "vue";
import { defineStore } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import individualWorkFormRules from "@/validators/individualWorkFormRules.js";
import ky from "ky";
import { API_URL } from "@/constants";
import { useConfirm } from "primevue/useconfirm";
import DialogForm from "@/utils/dialog";
import { useToast } from "primevue/usetoast";

export const useIndividualWorkStore = defineStore("individualWork", () => {
  const dialog = ref(
    new DialogForm({
      add: "Добавление записи",
      edit: "Редактирование записи",
      view: "Просмотр записи",
    })
  );

  const toast = useToast();
  const confirm = useConfirm();

  const columns = ref([
    { field: "workDate", header: "Дата" },
    { field: "participant", header: "С кем проведена беседа" },
    { field: "workContent", header: "Какие вопросы обсуждались" },
  ]);

  const individualWork = ref({
    workDate: "",
    participant: "",
    workContent: "",
  });

  const v$ = useVuelidate(individualWorkFormRules, individualWork);

  const studentId = ref();
  async function fetchIndividualWorks(id) {
    const response = await ky.get(`${API_URL}/individualWorks/${id}`).json();
    individualWorks.value = response;
    studentId.value = id;
  }

  const individualWorks = ref([]);

  function setEmptyIndividualWork() {
    individualWork.value = {
      workDate: "",
      participant: "",
      workContent: "",
    };
  }

  const isSubmit = ref(false);
  async function addIndividualWork() {
    isSubmit.value = true;
    if (!v$.value.$invalid) {
      const createdIndividualWork = await ky
        .post(`${API_URL}/individualWorks`, {
          json: { studentId: studentId.value, ...individualWork.value },
        })
        .json();
      individualWorks.value.push(createdIndividualWork);
      setEmptyIndividualWork();
      isSubmit.value = false;
      dialog.value.closeDialog();
      toast.add({
        severity: "success",
        summary: "Успех",
        detail: "Запись успешно добавлена",
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

  async function editIndividualWork() {
    await ky.put(`${API_URL}/individualWorks/${individualWork.value.id}`, {
      json: individualWork.value,
    });

    toast.add({
      severity: "info",
      summary: "Инфо",
      detail: "Запись успешно изменена",
      life: 2000,
    });

    await fetchIndividualWorks(studentId.value);
  }

  const confirmEditIndividualWork = () =>
    confirm.require({
      message: "Вы точно хотите изменить запись?",
      header: "Изменение записи",
      icon: "pi pi-info-circle",
      rejectLabel: "Отмена",
      acceptLabel: "Изменить",
      rejectClass: "p-button-secondary p-button-outlined",
      acceptClass: "p-button-info",
      accept: () => {
        if (v$.value.$invalid) {
          isSubmit.value = true;
          toast.add({
            severity: "warn",
            summary: "Предупреждение",
            detail: "Заполните все обязательные поля",
            life: 2000,
          });
          return;
        }
        editIndividualWork();
        dialog.value.closeDialog();
        isSubmit.value = false;
      },
      reject: () => {
        setEmptyIndividualWork();
        dialog.value.closeDialog();
      },
    });

  const selectedIndividualWorks = ref([]);

  function deleteSelectedIndividualWorks() {
    selectedIndividualWorks.value.forEach((individualWork) => {
      ky.delete(`${API_URL}/individualWorks/${individualWork.id}`);
      individualWorks.value = individualWorks.value.filter(
        (work) => work.id !== individualWork.id
      );
    });
    selectedIndividualWorks.value = [];
  }

  const confirmDeleteIndividualWorks = () =>
    confirm.require({
      message: "Вы точно хотите удалить выбранные работы?",
      header: "Удаление",
      icon: "pi pi-info-circle",
      rejectLabel: "Отмена",
      acceptLabel: "Удалить",
      rejectClass: "p-button-secondary p-button-outlined",
      acceptClass: "p-button-danger",
      accept: () => {
        deleteSelectedIndividualWorks();
        toast.add({
          severity: "success",
          summary: "Успех",
          detail: "Записи были успешно удалены",
          life: 2000,
        });
      },
      reject: () => {
        selectedIndividualWorks.value = [];
      },
    });

  return {
    columns,
    individualWorks,
    individualWork,
    addIndividualWork,
    v$,
    isSubmit,
    fetchIndividualWorks,
    confirmEditIndividualWork,
    confirmDeleteIndividualWorks,
    selectedIndividualWorks,
    dialog,
    setEmptyIndividualWork,
  };
});
