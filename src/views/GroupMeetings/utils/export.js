import { defineStore } from "pinia";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export const useExportStore = defineStore("export", () => {
  function exportToGroupMeetingInDOCX(groupMeeting) {
    const title = new Paragraph({
      children: [
        new TextRun({
          text: "Протокол собрания группы №" + groupMeeting.id,
          size: "14pt",
          bold: true,
        }),
      ],
      alignment: "center",
    });

    const group = new Paragraph({
      children: [
        new TextRun({
          text: "Группа: _________",
          size: "14pt",
          break: 1,
        }),
      ],
    });

    const date = new Paragraph({
      children: [
        new TextRun({
          text: "Дата: ",
          size: "14pt",
        }),
        new TextRun({
          text: groupMeeting.meetingDate,
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
          text: groupMeeting.theme,
          size: "14pt",
        }),
      ],
    });

    const presentPeople = new Paragraph({
      children: [
        new TextRun({
          text: "Присутствовало: ",
          size: "14pt",
        }),
        new TextRun({
          text: String(groupMeeting.numberPeoplePresent),
          size: "14pt",
        }),
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
            text: groupMeeting.content,
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
          properties: {
            page: {
              margin: {
                top: "1cm",
                bottom: "1cm",
                left: "1cm",
                right: "1cm",
              },
            },
          },
          children: [title, group, date, theme, presentPeople, ...content],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "test.docx");
    });
  }

  return {
    exportToGroupMeetingInDOCX,
  };
});
