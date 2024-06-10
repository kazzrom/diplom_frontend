import DialogForm from "@/utils/dialog";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import groupMeetingRules from "@/validators/groupMeetingRules.js";
import { useConfirmStore } from "@/stores/confirms";
import * as API from "../api/groupMeetings.js";
import groupMeetingModel from "../models/groupMeeting.js";

export const useGroupMeetingsStore = defineStore("groupMeetings", () => {
  const { confirmAdd, confirmEdit, confirmDelete } = useConfirmStore();

  const dialog = ref(
    new DialogForm({
      add: "Добавление протокола",
      edit: "Редактирование протокола",
      view: "Просмотр протокола",
    })
  );

  const groupMeeting = ref(groupMeetingModel.fields);

  function resetGroupMeeting() {
    groupMeeting.value = groupMeetingModel.fields;
  }

  const v$ = useVuelidate(
    computed(() => groupMeetingRules),
    groupMeeting
  );

  const selectedGroupMeetings = ref([]);
  const groupMeetings = ref([]);

  async function fetchGroupMeetings() {
    const response = await API.getGroupMeetings();
    groupMeetings.value = response;
  }

  const isSubmit = ref(false);
  async function addGroupMeeting() {
    if (!v$.value.$invalid) {
      const newGroupMeeting = await API.createGroupMeeting(groupMeeting.value);
      groupMeetings.value.push(newGroupMeeting);
      resetGroupMeeting();
    }
  }

  async function confirmAddGroupMeeting() {
    isSubmit.value = true;
    confirmAdd({
      invalid: v$.value.$invalid,
      funcIf: async () => {
        dialog.value.closeDialog();
        await addGroupMeeting();
        isSubmit.value = false;
      },
    });
  }

  async function editGroupMeeting() {
    await API.updateGroupMeeting(groupMeeting.value);
  }

  async function confirmEditGroupMeeting() {
    isSubmit.value = true;
    confirmEdit({
      invalid: v$.value.$invalid,
      funcAccept: async () => {
        dialog.value.closeDialog();
        await editGroupMeeting();
        isSubmit.value = false;
      },
      funcReject: async () => {
        dialog.value.closeDialog();
        resetGroupMeeting();
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
        selectedGroupMeetings.value = [];
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
    resetGroupMeeting,
  };
});

