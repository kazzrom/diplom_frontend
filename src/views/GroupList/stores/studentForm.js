import { computed, ref } from "vue";
import { defineStore } from "pinia";
import DialogForm from "@/utils/dialog.js";
import { useGroupListStore } from "./groupList";
import studentFormRules from "@/validators/studentFormRules.js";
import { useVuelidate } from "@vuelidate/core";
import { useConfirmStore } from "@/stores/confirms";
import studentModel from "../models/student.js";
import { useAPIStore } from "../api/students.js";
import { useToastStore } from "@/stores/toasts";

export const useStudentFormStore = defineStore("studentForm", () => {
  const groupListStore = useGroupListStore();
  const { successToast, warningToast } = useToastStore();

  const API = useAPIStore();
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
    const response = await API.createStudent(student.value);
    groupListStore.students.push(response);
  }

  async function addStudent() {
    isSubmit.value = true;
    try {
      if (!v$.value.$invalid) {
        await addStudentApi();
        setEmptyForm();
        dialog.value.closeDialog();
        successToast("Студент был успешно добавлен");
        isSubmit.value = false;
      }
    } catch (error) {
      warningToast(error.response.data.error);
    }
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
