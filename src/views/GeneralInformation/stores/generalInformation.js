import { defineStore } from "pinia";
import ky from "ky";
import { ref } from "vue";
import { API_URL } from "@/constants";
import { useVuelidate } from "@vuelidate/core";
import studentFormRules from "@/validators/studentFormRules.js";
import { useConfirmStore } from "@/stores/confirms";

export const useGeneralInformationStore = defineStore(
  "generalInformation",
  () => {
    const { confirmEdit } = useConfirmStore();

    const student = ref({
      id: undefined,
      surname: undefined,
      name: undefined,
      patronymic: undefined,
      sex: undefined,
      Personaldatum: {
        studentId: undefined,
        birthday: undefined,
        reportCardNumber: undefined,
        phoneNumber: undefined,
        residentialAddress: undefined,
        SNILS: undefined,
        medicalPolicy: undefined,
      },
    });

    const v$ = useVuelidate(studentFormRules, student);

    const isEditForm = ref(true);

    const fetchStudent = async (id) => {
      const response = await ky.get(`${API_URL}/students/${id}`).json();
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
          await ky.put(`${API_URL}/students`, {
            json: student.value,
          });
          isEditForm.value = true;
        },
        funcReject: async () => {
          await fetchStudent(student.value.id);
          isEditForm.value = true;
          console.log("reject");
        },
      });
    };

    return { student, fetchStudent, editStudent, isEditForm, v$ };
  }
);
