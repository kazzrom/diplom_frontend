import { createStore } from "vuex";
import student from "./modules/student";

export default createStore({
  modules: {
    student,
  },
});
