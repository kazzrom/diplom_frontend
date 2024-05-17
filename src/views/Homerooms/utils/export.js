import { defineStore } from "pinia";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { FONT_SIZE, DEFAULT_PAGE_MARGINS } from "@/constants";

export const useExportStore = defineStore("export", () => {
  function exportToHomeroomInDOCX(homeroom) {
    const title = new Paragraph({
      children: [
        new TextRun({
          text: "Классный час",
          size: FONT_SIZE,
          bold: true,
        }),
      ],
      alignment: "center",
    });

    const theme = new Paragraph({
      children: [
        new TextRun({
          text: "Тема: ",
          size: FONT_SIZE,
          break: 1,
        }),
        new TextRun({
          text: homeroom.theme,
          size: FONT_SIZE,
        }),
      ],
    });

    const location = new Paragraph({
      children: [
        new TextRun({
          text: "Место проведения: ",
          size: FONT_SIZE,
        }),
        new TextRun({
          text: homeroom.location,
          size: FONT_SIZE,
        }),
      ],
    });

    const date = new Paragraph({
      children: [
        new TextRun({
          text: "Дата проведения: ",
          size: FONT_SIZE,
        }),
        new TextRun({
          text: homeroom.meetingDate,
          size: FONT_SIZE,
        }),
      ],
    });

    const numberPeoplePresent = new Paragraph({
      children: [
        new TextRun({
          text: "Присутствовало: ",
          size: FONT_SIZE,
          break: 1,
        }),
        new TextRun({
          text: String(homeroom.numberPeoplePresent),
          size: FONT_SIZE,
        }),
        new TextRun({
          text: " студентов",
          size: FONT_SIZE,
        }),
      ],
    });

    const purpose = new Paragraph({
      children: [
        new TextRun({
          text: "Цель классного часа: ",
          size: FONT_SIZE,
          break: 1,
        }),
        new TextRun({
          text: homeroom.purpose,
          size: FONT_SIZE,
        }),
      ],
    });

    const tasks = new Paragraph({
      children: [
        new TextRun({
          text: "Задачи: ",
          size: FONT_SIZE,
          break: 3,
        }),
        new TextRun({
          text: homeroom.tasks,
          size: FONT_SIZE,
        }),
      ],
    });

    const courseOfMeeting = new Paragraph({
      children: [
        new TextRun({
          text: "Ход проведения: ",
          size: FONT_SIZE,
          break: 2,
        }),
        new TextRun({
          text: homeroom.courseOfMeeting,
          size: FONT_SIZE,
        }),
      ],
    });

    const results = new Paragraph({
      children: [
        new TextRun({
          text: "Итоги: ",
          size: FONT_SIZE,
          break: 1,
        }),
        new TextRun({
          text: homeroom.results,
          size: FONT_SIZE,
        }),
      ],
    });

    const signature = new Paragraph({
      children: [
        new TextRun({
          text: "_______________________",
          size: FONT_SIZE,
          break: 1,
        }),
        new TextRun({
          text: "Подпись                ",
          size: FONT_SIZE,
          italics: true,
          break: 1,
        }),
      ],
      alignment: "right",
    });

    const document = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: DEFAULT_PAGE_MARGINS,
            },
          },
          children: [
            title,
            theme,
            location,
            date,
            numberPeoplePresent,
            purpose,
            tasks,
            courseOfMeeting,
            results,
            signature,
          ],
        },
      ],
    });

    Packer.toBlob(document).then((blob) => {
      saveAs(blob, "homeroom.docx");
    });
  }

  return { exportToHomeroomInDOCX };
});
