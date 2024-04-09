import DialogForm from "@/utils/dialog";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useParentMeetingsStore = defineStore("parentMeetings", () => {
  const dialog = ref(
    new DialogForm({
      add: "Добавление протокола",
      edit: "Редактирование протокола",
      view: "Просмотр протокола",
    })
  );

  const parentMeeting = ref({
    title: "",
    theme: "",
    group: "",
    date: "",
  });

  const parentMeetings = ref([
    {
      id: 1,
      title: "Родительское собрание №1",
      theme: "Первая тема",
      group: "403 ИСП",
      date: "02.02.2023",
    },
    {
      id: 2,
      title: "Родительское собрание №2",
      theme: "Вторая тема",
      group: "403 ИСП",
      date: "02.02.2023",
    },
    {
      id: 3,
      title: "Родительское собрание №3",
      theme: "Третья тема",
      group: "403 ИСП",
      date: "02.02.2023",
    },
  ]);

  const getParentMeetins = computed(() => parentMeetings);

  const isNotNullParentMeetings = ref(true);

  function deleteParentMeeting(id) {
    parentMeetings.value = parentMeetings.value.filter(
      (meet) => meet.id !== id
    );
    isNotNullParentMeetings.value = parentMeetings.value.length;
  }

  function fetchParentMeetings(id) {
    parentMeeting.value = parentMeetings.value.find((meet) => meet.id === id);
  }

  return {
    dialog,
    parentMeeting,
    fetchParentMeetings,
    getParentMeetins,
    deleteParentMeeting,
    isNotNullParentMeetings,
  };
});
