import { createRouter, createWebHashHistory } from "vue-router";

import StudentsListPage from "@/pages/GroupList/GroupList.vue";
import StartPage from "@/pages/StartPage/StartPage.vue";
import SocialPassportPage from "@/pages/SocialPassportPage/SocialPassportPage.vue";
import ParentMeetingsPage from "@/pages/ParentMeetingsPage/ParentMeetingsPage.vue";
import GroupMeetingsPage from "@/pages/GroupMeetingsPage/GroupMeetingsPage.vue";
import HomeroomsPage from "@/pages/HomeroomsPage/HomeroomsPage.vue";
import ProfilePage from "@/pages/ProfilePage/ProfilePage.vue";
import GeneralInformation from "@/pages/ProfilePage/components/GeneralInformation.vue";
import Characteristic from "@/pages/ProfilePage/components/Characteristic.vue";
import Family from "@/pages/ProfilePage/components/Family.vue";
import IndividualWork from "@/pages/ProfilePage/components/IndividualWork.vue";

const routes = [
  { path: "/", component: StartPage },
  { path: "/students", component: StudentsListPage },
  { path: "/social-passport", component: SocialPassportPage },
  { path: "/parent-meetings", component: ParentMeetingsPage },
  { path: "/group-meetings", component: GroupMeetingsPage },
  { path: "/homerooms", component: HomeroomsPage },
  {
    path: "/profile",
    component: ProfilePage,
    redirect: { name: "generalInformation" },
    children: [
      {
        path: "general-information",
        name: "generalInformation",
        component: GeneralInformation,
      },
      {
        path: "characteristic",
        name: "characteristic",
        component: Characteristic,
      },
      {
        path: "family",
        name: "family",
        component: Family,
      },
      {
        path: "individual-work",
        name: "individualWork",
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
