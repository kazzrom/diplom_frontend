import { defineStore } from "pinia";
import ky from "ky";
import { ref } from "vue";
import { API_URL } from "@/constants";
import { useConfirm } from "primevue/useconfirm";
import { useVuelidate } from "@vuelidate/core";
import studentFormRules from "@/validators/studentFormRules.js";
import { useToast } from "primevue/usetoast";

export const useGeneralInformationStore = defineStore(
  "generalInformation",
  () => {
    const toast = useToast();
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
            toast.add({
              severity: "warn",
              summary: "Предупреждение",
              detail: "Заполните все обязательные поля",
              life: 2000,
            });
            return;
          }
          await ky.put(`${API_URL}/students`, {
            json: student.value,
          });
          isEditForm.value = true;
          toast.add({
            severity: "info",
            summary: "Инфо",
            detail: "Данные об родственнике успешно изменены",
            life: 2000,
          });
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
