import { createRouter, createWebHashHistory } from "vue-router";

import GroupListView from "@/views/GroupList/GroupListView.vue";
import StartView from "@/views/Start/StartView.vue";
import SocialPassportView from "@/views/SocialPassport/SocialPassportView.vue";
import ParentMeetingsView from "@/views/ParentMeetings/ParentMeetingsView.vue";
import GroupMeetingsView from "@/views/GroupMeetings/GroupMeetingsView.vue";
import HomeroomsView from "@/views/Homerooms/HomeroomsView.vue";
import ProfileView from "@/views/Profile/ProfileView.vue";
import profileRouter from "./profileRouter";

const routes = [
  {
    path: "/",
    component: StartView,
  },
  {
    path: "/students",
    name: "Students",
    component: GroupListView,
  },
  {
    path: "/social-passport",
    name: "SocialPassport",
    component: SocialPassportView,
  },
  {
    path: "/parent-meetings",
    name: "ParentMeetings",
    component: ParentMeetingsView,
  },
  {
    path: "/group-meetings",
    name: "GroupMeetings",
    component: GroupMeetingsView,
  },
  {
    path: "/homerooms",
    name: "Homerooms",
    component: HomeroomsView,
  },
  {
    path: "/profile/:id(\\d+)",
    name: "Profile",
    component: ProfileView,
    redirect: { name: "GeneralInformation" },
    children: profileRouter,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
