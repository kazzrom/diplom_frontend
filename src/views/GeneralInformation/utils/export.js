import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { FONT_SIZE, DEFAULT_PAGE_MARGINS } from "@/constants";
import { getTextField, getTitle } from "@/utils/docx_elements.js";

export function exportToStudentInDOCX(student) {
  const title = getTitle("Информация о студенте");

  const fullname = getTextField("ФИО", student.fullname, 1);
  const sex = getTextField("Пол", student.sex);
  const birthday = getTextField(
    "Дата рождения",
    student.PersonalDatum.birthday
  );
  const residentialAddress = getTextField(
    "Адрес проживания",
    student.PersonalDatum.residentialAddress
  );
  const whereFrom = getTextField("Городской", student.PersonalDatum.whereFrom);
  const phoneNumber = getTextField(
    "Номер телефона",
    student.PersonalDatum.phoneNumber
  );
  const email = getTextField("Почта", student.PersonalDatum.email);
  const reportCardNumber = getTextField(
    "Табельный номер",
    student.PersonalDatum.reportCardNumber
  );
  const SNILS = getTextField("СНИЛС", student.PersonalDatum.SNILS);
  const medicalPolicy = getTextField(
    "Номер мед. полиса",
    student.PersonalDatum.medicalPolicy
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          title,
          fullname,
          sex,
          birthday,
          residentialAddress,
          whereFrom,
          phoneNumber,
          email,
          reportCardNumber,
          SNILS,
          medicalPolicy,
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, student.fullname + ".docx");
  });
}
