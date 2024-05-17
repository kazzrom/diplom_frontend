import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { FONT_SIZE, DEFAULT_PAGE_MARGINS } from "@/constants";

export function exportToGroupMeetingInDOCX(groupMeeting) {
  const title = new Paragraph({
    children: [
      new TextRun({
        text: "Протокол собрания группы №" + groupMeeting.id,
        size: FONT_SIZE,
        bold: true,
      }),
    ],
    alignment: "center",
  });

  const group = new Paragraph({
    children: [
      new TextRun({
        text: "Группа: _________",
        size: FONT_SIZE,
        break: 1,
      }),
    ],
  });

  const date = new Paragraph({
    children: [
      new TextRun({
        text: "Дата: ",
        size: FONT_SIZE,
      }),
      new TextRun({
        text: groupMeeting.meetingDate,
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
        text: groupMeeting.theme,
        size: FONT_SIZE,
      }),
    ],
  });

  const presentPeople = new Paragraph({
    children: [
      new TextRun({
        text: "Присутствовало: ",
        size: FONT_SIZE,
      }),
      new TextRun({
        text: String(groupMeeting.numberPeoplePresent),
        size: FONT_SIZE,
      }),
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
          text: groupMeeting.content,
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
            margin: DEFAULT_PAGE_MARGINS,
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
