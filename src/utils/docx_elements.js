import {
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from "docx";

export const FONT_SIZE = "14pt";

export const DEFAULT_PAGE_MARGINS = {
  top: "1cm",
  bottom: "1cm",
  left: "1cm",
  right: "1cm",
};
const TABLE_FONT_SIZE = "12pt";

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

export function getTableTitle(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        size: TABLE_FONT_SIZE,
        bold: true,
      }),
    ],
    alignment: "center",
  });
}

export function getTableParagraph(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        size: TABLE_FONT_SIZE,
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

export function getTable(rows) {
  return new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows: rows,
  });
}

export function getTableHeader(contentCells) {
  return new TableRow({
    children: contentCells.map((content) => {
      return new TableCell({
        children: [getTableTitle(content)],
      });
    }),
  });
}
export function getTableRow(contentCells) {
  return new TableRow({
    children: contentCells.map((content) => {
      return new TableCell({
        children: [getTableParagraph(content)],
      });
    }),
  });
}
