import { computed, ref } from "vue";
import { defineStore } from "pinia";
import DialogForm from "@/utils/dialog.js";
import ky from "ky";
import { API_URL, GROUP_ID } from "@/constants";
import { useGroupListStore } from "./groupList";
import studentFormRules from "@/validators/studentFormRules.js";
import { useVuelidate } from "@vuelidate/core";
import { useConfirmStore } from "@/stores/confirms";

export const useStudentFormStore = defineStore("studentForm", () => {
  const groupListStore = useGroupListStore();
  const { confirmAdd } = useConfirmStore();
  const dialog = ref(
    new DialogForm({
      add: "Добавление студента",
      edit: "",
      view: "",
    })
  );

  const student = ref({
    surname: undefined,
    name: undefined,
    patronymic: undefined,
    fullname: computed(
      () =>
        `${student.value.surname} ${student.value.name} ${student.value.patronymic}`
    ),
    sex: undefined,
    groupId: GROUP_ID,
    Personaldatum: {
      birthday: undefined,
      reportCardNumber: undefined,
      phoneNumber: undefined,
      residentialAddress: undefined,
      SNILS: undefined,
      medicalPolicy: undefined,
    },
  });

  const v$ = useVuelidate(
    computed(() => studentFormRules),
    student
  );

  const isSubmit = ref(false);

  async function addStudentApi() {
    const createdStudent = await ky
      .post(`${API_URL}/students`, {
        json: student.value,
      })
      .json();

    groupListStore.students.push(createdStudent);
  }

  async function addStudent() {
    isSubmit.value = true;
    confirmAdd({
      invalid: v$.value.$invalid,
      funcIf: async () => {
        await addStudentApi();
        setEmptyForm();
        dialog.value.closeDialog();
        isSubmit.value = false;
      },
    });
  }

  function setEmptyForm() {
    student.value = {
      surname: undefined,
      name: undefined,
      patronymic: undefined,
      fullname: computed(
        () =>
          `${student.value.surname} ${student.value.name} ${student.value.patronymic}`
      ),
      sex: undefined,
      groupId: GROUP_ID,
      Personaldatum: {
        birthday: undefined,
        reportCardNumber: undefined,
        phoneNumber: undefined,
        residentialAddress: undefined,
        SNILS: undefined,
        medicalPolicy: undefined,
      },
    };
  }

  return {
    dialog,
    student,
    addStudent,
    v$,
    isSubmit,
  };
});
