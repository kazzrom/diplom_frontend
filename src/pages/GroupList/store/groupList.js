import ky from "ky";

export default {
  state: {
    students: [],
    testStudents: [],
    studentColumns: [
      { field: "gender", header: "Пол" },
      { field: "birthday", header: "Дата рождения" },
      { field: "phoneNumber", header: "Номер телефона" },
      { field: "residentialAddress", header: "Домашний адрес" },
      { field: "reportCardNumber", header: "Табельный номер" },
    ],
    visibleAddStudentForm: false,
  },

  mutations: {
    updateStudents(state, students) {
      state.students = students;
    },
    updateTestStudents(state, students) {
      state.testStudents = students;
    },
    showAddStudentForm(state) {
      state.visibleAddStudentForm = true;
    },
    closeAddStudentForm(state) {
      state.visibleAddStudentForm = false;
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
    studentColumns(state) {
      return state.studentColumns;
    },
    visibleAddStudentForm(state) {
      return state.visibleAddStudentForm;
    },
  },
};
