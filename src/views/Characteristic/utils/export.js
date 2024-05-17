import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { FONT_SIZE, DEFAULT_PAGE_MARGINS } from "@/constants";
import { getTextField, getTitle, getParagraph } from "@/utils/docx_elements.js";

export function exportToCharacteristicInDOCX(student, characteristic) {
  const title = getTitle("Характеристика обучающегося");

  const fullname = getTextField("ФИО", student.fullname, 1);

  const studentAttitudes = getParagraph(
    "Отношения студента к разным вещам: ",
    1
  );

  const attitudeToStudy = getTextField(
    "Отношение к учёбе",
    characteristic.studentAttitudes.attitudeToStudy
  );

  const attitudeToElders = getTextField(
    "Отношение к старшим",
    characteristic.studentAttitudes.attitudeToElders
  );

  const attitudeToFailures = getTextField(
    "Отношение к неудачам",
    characteristic.studentAttitudes.attitudeToFailures
  );

  const relationshipWithPeers = getTextField(
    "Взаимоотношения со сверстниками",
    characteristic.studentAttitudes.relationshipWithPeers
  );

  const studentPersonality = getParagraph("Личность студента: ", 1);

  const positiveSides = getTextField(
    "Положительные стороны",
    characteristic.studentPersonality.positiveSides
  );

  const negativeSides = getTextField(
    "Отрицательные стороны",
    characteristic.studentPersonality.negativeSides
  );

  const presenceOffenses = getTextField(
    "Наличие правонарушений",
    characteristic.studentPersonality.presenceOffenses ? "Имеется" : "Нет"
  );

  const hobbies = getTextField(
    "Хобби",
    characteristic.hobbies.length ? characteristic.hobbies.join(", ") : "Нет"
  );

  const inclinations = getTextField(
    "Склонности (вредные привычки)",
    characteristic.inclinations.length
      ? characteristic.inclinations.join(", ")
      : "Нет"
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          title,
          fullname,
          studentAttitudes,
          attitudeToStudy,
          attitudeToElders,
          attitudeToFailures,
          relationshipWithPeers,
          studentPersonality,
          positiveSides,
          negativeSides,
          presenceOffenses,
          hobbies,
          inclinations,
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `${student.fullname}_Характеристика.docx`);
  });
}
