import DialogForm from "@/utils/dialog";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import parentMeetingRules from "@/validators/parentMeetingRules.js";
import { useConfirmStore } from "@/stores/confirms";
import * as API from "../api/parentMeetings.js";
import { GROUP_ID } from "@/constants";
import parentMeetingModel from "../models/parentMeeting.js";
// import InMemoryJWT from "@/auth/services/InMemoryJWT";

export const useParentMeetingsStore = defineStore("parentMeetings", () => {
  const { confirmAdd, confirmEdit, confirmDelete } = useConfirmStore();

  const dialog = ref(
    new DialogForm({
      add: "Добавление протокола",
      edit: "Редактирование протокола",
      view: "Просмотр протокола",
    })
  );

  const parentMeeting = ref(parentMeetingModel.fields);

  const v$ = useVuelidate(parentMeetingRules, parentMeeting);

  function resetParentMeeting() {
    parentMeeting.value = parentMeetingModel.fields;
  }

  const selectedParentMeetings = ref([]);
  const parentMeetings = ref([]);

  const presentParents = ref([]);

  const presentParentsComputed = computed(() => {
    try {
      return parentMeeting.value.Attendanceparentmeetings.map(
        (attendance) => attendance.Relative
      );
    } catch (error) {
      return [];
    }
  });
  const parents = ref([]);

  async function fetchParentMeetings() {
    const response = await API.getParentMeetings();
    parentMeetings.value = response;
  }

  async function fetchParents() {
    const response = await API.getParents();
    parents.value = response;
  }

  const isSubmit = ref(false);

  // FIXME: пофиксить закрытие диалога, как-нибудь
  async function addParentMetting() {
    isSubmit.value = true;
    confirmAdd({
      invalid: v$.value.$invalid,
      funcIf: async () => {
        const response = await API.createParentMeeting({
          groupId: GROUP_ID,
          ...parentMeeting.value,
        });
        parentMeetings.value.push(response);
        dialog.value.closeDialog();
        isSubmit.value = false;
      },
    });
  }

  async function editParentMetting() {
    await API.updateParentMeeting({
      id: parentMeeting.value.id,
      parentMeeting: {
        ...parentMeeting.value,
      },
    });
    await fetchParentMeetings();
  }

  const confirmEditParentMeeting = () => {
    confirmEdit({
      invalid: v$.value.$invalid,
      funcAccept: async () => {
        await editParentMetting();
        isSubmit.value = false;
        dialog.value.closeDialog();
      },
      funcReject: async () => {
        await fetchParentMeetings();
        dialog.value.closeDialog();
      },
    });
  };

  async function deleteParentMeeting(id) {
    await API.deleteParentMeeting(id);
    parentMeetings.value = parentMeetings.value.filter(
      (meet) => meet.id !== id
    );
  }

  const confirmDeleteParentMeeting = () => {
    confirmDelete({
      funcAccept: () => {
        selectedParentMeetings.value.forEach((meet) => {
          deleteParentMeeting(meet.id);
        });
      },
      funcReject: () => {
        selectedParentMeetings.value = [];
      },
    });
  };
  return {
    dialog,
    parentMeeting,
    v$,
    selectedParentMeetings,
    parentMeetings,
    fetchParentMeetings,
    confirmDeleteParentMeeting,
    addParentMetting,
    confirmEditParentMeeting,
    resetParentMeeting,
    isSubmit,
    presentParents,
    presentParentsComputed,
    parents,
    fetchParents,
  };
});
