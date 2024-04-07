import GeneralInformationSection from "@/views/Profile/sections/GeneralInformationSection.vue";
import CharacteristicSection from "@/views/Profile/sections/CharacteristicSection.vue";
import characteristicRouter from "./characteristicRouter";
import FamilySection from "@/views/Profile/sections/FamilySection.vue";
import IndividualWorkTable from "@/views/Profile/sections/IndividualWorkTable.vue";

export default [
  {
    path: "general-information",
    name: "GeneralInformation",
    component: GeneralInformationSection,
  },
  {
    path: "characteristic",
    name: "Characteristic",
    component: CharacteristicSection,
    redirect: { name: "Relationship" },
    children: characteristicRouter,
  },
  {
    path: "family",
    name: "Family",
    component: FamilySection,
  },
  {
    path: "individual-work",
    name: "IndividualWork",
    component: IndividualWorkTable,
  },
];
