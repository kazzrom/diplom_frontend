import { defineStore } from "pinia";
import { useConfirm } from "primevue/useconfirm";
import { useToastStore } from "./toasts";

export const useConfirmStore = defineStore("confirms", () => {
  const { successToast, infoToast, warningToast } = useToastStore();
  const confirm = useConfirm();

  async function confirmAdd({ funcIf, funcElse = () => {}, invalid }) {
    if (!invalid) {
      funcIf();
      successToast("Данные были успешно добавлены");
    } else {
      warningToast("Заполните все обязательные поля");
      funcElse();
    }
  }
  async function confirmEdit({ funcAccept, funcReject, invalid }) {
    confirm.require({
      message: "Сохранить изменения?",
      header: "Подтверждение",
      icon: "pi pi-info-circle",
      rejectLabel: "Отмена",
      acceptLabel: "Изменить",
      rejectClass: "p-button-secondary p-button-outlined",
      acceptClass: "p-button-info",
      accept: () => {
        if (!invalid) {
          funcAccept();
          infoToast("Изменения были успешно сохранены");
        } else {
          warningToast("Заполните все обязательные поля");
        }
      },
      reject: funcReject,
    });
  }

  async function confirmDelete({ funcAccept, funcReject = () => {} }) {
    confirm.require({
      message: "Вы точно хотите удалить?",
      header: "Подтверждение",
      icon: "pi pi-info-circle",
      rejectLabel: "Отмена",
      acceptLabel: "Удалить",
      rejectClass: "p-button-secondary p-button-outlined",
      acceptClass: "p-button-danger",
      accept: () => {
        funcAccept();
        successToast("Удаление прошло успешно");
      },
      reject: funcReject,
    });
  }
  return { confirmEdit, confirmDelete, confirmAdd };
});
