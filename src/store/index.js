import { createStore } from "vuex";
import groupList from "@/pages/GroupList/store/groupList.js";
import socialPassport from "@/pages/SocialPassportPage/store/socialPassport.js";

export default createStore({
  modules: {
    groupList,
    socialPassport,
  },
});
