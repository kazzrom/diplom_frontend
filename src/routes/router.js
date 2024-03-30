import { createRouter, createWebHashHistory } from "vue-router";

import StudentsListPage from "@/pages/GroupList/GroupList.vue";
import StartPage from "@/pages/StartPage/StartPage.vue";
import SocialPassportPage from "@/pages/SocialPassportPage/SocialPassportPage.vue";
import ParentMeetingsPage from "@/pages/ParentMeetingsPage/ParentMeetingsPage.vue";
import GroupMeetingsPage from "@/pages/GroupMeetingsPage/GroupMeetingsPage.vue";
import HomeroomsPage from "@/pages/HomeroomsPage/HomeroomsPage.vue";

const routes = [
  { path: "/", component: StartPage },
  { path: "/students", component: StudentsListPage },
  { path: "/social-passport", component: SocialPassportPage },
  { path: "/parent-meetings", component: ParentMeetingsPage },
  { path: "/group-meetings", component: GroupMeetingsPage },
  { path: "/homerooms", component: HomeroomsPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
