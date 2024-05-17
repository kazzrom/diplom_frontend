import { defineStore } from "pinia";
import * as XLSX from "xlsx";

export const useExportStore = defineStore("export", () => {
  function exportXLSX(data, tableColumns, filename, isGroupList = false) {
    const columns = tableColumns.concat([]);
    if (isGroupList) {
      columns.unshift({ field: "fullname", header: "ФИО" });
    }

    const filterData = data.map((student) => {
      const item = {};
      columns.forEach((column) => {
        const fieldSplit = column.field.split(".");
        if (fieldSplit.length == 1) {
          item[column.header] = student[column.field];
        } else {
          item[column.header] = student[fieldSplit[0]][fieldSplit[1]];
        }
      });

      return item;
    });

    const workSheet = XLSX.utils.json_to_sheet(filterData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "data");

    XLSX.writeFile(workBook, `${filename}.xlsx`);
  }

  return { exportXLSX };
});
