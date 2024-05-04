import { defineStore } from "pinia";
import { computed, ref } from "vue";
import DialogForm from "@/utils/dialog";
import { useVuelidate } from "@vuelidate/core";
import relativeFormRules from "@/validators/relativeFormRules.js";
import { useConfirmStore } from "@/stores/confirms";
import * as API from "../api/families.js";
import familyMemberModel from "../models/familyMember.js";
import { KINSHIPS } from "../constants/constants.js";

export const useFamilySectionStore = defineStore("familySection", () => {
  const { confirmAdd, confirmEdit, confirmDelete } = useConfirmStore();
  const dialog = ref(
    new DialogForm({
      add: "Добавление члена семьи",
      edit: "Редактирование информации",
      view: "Просмотр информации",
    })
  );

  const familyMember = ref(familyMemberModel.fields);

  const v$ = useVuelidate(
    computed(() => relativeFormRules),
    familyMember
  );

  function clearForm() {
    familyMember.value = familyMemberModel.fields;
  }

  const relations = ref(KINSHIPS);

  const familyMembers = ref([]);

  const studentId = ref();

  async function fetchRelative(id) {
    familyMember.value = await API.getRelative(id);
  }
  async function fetchRelatives(id) {
    familyMembers.value = await API.getRelatives(id);
    studentId.value = id;
  }

  const isSubmit = ref(false);

  async function addRelativeApi() {
    const newFamilyMember = await API.addRelative({
      ...familyMember.value,
      studentId: studentId.value,
    });
    console.log(newFamilyMember);
    familyMembers.value.push(newFamilyMember);
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
    await API.editRelative({
      id: familyMember.value.id,
      data: familyMember.value,
    });
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
      funcReject: async () => {
        await fetchRelative(familyMember.value.id);
        dialog.value.closeDialog();
      },
    });
  };

  // FIXME: пофиксить визуальное удаление
  async function deleteRelative(id) {
    await API.deleteRelative(id);
    familyMembers.value = familyMembers.value.filter(
      (relative) => relative.id !== id
    );
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
    familyMember,
    familyMembers,
    relations,
    addRelative,
    confirmEditRelative,
    confirmDeleteRelative,
    fetchRelative,
    fetchRelatives,
    clearForm,
    v$,
    isSubmit,
  };
});
