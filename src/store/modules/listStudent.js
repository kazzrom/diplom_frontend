import ky from "ky";

export default {
  state: {
    students: [],
    visibleDialog: false,
    testStudents: [],
  },

  mutations: {
    updateStudents(state, students) {
      state.students = students;
    },
    updateTestStudents(state, students) {
      state.testStudents = students;
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
    async fetchTestStudents(ctx) {
      const testStudents = await ky
        .get("https://65f9714bdf1514524611a1fc.mockapi.io/journal/students")
        .json();
      ctx.commit("updateTestStudents", testStudents);
    },
  },

  getters: {
    students(state) {
      return state.students;
    },
    testStudents(state) {
      return state.testStudents;
    },
    visibleDialog(state) {
      return state.visibleDialog;
    },
  },
};
