import { defineStore } from "pinia";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { FONT_SIZE, DEFAULT_PAGE_MARGINS } from "@/constants";

export const useExportStore = defineStore("export", () => {
  function exportToParentMeetingInDOCX(parentMeeting) {
    const title = new Paragraph({
      children: [
        new TextRun({
          text: "Протокол родительского собрания №" + parentMeeting.id,
          size: FONT_SIZE,
          bold: true,
        }),
      ],
      alignment: "center",
    });

    const date = new Paragraph({
      children: [
        new TextRun({
          text: "Дата: ",
          size: FONT_SIZE,
          break: 1,
        }),
        new TextRun({
          text: parentMeeting.meetingDate,
          size: FONT_SIZE,
        }),
      ],
    });

    const theme = new Paragraph({
      children: [
        new TextRun({
          text: "Тема: ",
          size: FONT_SIZE,
        }),
        new TextRun({
          text: parentMeeting.theme,
          size: FONT_SIZE,
        }),
      ],
    });

    const familyMembers = parentMeeting.FamilyMembers.map((familyMember) => {
      return new TextRun({
        text: familyMember.fullname,
        size: FONT_SIZE,
        break: 1,
      });
    });

    const presentPeople = new Paragraph({
      children: [
        new TextRun({
          text: "ФИО присутствующих родителей:",
          size: FONT_SIZE,
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
            size: FONT_SIZE,
            break: 2,
          }),
        ],
        alignment: "center",
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: parentMeeting.content,
            size: FONT_SIZE,
          }),
        ],
        run: {
          size: FONT_SIZE,
        },
      }),
    ];

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margins: DEFAULT_PAGE_MARGINS,
            },
          },
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
