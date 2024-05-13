import { defineStore } from "pinia";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export const useExportStore = defineStore("export", () => {
  function exportToParentMeetingInDOCX(parentMeeting) {
    const title = new Paragraph({
      children: [
        new TextRun({
          text: "Протокол родительского собрания №" + parentMeeting.id,
          size: "14pt",
          bold: true,
        }),
      ],
      alignment: "center",
    });

    const date = new Paragraph({
      children: [
        new TextRun({
          text: "Дата: ",
          size: "14pt",
          break: 1,
        }),
        new TextRun({
          text: parentMeeting.meetingDate,
          size: "14pt",
        }),
      ],
    });

    const theme = new Paragraph({
      children: [
        new TextRun({
          text: "Тема: ",
          size: "14pt",
        }),
        new TextRun({
          text: parentMeeting.theme,
          size: "14pt",
        }),
      ],
    });

    const familyMembers = parentMeeting.FamilyMembers.map((familyMember) => {
      return new TextRun({
        text: familyMember.fullname,
        size: "14pt",
        break: 1,
      });
    });

    const presentPeople = new Paragraph({
      children: [
        new TextRun({
          text: "ФИО присутствующих родителей:",
          size: "14pt",
          break: 1,
        }),
        ...familyMembers,
      ],
    });

    const content = [
      new Paragraph({
        children: [
          new TextRun({
            text: "ПОВЕСТКА:",
            size: "14pt",
            break: 2,
          }),
        ],
        alignment: "center",
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: parentMeeting.content,
            size: "14pt",
          }),
        ],
        run: {
          size: "14pt",
        },
      }),
    ];

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [title, date, theme, presentPeople, ...content],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "test.docx");
    });
  }

  return { exportToParentMeetingInDOCX };
});
