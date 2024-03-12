import ky from "ky";

export default {
  state: {
    students: [],
    visibleDialog: false,
    testStudents: [
      {
        fullName: "Берстенева Ольга Владимировна",
        id: 1,
        surname: "Берстенева",
        name: "Ольга",
        patronymic: "Владимировна",
        reportCardNumber: 19301,
      },
      {
        fullName: "Васильева Юлия Андреевна",
        id: 2,
        surname: "Васильева",
        name: "Юлия",
        patronymic: "Андреевна",
        reportCardNumber: 19302,
      },
      {
        fullName: "Волокитин Матвей Александрович",
        id: 3,
        surname: "Волокитин",
        name: "Матвей",
        patronymic: "Александрович",
        reportCardNumber: 19303,
      },
    ],
  },
  mutations: {
    updateStudents(state, students) {
      state.students = students;
    },
    showDialog(state) {
      state.visibleDialog = true;
    },
    closeDialog(state) {
      state.visibleDialog = false;
    },
  },
  actions: {
    async fetchStudents(ctx) {
      const students = await ky.get("http://localhost:5000/students").json();
      ctx.commit("updateStudents", students);
    },
  },
  getters: {
    getStudents(state) {
      return state.students;
    },
    getTestStudents(state) {
      return state.testStudents;
    },
    getVisibleDialog(state) {
      return state.visibleDialog;
    },
  },
};
