import { defineStore } from "pinia";
import ky from "ky";
import { ref } from "vue";
import { API_URL } from "@/constants";
import { useConfirm } from "primevue/useconfirm";
import { useVuelidate } from "@vuelidate/core";
import { rulesForm } from "@/validators/validatorForm";

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

    const v$ = useVuelidate(rulesForm, student);

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
          if (v$.value.$invalid) {
            alert("Заполните все обязательные поля");
            return;
          }
          await ky.put(`${API_URL}/students`, {
            json: student.value,
          });
          isEditForm.value = true;
        },
        reject: () => {
          fetchStudent(student.value.id);
          isEditForm.value = true;
        },
      });
    };

    return { student, fetchStudent, editStudent, isEditForm, v$ };
  }
);
