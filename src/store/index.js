import { createStore } from "vuex";
import groupList from "@/pages/GroupList/stores/groupList.js";

export default createStore({
  modules: {
    groupList,
  },
});
