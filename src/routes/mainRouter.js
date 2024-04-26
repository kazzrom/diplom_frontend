import { createRouter, createWebHistory } from "vue-router";

import GroupListView from "@/views/GroupList/GroupListView.vue";
import GroupActiveView from "@/views/GroupActive/GroupActiveView.vue";
import StartView from "@/views/Start/StartView.vue";
import SocialPassportView from "@/views/SocialPassport/SocialPassportView.vue";
import ParentMeetingsView from "@/views/ParentMeetings/ParentMeetingsView.vue";
import GroupMeetingsView from "@/views/GroupMeetings/GroupMeetingsView.vue";
import HomeroomsView from "@/views/Homerooms/HomeroomsView.vue";
import ProfileView from "@/views/Profile/ProfileView.vue";
import profileRouter from "./profileRouter.js";
import socialPassportRouter from "./socialPassportRouter.js";

// import HomeView from "@/auth/views/HomeView.vue";
// import RegisterForm from "@/auth/views/RegisterForm.vue";
// import LoginForm from "@/auth/views/LoginForm.vue";

const routes = [
  {
    path: "/",
    component: StartView,
  },
  // {
  //   path: "/home",
  //   name: "home",
  //   component: HomeView,
  // },
  // {
  //   path: "/sign-up",
  //   name: "register",
  //   component: RegisterForm,
  // },
  // {
  //   path: "/sign-in",
  //   name: "login",
  //   component: LoginForm,
  // },
  {
    path: "/students",
    name: "Students",
    component: GroupListView,
  },
  {
    path: "/group-active",
    name: "GroupActive",
    component: GroupActiveView,
  },
  {
    path: "/social-passport",
    name: "SocialPassport",
    component: SocialPassportView,
    children: socialPassportRouter,
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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
