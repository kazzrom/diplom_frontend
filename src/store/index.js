import { createStore } from "vuex";
import listStudent from "./modules/listStudent";

export default createStore({
  modules: {
    listStudent,
  },
});
