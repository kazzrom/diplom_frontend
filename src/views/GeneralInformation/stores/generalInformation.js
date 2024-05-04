import { ref } from "vue";
import { defineStore } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import studentFormRules from "@/validators/studentFormRules.js";
import { useConfirmStore } from "@/stores/confirms";
import studentModel from "@/views/GroupList/models/student.js";
import * as API from "../api/students.js";

export const useGeneralInformationStore = defineStore(
  "generalInformation",
  () => {
    const { confirmEdit } = useConfirmStore();

    const student = ref(studentModel.fields);

    const v$ = useVuelidate(studentFormRules, student);

    const isEditForm = ref(true);

    const fetchStudent = async (id) => {
      const response = await API.getStudentById(id);
      student.value = response;
    };

    async function editStudent() {
      if (!isEditForm.value) {
        confirmEditStudent();
      }
      isEditForm.value = false;
    }

    const confirmEditStudent = () => {
      confirmEdit({
        invalid: v$.value.$invalid,
        funcAccept: async () => {
          await API.updateStudent(student.value.id, student.value);
          isEditForm.value = true;
        },
        funcReject: async () => {
          await fetchStudent(student.value.id);
          isEditForm.value = true;
        },
      });
    };

    return { student, fetchStudent, editStudent, isEditForm, v$ };
  }
);
