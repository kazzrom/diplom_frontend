import { defineStore } from "pinia";
import ky from "ky";
import { computed, ref } from "vue";

export const useGeneralInformationStore = defineStore(
  "generalInformation",
  () => {
    const student = ref({
      name: "",
      surname: "",
      patronymic: "",
      residentialAddress: "",
      phoneNumber: "",
      birthday: NaN,
      reportCardNumber: "",
      SNILS: "",
      medicalPolicy: "",
    });

    const fetchTestStudent = async (id) => {
      const response = await ky
        .get(
          `https://65f9714bdf1514524611a1fc.mockapi.io/journal/students/${id}`
        )
        .json();
      student.value = response;
    };

    function editStudent() {
      console.log("editStudent");
    }

    return { student, fetchTestStudent, editStudent };
  }
);
