import { ref } from "vue";
import { defineStore } from "pinia";
import { useConfirmStore } from "@/stores/confirms.js";
import { useHomeroomStore } from "./homeroom.js";
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

  async function addHomeroom() {
    if (homeroomStore.v$.$invalid) {
      homeroomStore.v$.$touch();
    }
    confirmAdd({
      invalid: homeroomStore.v$.$invalid,
      funcIf: async () => {
        dialog.value.closeDialog();
        await homeroomStore.createHomeroom();
        homeroomStore.resetHomeroom();
      },
    });
  }

  async function editHomeroom() {
    if (homeroomStore.v$.$invalid) {
      homeroomStore.v$.$touch();
    }
    confirmEdit({
      invalid: homeroomStore.v$.$invalid,
      funcAccept: async () => {
        dialog.value.closeDialog();
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
