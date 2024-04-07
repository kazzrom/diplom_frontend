import RelationshipForm from "@/views/Profile/modules/RelationshipForm.vue";
import PersonalityForm from "@/views/Profile/modules/PersonalityForm.vue";

export default [
  {
    path: "relationship",
    name: "Relationship",
    component: RelationshipForm,
  },
  {
    path: "personality",
    name: "Personality",
    component: PersonalityForm,
  },
];
