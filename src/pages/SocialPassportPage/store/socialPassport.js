import ky from "ky";

export default {
  state: {
    orphans: [],
    orphansColumns: [
      { field: "studentFullname", header: "ФИО студента" },
      { field: "relativeFullname", header: "ФИО родственника" },
      { field: "address", header: "Адрес проживания" },
      { field: "contacts", header: "Контакты" },
    ],
  },

  mutations: {
    updateOrphans(state, orphans) {
      state.orphans = orphans;
    },
  },

  actions: {
    async fetchOrphans(ctx) {
      const orphans = await ky
        .get("https://65f9714bdf1514524611a1fc.mockapi.io/journal/orphans")
        .json();
      console.log(orphans);
      ctx.commit("updateOrphans", orphans);
    },
  },

  getters: {
    orphans(state) {
      return state.orphans;
    },
    orphansColumns(state) {
      return state.orphansColumns;
    },
  },
};
