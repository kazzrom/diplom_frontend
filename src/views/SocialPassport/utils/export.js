import { defineStore } from "pinia";
import * as XLSX from "xlsx";

export const useExportStore = defineStore("export", () => {
  function exportOrphansTable(data) {
    const filterData = data.map((record) => {
      const item = {};

      item["ФИО студента"] = record.fullname;

      const familyMembers = [];
      const contacts = [];

      record.FamilyMembers.forEach((member) => {
        familyMembers.push(`${member.fullname} (${member.relation})`);
        contacts.push(
          `${member.MemberPersonalDatum.phoneNumber} (${member.relation})`
        );
      });

      item["ФИО родственников"] = familyMembers.join("\n");
      item["Контакты"] = contacts.join("\n");

      return item;
    });

    const workSheet = XLSX.utils.json_to_sheet(filterData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "data");

    XLSX.writeFile(workBook, `Сироты.xlsx`);
  }

  function exportGuardiansTable(data) {
    const filterData = data.map((record) => {
      const item = {};

      item["ФИО студента"] = record.fullname;

      const familyMembers = [];
      const contacts = [];

      record.FamilyMembers.forEach((member) => {
        familyMembers.push(`${member.fullname}`);
        contacts.push(`${member.MemberPersonalDatum.phoneNumber}`);
      });

      item["ФИО опекуна"] = familyMembers.join("\n");
      item["Контакты"] = contacts.join("\n");

      return item;
    });

    const workSheet = XLSX.utils.json_to_sheet(filterData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "data");

    XLSX.writeFile(workBook, `Опекаемые.xlsx`);
  }

  function exportIncompleteFamiliesTable(data) {
    const filterData = data.map((record) => {
      const item = {};

      item["ФИО студента"] = record.fullname;
      item[
        "ФИО родителя"
      ] = `${record.FamilyMembers[0].fullname} (${record.FamilyMembers[0].relation})`;

      return item;
    });

    const workSheet = XLSX.utils.json_to_sheet(filterData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "data");

    XLSX.writeFile(workBook, `Неполные семьи.xlsx`);
  }

  function exportLargeFamiliesTable(data) {
    const filterData = data.map((record) => {
      const item = {};

      item["ФИО студента"] = record.fullname;
      item["Количество детей"] = record.FamilyMembers.length + 1;

      return item;
    });

    const workSheet = XLSX.utils.json_to_sheet(filterData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "data");

    XLSX.writeFile(workBook, `Многодетные семьи.xlsx`);
  }

  return {
    exportOrphansTable,
    exportGuardiansTable,
    exportIncompleteFamiliesTable,
    exportLargeFamiliesTable,
  };
});
