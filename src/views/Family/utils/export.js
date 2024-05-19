import { Document, Packer } from "docx";
import { saveAs } from "file-saver";
import {
  DEFAULT_PAGE_MARGINS,
  getTextField,
  getTitle,
} from "@/utils/docx_elements";

export function exportToFamilyInDOCX(student, familyMembers) {
  const title = getTitle("Список родственников студента");

  const listFamilyMembers = [];

  familyMembers.forEach((member) => {
    const fullname = getTextField("ФИО", member.fullname, 1);
    const relation = getTextField("Родство", member.relation);
    const phoneNumber = getTextField(
      "Номер телефона",
      member.MemberPersonalDatum.phoneNumber
    );
    const residentialAddress = getTextField(
      "Адрес проживания",
      member.MemberPersonalDatum.residentialAddress
    );
    const workplace = getTextField(
      "Место работы",
      member.MemberPersonalDatum.workplace
    );
    const post = getTextField("Должность", member.MemberPersonalDatum.post);

    listFamilyMembers.push(
      fullname,
      relation,
      phoneNumber,
      residentialAddress,
      workplace,
      post
    );
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: DEFAULT_PAGE_MARGINS,
          },
        },
        children: [title, ...listFamilyMembers],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `${student.fullname}__Список родственников.docx`);
  });
}
