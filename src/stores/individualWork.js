import { ref } from "vue";
import { defineStore } from "pinia";

export const useIndividualWorkStore = defineStore("individualWork", () => {
  const columns = ref([
    { field: "workDate", header: "Дата" },
    { field: "participant", header: "С кем проведена беседа" },
    { field: "questions", header: "Какие вопросы обсуждались" },
  ]);

  const individualWork = ref({
    workDate: "",
    participant: "",
    questions: "",
  });

  const individualWorks = ref([
    {
      workDate: "11.02.2022",
      participant: "Березина Мария Данииловна",
      questions: "Успеваемость обучающего на первый семестр",
    },
    {
      workDate: "11.02.2022",
      participant: "Березина Мария Данииловна",
      questions: undefined,
    },
  ]);

  function NoneEmpty(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === "") return false;
    }
    return true;
  }

  function addIndividualWork() {
    if (NoneEmpty(Object.values(individualWork.value))) {
      individualWorks.value.push(individualWork.value);
      individualWork.value = {
        workDate: "",
        participant: "",
        questions: "",
      };
    }
  }

  return { columns, individualWorks, individualWork, addIndividualWork };
});
