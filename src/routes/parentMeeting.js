import ParentMeetingForm from "@/views/ParentMeetings/modules/ParentMeetingForm.vue";
import ParentMeetingList from "@/views/ParentMeetings/modules/ParentMeetingList.vue";

export default [
  {
    path: "list",
    name: "ParentMeetingList",
    component: ParentMeetingList,
  },
  {
    path: "adding",
    name: "ParentMeetingForm",
    component: ParentMeetingForm,
  },
];
