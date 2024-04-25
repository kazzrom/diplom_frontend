// Сироты
const orphansColumns = [
  { field: "fullname", header: "ФИО студента" },
  { field: "Familyties.Relative", header: "ФИО родственника" },
  { field: "address", header: "Адрес проживания" },
  { field: "contacts", header: "Контакты" },
];

// Опекаемые
const guardiansColumns = [
  { field: "studentFullname", header: "ФИО студента" },
  { field: "relativeFullname", header: "ФИО родственника" },
  { field: "address", header: "Адрес проживания" },
  { field: "contacts", header: "Контакты" },
];

// Неполные семьи
const incompleteFamiliesColumns = [
  { field: "studentFullname", header: "ФИО студента" },
  { field: "relativeFullname", header: "ФИО родителя" },
  { field: "note", header: "Примечание" },
];

// Проблемные семьи
const problemFamiliesColumns = [
  { field: "studentFullname", header: "ФИО студента" },
  { field: "reason", header: "Причина" },
  { field: "note", header: "Примечание" },
];

// TODO: просто не забудь, что не сделал эту таблицу
// Многодетные семьи
const largeFamiliesColumns = [
  { field: "studentFullname", header: "ФИО студента" },
  { field: "numberOfChildren", header: "Количество детей в семье" },
  { field: "note", header: "Примечание" },
];

// Малообеспеченные семьи
const lowIncomeFamiliesColumns = [
  { field: "studentFullname", header: "ФИО студента" },
  { field: "note", header: "Примечание" },
];

// Обучающиеся, у которых родители безработные
const unemployedParentsColumns = [
  { field: "studentFullname", header: "ФИО студента" },
  { field: "relativeFullname", header: "ФИО родителя" },
  { field: "note", header: "Примечание" },
];

// Обучающиеся, стоящие на учете в ОППН
const registeredOPPNFamiliesColumns = [
  { field: "studentFullname", header: "ФИО студента" },
  { field: "reason", header: "Причина поставки на учёт" },
  { field: "note", header: "Примечание" },
];

// Обучающиеся, имеющие хронические заболевания
const studentsWithChronicDiseasesColumns = [
  { field: "studentFullname", header: "ФИО студента" },
  { field: "disease", header: "Заболевание" },
  { field: "note", header: "Примечание" },
];

// Обучающиеся, из семей, в которых родители (1 из родителей) инвалид
const disabledParentsColumns = [
  { field: "studentFullname", header: "ФИО студента" },
  { field: "relativeFullname", header: "ФИО родителя" },
  { field: "note", header: "Примечание" },
];

export const TABLE_API_URL = {
  ORPHANS: "/orphans",
  GUARDIANS: "/guardians",
  INCOMPLETE_FAMILIES: "/incomplete-families",
  PROBLEM_FAMILIES: "/problem-families",
  LARGE_FAMILIES: "/large-families",
  LOW_INCOME_FAMILIES: "/low-income-families",
  UNEMPLOYED_PARENTS: "/unemployed-parents",
  REGISTERED_OPPN: "/registered-oppn",
  STUDENTS_WITH_CHRONIC_DISEASE: "/students-with-chronic-disease",
  DISABLED_PARENTS: "/disabled-parents",
};
