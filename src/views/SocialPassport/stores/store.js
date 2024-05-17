import { ref } from "vue";
import { defineStore } from "pinia";

export const useSocialPassportStore = defineStore("socialPassport", () => {
  const items = [
    { label: "Сироты", route: { name: "Orphans" } },
    { label: "Опекаемые", route: { name: "Guardians" } },
    { label: "Неполные семьи", route: { name: "IncompleteFamilies" } },
    { label: "Многодетные семьи", route: { name: "LargeFamilies" } },
    { label: "Проблемные семьи", route: { name: "ProblemFamilies" } },
    { label: "Малообеспеченные семьи", route: { name: "LowIncomeFamilies" } },
    {
      label: "Обучающиеся, у которых родители безработные",
      route: { name: "UneployedParents" },
    },
    {
      label: "Обучающиеся, стоящие на учете в ОППН",
      route: { name: "RegisteredOPPN" },
    },
    {
      label: "Обучающиеся с хроническими заболеваниями",
      route: { name: "StudentsWithDiseases" },
    },
    {
      label: "Обучающиеся, из семей, в которых eсть родители-инвалиды",
      route: { name: "DisabledParents" },
    },
    {
      label: "Лица ОВЗ и инвалиды",
      route: { name: "DisabledStudents" },
    },
  ];

  const selectedItem = ref(items[0]);

  return { items, selectedItem };
});
