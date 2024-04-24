import { defineStore } from "pinia";
import { computed, ref } from "vue";
import DialogForm from "@/utils/dialog";
import { useVuelidate } from "@vuelidate/core";
import relativeFormRules from "@/validators/relativeFormRules.js";
import { useConfirmStore } from "@/stores/confirms";
import * as API from "@/views/Family/api/api";

export const useFamilySectionStore = defineStore("familySection", () => {
  const { confirmAdd, confirmEdit, confirmDelete } = useConfirmStore();
  const dialog = ref(
    new DialogForm({
      add: "Добавление члена семьи",
      edit: "Редактирование информации",
      view: "Просмотр информации",
    })
  );

  const relative = ref({
    name: "",
    surname: "",
    patronymic: "",
    phoneNumber: "",
    workplace: "",
    post: "",
    kinship: "",
  });

  const v$ = useVuelidate(
    computed(() => relativeFormRules),
    relative
  );

  function clearForm() {
    relative.value = {
      name: "",
      surname: "",
      patronymic: "",
      phoneNumber: "",
      workplace: "",
      post: "",
      kinship: "",
    };
  }

  const kinships = ref([
    "Отец",
    "Мать",
    "Бабушка",
    "Дедушка",
    "Опекун",
    "Сестра",
    "Брат",
  ]);

  const relatives = ref([]);

  const studentId = ref();

  async function fetchRelative(id) {
    relative.value = await API.getRelative(id);
  }
  async function fetchRelatives(id) {
    relatives.value = await API.getRelatives(id);
    studentId.value = id;
  }

  const isSubmit = ref(false);

  async function addRelativeApi() {
    const newRelative = await API.addRelative({
      relative: relative.value,
      studentId: studentId.value,
    });
    relatives.value.push(newRelative);
  }

  async function addRelative() {
    isSubmit.value = true;
    confirmAdd({
      invalid: v$.value.$invalid,
      funcIf: async () => {
        await addRelativeApi();
        isSubmit.value = false;
        dialog.value.closeDialog();
      },
    });
  }

  async function editRelative() {
    await API.editRelative({ id: relative.value.id, data: relative.value });
    await fetchRelatives(studentId.value);
  }

  const confirmEditRelative = () => {
    confirmEdit({
      invalid: v$.value.$invalid,
      funcAccept: async () => {
        await editRelative();
        dialog.value.closeDialog();
        isSubmit.value = false;
      },
      funcReject: () => {
        fetchRelative(relative.value.id);
        dialog.value.closeDialog();
      },
    });
  };

  // FIXME: пофиксить визуальное удаление
  async function deleteRelative(id) {
    await API.deleteRelative(id);
    relatives.value = relatives.value.filter((relative) => relative.id !== id);
  }

  const confirmDeleteRelative = (id) => {
    confirmDelete({
      funcAccept: () => {
        deleteRelative(id);
      },
    });
  };

  return {
    dialog,
    relative,
    relatives,
    kinships,
    addRelative,
    confirmEditRelative,
    confirmDeleteRelative,
    fetchRelatives,
    clearForm,
    v$,
    isSubmit,
  };
});
