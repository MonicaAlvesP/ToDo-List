import { jsPDF } from 'jspdf';

/** Cores alinhadas a `global.scss` (tema escuro da interface). */
const C = {
  pageBg: [18, 18, 24] as const,
  headerBand: [10, 10, 14] as const,
  row: [30, 30, 40] as const,
  rowDone: [18, 42, 34] as const,
  text: [244, 244, 245] as const,
  muted: [161, 161, 170] as const,
  accent: [167, 139, 250] as const,
  accentBar: [139, 92, 246] as const,
  border: [55, 55, 70] as const,
};

export interface PdfListItem {
  title: string;
  done: boolean;
}

function drawFullBleedBackground(doc: jsPDF, pageW: number, pageH: number) {
  doc.setFillColor(...C.pageBg);
  doc.rect(0, 0, pageW, pageH, 'F');
}

export function exportShoppingListPdf(items: PdfListItem[]) {
  const doc = new jsPDF();
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentW = pageW - margin * 2;

  drawFullBleedBackground(doc, pageW, pageH);

  doc.setFillColor(...C.headerBand);
  doc.rect(0, 0, pageW, 44, 'F');
  doc.setFillColor(...C.accentBar);
  doc.rect(0, 43, pageW, 1.2, 'F');

  let y = 18;
  doc.setTextColor(...C.accent);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('Lista de compras', pageW / 2, y, { align: 'center' });

  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...C.muted);
  doc.text(`Gerado em ${new Date().toLocaleString('pt-BR')}`, pageW / 2, y, {
    align: 'center',
  });

  y = 52;
  doc.setTextColor(...C.muted);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('ITENS', margin, y);
  y += 10;

  const lineGap = 4.8;
  const minRowH = 11;
  const padX = 2.5;
  const checkSize = 3.8;
  const textLeft = margin + padX + checkSize + 3;
  const textMaxW = contentW - (textLeft - margin) - padX;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(item.title, textMaxW) as string[];
    const textBlockH = Math.max(lines.length * lineGap, minRowH - 5);
    const rowH = Math.max(minRowH, textBlockH + 6);

    if (y + rowH > pageH - margin) {
      doc.addPage();
      drawFullBleedBackground(doc, pageW, pageH);
      y = margin;
    }

    const bg = item.done ? C.rowDone : C.row;
    doc.setFillColor(bg[0], bg[1], bg[2]);
    doc.roundedRect(margin, y, contentW, rowH, 1.8, 1.8, 'F');

    const checkCx = margin + padX;
    const checkCy = y + rowH / 2 - checkSize / 2;
    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.25);
    doc.roundedRect(checkCx, checkCy, checkSize, checkSize, 0.4, 0.4, 'S');

    if (item.done) {
      doc.setDrawColor(...C.accent);
      doc.setLineWidth(0.45);
      const ix = checkCx + checkSize * 0.2;
      const iy = checkCy + checkSize * 0.55;
      doc.line(ix, iy, checkCx + checkSize * 0.45, checkCy + checkSize * 0.85);
      doc.line(
        checkCx + checkSize * 0.45,
        checkCy + checkSize * 0.85,
        checkCx + checkSize * 0.85,
        checkCy + checkSize * 0.2
      );
    }

    let ty = y + 7.5;
    doc.setFontSize(10);
    for (let li = 0; li < lines.length; li++) {
      const line = lines[li];
      if (item.done) {
        doc.setTextColor(...C.muted);
      } else {
        doc.setTextColor(...C.text);
      }
      doc.text(line, textLeft, ty);
      if (item.done) {
        const w = doc.getTextWidth(line);
        doc.setDrawColor(...C.muted);
        doc.setLineWidth(0.2);
        doc.line(textLeft, ty - 1.2, textLeft + w, ty - 1.2);
      }
      ty += lineGap;
    }

    y += rowH + 2.5;
  }

  doc.save('lista_de_compras.pdf');
}
