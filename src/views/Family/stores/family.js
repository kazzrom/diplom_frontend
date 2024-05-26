import { defineStore } from "pinia";
import { computed, ref } from "vue";
import DialogForm from "@/utils/dialog";
import { useVuelidate } from "@vuelidate/core";
import familyMemberFormRules from "@/validators/familyMemberFormRules.js";
import { useConfirmStore } from "@/stores/confirms";
import * as API from "../api/families.js";
import familyMemberModel from "../models/familyMember.js";
import { KINSHIPS } from "../constants/constants.js";
import { useToastStore } from "@/stores/toasts";

export const useFamilySectionStore = defineStore("familySection", () => {
  const { confirmAdd, confirmEdit, confirmDelete } = useConfirmStore();
  const { successToast, warningToast } = useToastStore();
  const dialog = ref(
    new DialogForm({
      add: "Добавление члена семьи",
      edit: "Редактирование информации",
      view: "Просмотр информации",
    })
  );

  const familyMember = ref(familyMemberModel.fields);

  const v$ = useVuelidate(
    computed(() => familyMemberFormRules),
    familyMember
  );

  function clearForm() {
    familyMember.value = familyMemberModel.fields;
  }

  const relations = ref(KINSHIPS);

  const familyMembers = ref([]);
  const currentRelations = computed(() => {
    return familyMembers.value.map((member) => member.relation);
  });

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
    try {
      isSubmit.value = true;
      if (
        ["Мать", "Отец"].includes(familyMember.value.relation) &&
        currentRelations.value.includes(familyMember.value.relation)
      ) {
        warningToast(
          familyMember.value.relation == "Мать"
            ? "Мать уже была добавлена в список членов семьи"
            : "Отец уже был добавлен в список членов семьи"
        );
        return;
      }
      if (!v$.value.$invalid) {
        await addRelativeApi();
        isSubmit.value = false;
        dialog.value.closeDialog();
        successToast("Член семьи был успешно добавлен");
      } else {
        warningToast("Заполните все обязательные поля");
      }
    } catch (error) {
      warningToast(error.response.data.error);
    }
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
    currentRelations,
  };
});
