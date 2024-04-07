import GeneralInformationSection from "@/views/Profile/modules/GeneralInformationSection.vue";
import CharacteristicSection from "@/views/Profile/modules/CharacteristicSection.vue";
import FamilySection from "@/views/Profile/modules/FamilySection.vue";
import IndividualWorkTable from "@/views/Profile/modules/IndividualWorkTable.vue";

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
