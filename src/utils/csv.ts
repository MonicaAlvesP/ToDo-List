function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function normalizeTitle(raw: string): string {
  const t = raw.replace(/^"|"$/g, '').trim();
  if (!t) return '';
  return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}

const DONE_VALUES = new Set([
  'concluído',
  'concluido',
  'feito',
  'true',
  '1',
  'sim',
  'ok',
  'x',
  's',
]);

const HEADER_FIRST_CELL = new Set([
  'titulo',
  'título',
  'item',
  'nome',
  'title',
  'produto',
]);

export interface ParsedCsvItem {
  title: string;
  done: boolean;
}

/** Lê CSV exportado pelo app (item,status) ou uma coluna só com nomes. */
export function parseShoppingCsv(text: string): ParsedCsvItem[] {
  const lines = text
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return [];

  let start = 0;
  const firstCells = parseCsvLine(lines[0]);
  if (firstCells.length >= 1) {
    const h = firstCells[0].replace(/^"|"$/g, '').trim().toLowerCase();
    if (HEADER_FIRST_CELL.has(h)) {
      start = 1;
    }
  }

  const out: ParsedCsvItem[] = [];
  for (let i = start; i < lines.length; i++) {
    const cells = parseCsvLine(lines[i]);
    const title = normalizeTitle(cells[0] ?? '');
    if (!title) continue;

    let done = false;
    if (cells.length >= 2) {
      const status = cells[1].replace(/^"|"$/g, '').trim().toLowerCase();
      done = DONE_VALUES.has(status);
    }

    out.push({ title, done });
  }
  return out;
}
