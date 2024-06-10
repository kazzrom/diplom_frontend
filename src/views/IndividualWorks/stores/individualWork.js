import { ref } from "vue";
import { defineStore } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import individualWorkFormRules from "@/validators/individualWorkFormRules.js";
import * as API from "../api/individualWorks.js";
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

  const individualWork = ref({
    workDate: "",
    participant: "",
    workContent: "",
  });

  const v$ = useVuelidate(individualWorkFormRules, individualWork);

  const studentId = ref();
  async function fetchIndividualWorks(id) {
    const response = await API.getAllIndividualWorksByStudentId(id);
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
        const createdIndividualWork = await API.addIndividualWork({
          studentId: studentId.value,
          ...individualWork.value,
        });
        individualWorks.value.push(createdIndividualWork);
        setEmptyIndividualWork();
        isSubmit.value = false;
        dialog.value.closeDialog();
      },
    });
  }

  async function editIndividualWork() {
    await API.updateIndividualWork({
      id: individualWork.value.id,
      data: individualWork.value,
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
        await fetchIndividualWorks(studentId.value);
        dialog.value.closeDialog();
      },
    });
  };

  const selectedIndividualWorks = ref([]);

  function deleteSelectedIndividualWorks() {
    selectedIndividualWorks.value.forEach(async (individualWork) => {
      await API.deleteIndividualWork(individualWork.id);
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

