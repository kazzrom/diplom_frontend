import { computed, ref } from "vue";
import { defineStore } from "pinia";
import DialogForm from "@/utils/dialog.js";
import ky from "ky";
import { API_URL, GROUP_ID } from "@/constants";
import { useGroupListStore } from "./groupList";

export const useStudentFormStore = defineStore("studentForm", () => {
  const groupListStore = useGroupListStore();

  const dialog = ref(
    new DialogForm({
      add: "Добавление студента",
      edit: "",
      view: "",
    })
  );

  const student = ref({
    surname: undefined,
    name: undefined,
    patronymic: undefined,
    fullname: computed(
      () =>
        `${student.value.surname} ${student.value.name} ${student.value.patronymic}`
    ),
    sex: undefined,
    groupId: GROUP_ID,
    Personaldatum: {
      birthday: undefined,
      reportCardNumber: undefined,
      phoneNumber: undefined,
      residentialAddress: undefined,
      SNILS: undefined,
      medicalPolicy: undefined,
    },
  });

  function NoneEmpty(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === "" || arr[i] === undefined) return false;
    }
    return true;
  }

  async function addStudent() {
    if (
      NoneEmpty(Object.values(student.value)) &&
      NoneEmpty(Object.values(student.value.Personaldatum))
    ) {
      const createdStudent = await ky
        .post(`${API_URL}/students`, {
          json: student.value,
        })
        .json();

      groupListStore.students.push(createdStudent);
      setEmptyForm();
      dialog.value.closeDialog();
    } else {
      alert("Заполните все обязательные поля");
    }
  }

  function setEmptyForm() {
    student.value = {
      surname: undefined,
      name: undefined,
      patronymic: undefined,
      fullname: computed(
        () =>
          `${student.value.surname} ${student.value.name} ${student.value.patronymic}`
      ),
      sex: undefined,
      groupId: GROUP_ID,
      Personaldatum: {
        birthday: undefined,
        reportCardNumber: undefined,
        phoneNumber: undefined,
        residentialAddress: undefined,
        SNILS: undefined,
        medicalPolicy: undefined,
      },
    };
  }

  return {
    dialog,
    student,
    addStudent,
  };
});
