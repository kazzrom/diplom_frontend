import { defineStore } from "pinia";
import ky from "ky";
import { ref } from "vue";
import { API_URL } from "@/constants";
import { useConfirm } from "primevue/useconfirm";

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

    const isEditForm = ref(true);

    const fetchStudent = async (id) => {
      const response = await ky.get(`${API_URL}/students/${id}`).json();
      student.value = response;
    };

    async function editStudent() {
      if (!isEditForm.value) {
        confirmEditStudent();
      }
      isEditForm.value = !isEditForm.value;
    }

    const confirm = useConfirm();
    const confirmEditStudent = () => {
      confirm.require({
        message: "Сохранить изменения?",
        header: "Изменение студента",
        icon: "pi pi-info-circle",
        rejectLabel: "Отмена",
        acceptLabel: "Изменить",
        rejectClass: "p-button-secondary p-button-outlined",
        acceptClass: "p-button-info",
        accept: async () => {
          await ky.put(`${API_URL}/students`, {
            json: student.value,
          });
        },
        reject: () => {
          fetchStudent(student.value.id);
        },
      });
    };

    return { student, fetchStudent, editStudent, isEditForm };
  }
);
