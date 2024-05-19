import { Document, Packer } from "docx";
import { saveAs } from "file-saver";
import {
  DEFAULT_PAGE_MARGINS,
  getTitle,
  getTable,
  getTableRow,
  getTableHeader,
} from "@/utils/docx_elements.js";

export function exportToIndividualWorkInDOCX(student, individualWorks) {
  const title = getTitle("Индивидуальные работы");

  const rows = individualWorks.map((individualWork) => {
    return getTableRow([
      individualWork.workDate,
      individualWork.participant,
      individualWork.workContent,
      individualWork.expectedResult,
    ]);
  });

  const table = getTable([
    getTableHeader([
      "Дата",
      "С кем проведена беседа",
      "Какие вопросы обсуждались",
      "Предполагаемый результат",
    ]),
    ...rows,
  ]);

  const document = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: DEFAULT_PAGE_MARGINS,
          },
        },
        children: [title, table],
      },
    ],
  });

  Packer.toBlob(document).then((blob) => {
    saveAs(blob, `${student.fullname}_Индивидуальные работы.docx`);
  });
}
