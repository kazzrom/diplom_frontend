import ky from "ky";

export default {
  state: {
    students: [],
    orphansOrGuardiansColumns: [
      { field: "studentFullname", header: "ФИО студента" },
      { field: "relativeFullname", header: "ФИО родственника" },
      { field: "address", header: "Адрес проживания" },
      { field: "contacts", header: "Контакты" },
    ],
  },

  mutations: {
    updateStudents(state, students) {
      state.students = students;
    },
  },

  actions: {
    async fetchStudents(ctx, tableType = "orphans") {
      const students = await ky
        .get(`https://65f9714bdf1514524611a1fc.mockapi.io/journal/${tableType}`)
        .json();
      ctx.commit("updateStudents", students);
    },
  },

  getters: {
    students(state) {
      return state.students;
    },
    orphansColumns(state) {
      return state.orphansOrGuardiansColumns;
    },
    guardiansColumns(state) {
      return state.orphansOrGuardiansColumns;
    },
  },
};
