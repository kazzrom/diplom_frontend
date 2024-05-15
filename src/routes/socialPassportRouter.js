import OrphansTable from "@/views/SocialPassport/modules/OrphansTable.vue";
import GuardiansTable from "@/views/SocialPassport/modules/GuardiansTable.vue";
import IncompleteFamiliesTable from "@/views/SocialPassport/modules/IncompleteFamiliesTable.vue";
import ProblemFamiliesTable from "@/views/SocialPassport/modules/ProblemFamiliesTable.vue";
import LargeFamiliesTable from "@/views/SocialPassport/modules/LargeFamiliesTable.vue";
import LowIncomeFamiliesTable from "@/views/SocialPassport/modules/LowIncomeFamiliesTable.vue";
import UneployedParentsColumns from "@/views/SocialPassport/modules/UneployedParentsColumns.vue";
import RegisteredOPPNTable from "@/views/SocialPassport/modules/RegisteredOPPNTable.vue";
import StudentsWithDiseasesTable from "@/views/SocialPassport/modules/StudentsWithDiseasesTable.vue";
import DisabledParentsTable from "@/views/SocialPassport/modules/DisabledParentsTable.vue";
import DisabledStudentsTable from "@/views/SocialPassport/modules/DisabledStudentsTable.vue";

export default [
  {
    path: "orphans",
    name: "Orphans",
    component: OrphansTable,
  },
  {
    path: "guardians",
    name: "Guardians",
    component: GuardiansTable,
  },
  {
    path: "incomplete-families",
    name: "IncompleteFamilies",
    component: IncompleteFamiliesTable,
  },
  {
    path: "problem-families",
    name: "ProblemFamilies",
    component: ProblemFamiliesTable,
  },
  {
    path: "large-families",
    name: "LargeFamilies",
    component: LargeFamiliesTable,
  },
  {
    path: "low-income-families",
    name: "LowIncomeFamilies",
    component: LowIncomeFamiliesTable,
  },
  {
    path: "uneployed-parents",
    name: "UneployedParents",
    component: UneployedParentsColumns,
  },
  {
    path: "registered-oppn",
    name: "RegisteredOPPN",
    component: RegisteredOPPNTable,
  },
  {
    path: "students-with-diseases",
    name: "StudentsWithDiseases",
    component: StudentsWithDiseasesTable,
  },
  {
    path: "disabled-parents",
    name: "DisabledParents",
    component: DisabledParentsTable,
  },
  {
    path: "disabled-students",
    name: "DisabledStudents",
    component: DisabledStudentsTable,
  },
];
