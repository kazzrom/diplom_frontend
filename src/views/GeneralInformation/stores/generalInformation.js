import { defineStore } from "pinia";
import ky from "ky";
import { ref } from "vue";
import { API_URL } from "@/constants";

export const useGeneralInformationStore = defineStore(
  "generalInformation",
  () => {
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

    const fetchStudent = async (id) => {
      const response = await ky.get(`${API_URL}/students/${id}`).json();
      console.log("response");
      student.value = response;
    };

    function editStudent() {
      console.log("editStudent");
    }

    return { student, fetchStudent, editStudent };
  }
);
