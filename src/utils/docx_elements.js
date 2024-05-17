import { Paragraph, TextRun } from "docx";
import { FONT_SIZE } from "@/constants";

export function getTitle(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        size: FONT_SIZE,
        bold: true,
      }),
    ],
    alignment: "center",
  });
}

export function getParagraph(text, breakLine = 0) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        size: FONT_SIZE,
        break: breakLine,
      }),
    ],
  });
}

export function getTextField(label, value, breakLine = 0) {
  return new Paragraph({
    children: [
      new TextRun({
        text: label + ": ",
        size: FONT_SIZE,
        break: breakLine,
      }),
      new TextRun({
        text: value,
        size: FONT_SIZE,
      }),
    ],
  });
}
