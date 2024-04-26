import DialogForm from "@/utils/dialog";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import groupMeetingRules from "@/validators/groupMeetingRules.js";
import { useConfirmStore } from "@/stores/confirms";
import * as API from "../api/groupMeetings.js";

export const useGroupMeetingsStore = defineStore("groupMeetings", () => {
  const { confirmAdd, confirmEdit, confirmDelete } = useConfirmStore();

  const dialog = ref(
    new DialogForm({
      add: "Добавление протокола",
      edit: "Редактирование протокола",
      view: "Просмотр протокола",
    })
  );

  const groupMeeting = ref({});

  function resetGroupMeeting() {
    groupMeeting.value = {
      meetingDate: undefined,
      theme: undefined,
      meetingContent: undefined,
      presence: undefined,
    };
  }

  resetGroupMeeting();

  const v$ = useVuelidate(groupMeetingRules, groupMeeting);

  const selectedGroupMeetings = ref([]);
  const groupMeetings = ref([]);

  async function fetchGroupMeetings() {
    const response = await API.fetchGroupMeetings();
    groupMeetings.value = response;
  }

  const isSubmit = ref(false);
  async function addGroupMeeting() {
    if (!v$.value.$invalid) {
      groupMeetings.value.push(groupMeeting.value);
      await API.addGroupMeeting(groupMeeting.value);
      resetGroupMeeting();
    }
  }

  async function confirmAddGroupMeeting() {
    isSubmit.value = true;
    confirmAdd({
      invalid: v$.value.$invalid,
      funcIf: async () => {
        await addGroupMeeting();
        isSubmit.value = false;
      },
    });
  }

  async function editGroupMeeting() {
    await API.editGroupMeeting(groupMeeting.value);
  }

  async function confirmEditGroupMeeting() {
    isSubmit.value = true;
    confirmEdit({
      invalid: v$.value.$invalid,
      funcAccept: async () => {
        dialog.value.closeDialog();
        await editGroupMeeting();
        isSubmit.value = false;
        resetGroupMeeting();
      },
      funcReject: async () => {
        dialog.value.closeDialog();
        await fetchGroupMeetings();
        isSubmit.value = false;
      },
    });
  }

  async function deleteGroupMeeting(id) {
    await API.deleteGroupMeeting(id);
    groupMeetings.value = groupMeetings.value.filter(
      (groupMeeting) => groupMeeting.id !== id
    );
  }

  async function confirmDeleteGroupMeeting() {
    confirmDelete({
      funcAccept: async () => {
        selectedGroupMeetings.value.forEach(async (groupMeeting) => {
          await deleteGroupMeeting(groupMeeting.id);
        });
      },
      funcReject: () => {
        selectedGroupMeetings.value = [];
      },
    });
  }

  return {
    dialog,
    groupMeeting,
    selectedGroupMeetings,
    groupMeetings,
    v$,
    isSubmit,
    fetchGroupMeetings,
    confirmAddGroupMeeting,
    confirmEditGroupMeeting,
    confirmDeleteGroupMeeting,
  };
});
