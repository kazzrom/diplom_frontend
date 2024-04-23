import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useToast } from "primevue/usetoast";

export const useToastStore = defineStore("toasts", () => {
  const toast = useToast();

  const TOAST_LIFE = 2000;

  function successToast(message) {
    toast.add({
      severity: "success",
      summary: "Успех",
      detail: message,
      life: TOAST_LIFE,
    });
  }

  function infoToast(message) {
    toast.add({
      severity: "info",
      summary: "Инфо",
      detail: message,
      life: TOAST_LIFE,
    });
  }

  function warningToast(message) {
    toast.add({
      severity: "warn",
      summary: "Предупреждение",
      detail: message,
      life: TOAST_LIFE,
    });
  }

  return { successToast, infoToast, warningToast };
});
