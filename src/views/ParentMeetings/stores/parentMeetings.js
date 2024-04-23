import { API_URL, GROUP_ID } from "@/constants";
import DialogForm from "@/utils/dialog";
import ky from "ky";
import { defineStore } from "pinia";
import { useConfirm } from "primevue/useconfirm";
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import parentMeetingRules from "@/validators/parentMeetingRules.js";
import { useToast } from "primevue/usetoast";

export const useParentMeetingsStore = defineStore("parentMeetings", () => {
  const dialog = ref(
    new DialogForm({
      add: "Добавление протокола",
      edit: "Редактирование протокола",
      view: "Просмотр протокола",
    })
  );

  const toast = useToast();

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
    if (!v$.value.$invalid) {
      const response = await ky
        .post(`${API_URL}/parent-meetings`, {
          json: { groupId: GROUP_ID, ...parentMeeting.value },
        })
        .json();
      parentMeetings.value.push(response);
      dialog.value.closeDialog();
      toast.add({
        severity: "success",
        summary: "Успех",
        detail: "Протокол успешно добавлен",
        life: 2000,
      });
      isSubmit.value = false;
    } else {
      toast.add({
        severity: "warn",
        summary: "Предупреждение",
        detail: "Заполните все обязательные поля",
        life: 2000,
      });
    }
  }

  async function editParentMetting() {
    await ky
      .put(`${API_URL}/parent-meetings/${parentMeeting.value.id}`, {
        json: parentMeeting.value,
      })
      .json();
    await fetchParentMeetings();
    isSubmit.value = false;
  }

  const confirmEditParentMeeting = () => {
    confirn.require({
      message: "Сохранить изменения?",
      header: "Редактирование протокола",
      icon: "pi pi-info-circle",
      rejectLabel: "Отмена",
      rejectClass: "p-button-secondary p-button-outlined",
      acceptLabel: "Редактировать",
      acceptClass: "p-button-info",
      accept: () => {
        if (!v$.value.$invalid) {
          editParentMetting();
          dialog.value.closeDialog();
          toast.add({
            severity: "info",
            summary: "Инфо",
            detail: "Протокол успешно изменен",
            life: 2000,
          });
        } else {
          toast.add({
            severity: "warn",
            summary: "Предупреждение",
            detail: "Заполните все обязательные поля",
            life: 2000,
          });
        }
      },
      reject: () => {
        dialog.value.closeDialog();
      },
    });
  };

  async function deleteParentMeeting(id) {
    await ky.delete(`${API_URL}/parent-meetings/${id}`);
    parentMeetings.value = parentMeetings.value.filter(
      (meet) => meet.id !== id
    );
    toast.add({
      severity: "success",
      summary: "Успех",
      detail: "Протокол успешно удален",
      life: 2000,
    });
  }

  const confirn = useConfirm();

  const confirmDeleteParentMeeting = () => {
    confirn.require({
      message: "Вы точно хотите удалить выбранные протоколы?",
      header: "Удаление протокола",
      icon: "pi pi-info-circle",
      rejectLabel: "Отмена",
      rejectClass: "p-button-secondary p-button-outlined",
      acceptLabel: "Удалить",
      acceptClass: "p-button-danger",
      accept: () => {
        selectedParentMeetings.value.forEach((meet) => {
          deleteParentMeeting(meet.id);
        });
      },
      reject: () => {
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
