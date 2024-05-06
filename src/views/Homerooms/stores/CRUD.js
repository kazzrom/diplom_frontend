import { ref } from "vue";
import { defineStore } from "pinia";
import { useConfirmStore } from "@/stores/confirms.js";
import { useHomeroomStore } from "./homeroom.js";
import { useValidationStore } from "./validation.js";
import DialogForm from "@/utils/dialog.js";

export const useCRUDStore = defineStore("CRUD", () => {
  const dialog = ref(
    new DialogForm({
      add: "Добавление протокола",
      edit: "Редактирование протокола",
      view: "Просмотр протокола",
    })
  );

  const confirms = useConfirmStore();
  const { confirmAdd, confirmEdit, confirmDelete } = confirms;

  const homeroomStore = useHomeroomStore();
  const { v$ } = useValidationStore();

  async function addHomeroom() {
    if (v$.$invalid) {
      v$.$touch();
    }
    confirmAdd({
      invalid: v$.$invalid,
      funcIf: async () => {
        await homeroomStore.createHomeroom();
        homeroomStore.resetHomeroom();
      },
    });
  }

  async function editHomeroom() {
    if (v$.$invalid) {
      v$.$touch();
    }
    confirmEdit({
      invalid: v$.$invalid,
      funcIf: async () => {
        await homeroomStore.updateHomeroom();
        homeroomStore.resetHomeroom();
      },
    });
  }

  async function deleteHomerooms() {
    confirmDelete({
      funcAccept: async () => {
        await homeroomStore.deleteSelectedHomerooms();
      },
      funcReject: () => {
        homeroomStore.resetSelectedHomerooms();
      },
    });
  }

  return {
    dialog,
    addHomeroom,
    editHomeroom,
    deleteHomerooms,
  };
});
