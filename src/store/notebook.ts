const KEY = 'word-explore:notebook';

export interface NotebookItem {
  word: string;
  addedAt: number;
}

function read(): NotebookItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as NotebookItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => x && typeof x.word === 'string');
  } catch {
    return [];
  }
}

function write(items: NotebookItem[]): void {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('notebook-change'));
}

export function listNotebook(): NotebookItem[] {
  return read().sort((a, b) => b.addedAt - a.addedAt);
}

export function hasInNotebook(word: string): boolean {
  const key = word.toLowerCase();
  return read().some((i) => i.word.toLowerCase() === key);
}

export function addToNotebook(word: string): void {
  const w = word.trim();
  if (!w) return;
  const items = read().filter((i) => i.word.toLowerCase() !== w.toLowerCase());
  items.push({ word: w, addedAt: Date.now() });
  write(items);
}

export function removeFromNotebook(word: string): void {
  const key = word.toLowerCase();
  write(read().filter((i) => i.word.toLowerCase() !== key));
}

export function toggleNotebook(word: string): boolean {
  if (hasInNotebook(word)) {
    removeFromNotebook(word);
    return false;
  }
  addToNotebook(word);
  return true;
}

export function notebookCount(): number {
  return read().length;
}
