import { computed, ref } from "vue";
import { defineStore } from "pinia";
import DialogForm from "@/utils/dialog.js";
import { useGroupListStore } from "./groupList";
import studentFormRules from "@/validators/studentFormRules.js";
import { useVuelidate } from "@vuelidate/core";
import { useConfirmStore } from "@/stores/confirms";
import studentModel from "../models/student.js";
import * as API from "../api/students.js";

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

  const student = ref(studentModel.fields);

  const v$ = useVuelidate(
    computed(() => studentFormRules),
    student
  );

  const isSubmit = ref(false);

  async function addStudentApi() {
    await API.createStudent(student.value);
    student.value.fullname =
      student.value.surname +
      " " +
      student.value.name +
      " " +
      student.value.patronymic;
    groupListStore.students.push(student.value);
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
    student.value = studentModel.fields;
  }

  return {
    dialog,
    student,
    addStudent,
    v$,
    isSubmit,
  };
});
