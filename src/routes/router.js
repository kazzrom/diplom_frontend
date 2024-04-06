import { createRouter, createWebHashHistory } from "vue-router";

import GroupListView from "@/views/GroupList/GroupListView.vue";
import StartView from "@/views/Start/StartView.vue";
import SocialPassportView from "@/views/SocialPassport/SocialPassportView.vue";
import ParentMeetingsView from "@/views/ParentMeetings/ParentMeetingsView.vue";
import GroupMeetingsView from "@/views/GroupMeetings/GroupMeetingsView.vue";
import HomeroomsView from "@/views/Homerooms/HomeroomsView.vue";

import ProfileView from "@/views/Profile/ProfileView.vue";
import GeneralInformation from "@/views/Profile/components/GeneralInformation.vue";
import Characteristic from "@/views/Profile/components/Characteristic.vue";
import Family from "@/views/Profile/components/Family.vue";
import IndividualWork from "@/views/Profile/components/IndividualWork.vue";

const routes = [
  { path: "/", component: StartView },
  { path: "/students", name: "Students", component: GroupListView },
  { path: "/social-passport", component: SocialPassportView },
  { path: "/parent-meetings", component: ParentMeetingsView },
  { path: "/group-meetings", component: GroupMeetingsView },
  { path: "/homerooms", component: HomeroomsView },
  {
    path: "/profile",
    component: ProfileView,
    redirect: { name: "GeneralInformation" },
    children: [
      {
        path: "general-information",
        name: "GeneralInformation",
        component: GeneralInformation,
      },
      {
        path: "characteristic",
        name: "Characteristic",
        component: Characteristic,
      },
      {
        path: "family",
        name: "Family",
        component: Family,
      },
      {
        path: "individual-work",
        name: "IndividualWork",
        component: IndividualWork,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
