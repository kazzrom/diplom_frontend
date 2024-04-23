import { ref } from "vue";
import { defineStore } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import individualWorkFormRules from "@/validators/individualWorkFormRules.js";
import ky from "ky";
import { API_URL } from "@/constants";
import DialogForm from "@/utils/dialog";
import { useConfirmStore } from "@/stores/confirms";

export const useIndividualWorkStore = defineStore("individualWork", () => {
  const { confirmAdd, confirmEdit, confirmDelete } = useConfirmStore();
  const dialog = ref(
    new DialogForm({
      add: "Добавление записи",
      edit: "Редактирование записи",
      view: "Просмотр записи",
    })
  );

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
    confirmAdd({
      invalid: v$.value.$invalid,
      funcIf: async () => {
        const createdIndividualWork = await ky
          .post(`${API_URL}/individualWorks`, {
            json: { studentId: studentId.value, ...individualWork.value },
          })
          .json();
        individualWorks.value.push(createdIndividualWork);
        setEmptyIndividualWork();
        isSubmit.value = false;
        dialog.value.closeDialog();
      },
    });
  }

  async function editIndividualWork() {
    await ky.put(`${API_URL}/individualWorks/${individualWork.value.id}`, {
      json: individualWork.value,
    });

    await fetchIndividualWorks(studentId.value);
  }

  const confirmEditIndividualWork = () => {
    isSubmit.value = true;
    confirmEdit({
      invalid: v$.value.$invalid,
      funcAccept: async () => {
        await editIndividualWork();
        dialog.value.closeDialog();
        isSubmit.value = false;
      },
      funcReject: async () => {
        setEmptyIndividualWork();
        dialog.value.closeDialog();
      },
    });
  };

  const selectedIndividualWorks = ref([]);

  function deleteSelectedIndividualWorks() {
    selectedIndividualWorks.value.forEach(async (individualWork) => {
      await ky.delete(`${API_URL}/individualWorks/${individualWork.id}`);
      individualWorks.value = individualWorks.value.filter(
        (work) => work.id !== individualWork.id
      );
    });
    selectedIndividualWorks.value = [];
  }

  const confirmDeleteIndividualWorks = () =>
    confirmDelete({
      funcAccept: () => {
        deleteSelectedIndividualWorks();
      },
      funcReject: () => {
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
