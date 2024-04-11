import GeneralInformationView from "@/views/GeneralInformation/GeneralInformationView.vue";
import CharacteristicView from "@/views/Characteristic/CharacteristicView.vue";
import characteristicRouter from "./characteristicRouter";
import FamilyView from "@/views/Family/FamilyView.vue";
import IndividualWorksView from "@/views/IndividualWorks/IndividualWorksView.vue";

export default [
  {
    path: "general-information",
    name: "GeneralInformation",
    component: GeneralInformationView,
  },
  {
    path: "characteristic",
    name: "Characteristic",
    component: CharacteristicView,
    redirect: { name: "Relationship" },
    children: characteristicRouter,
  },
  {
    path: "family",
    name: "Family",
    component: FamilyView,
  },
  {
    path: "individual-work",
    name: "IndividualWork",
    component: IndividualWorksView,
  },
];
