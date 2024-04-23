import RelationshipForm from "@/views/Characteristic/modules/AttitudeForm.vue";
import PersonalityForm from "@/views/Characteristic/modules/PersonalityForm.vue";

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
