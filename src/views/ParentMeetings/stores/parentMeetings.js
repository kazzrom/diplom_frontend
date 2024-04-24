import { API_URL, GROUP_ID } from "@/constants";
import DialogForm from "@/utils/dialog";
import ky from "ky";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import parentMeetingRules from "@/validators/parentMeetingRules.js";
import { useConfirmStore } from "@/stores/confirms";

export const useParentMeetingsStore = defineStore("parentMeetings", () => {
  const { confirmAdd, confirmEdit, confirmDelete } = useConfirmStore();

  const dialog = ref(
    new DialogForm({
      add: "Добавление протокола",
      edit: "Редактирование протокола",
      view: "Просмотр протокола",
    })
  );

  const parentMeeting = ref({
    meettingDate: undefined,
    theme: undefined,
    meetingContent: undefined,
  });

  const v$ = useVuelidate(parentMeetingRules, parentMeeting);

  function resetParentMeeting() {
    parentMeeting.value = {
      meettingDate: undefined,
      theme: undefined,
      meetingContent: undefined,
    };
  }

  const selectedParentMeetings = ref([]);
  const parentMeetings = ref([]);

  const presentParents = ref([]);

  async function fetchParentMeetings() {
    const response = await ky
      .get(`${API_URL}/parent-meetings/${GROUP_ID}`)
      .json();
    parentMeetings.value = response;
  }

  const isSubmit = ref(false);
  async function addParentMetting() {
    isSubmit.value = true;
    confirmAdd({
      invalid: v$.value.$invalid,
      funcIf: async () => {
        const response = await ky
          .post(`${API_URL}/parent-meetings`, {
            json: { groupId: GROUP_ID, ...parentMeeting.value },
          })
          .json();
        parentMeetings.value.push(response);
        dialog.value.closeDialog();
        isSubmit.value = false;
      },
    });
  }

  async function editParentMetting() {
    await ky.put(`${API_URL}/parent-meetings/${parentMeeting.value.id}`, {
      json: parentMeeting.value,
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
    await ky.delete(`${API_URL}/parent-meetings/${id}`);
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
  };
});
