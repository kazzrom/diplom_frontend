// Сироты
const orphansColumns = [
  { field: "studentFullname", header: "ФИО студента" },
  { field: "relativeFullname", header: "ФИО родственника" },
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

export const tables = [
  { header: "Сироты", columns: orphansColumns },
  { header: "Опекаемые", columns: guardiansColumns },
  { header: "Неполные семьи", columns: incompleteFamiliesColumns },
  { header: "Проблемные семьи", columns: problemFamiliesColumns },
  { header: "Многодетные семьи", columns: largeFamiliesColumns },
  { header: "Малообечпеченные семьи ", columns: lowIncomeFamiliesColumns },
];

export const TABLE_API_URL = {
  ORPHANS: "orphans",
  GUARDIANS: "guardians",
  INCOMPLETE_FAMILIES: "incompleteFamilies",
  PROBLEM_FAMILIES: "problemFamilies",
  LARGE_FAMILIES: "largeFamilies",
  LOW_INCOME_FAMILIES: "lowIncomeFamilies",
};
