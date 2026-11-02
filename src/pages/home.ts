import { groups } from '../data/groups';
import { goGroup, goNotebook, goWord } from '../router';
import { notebookCount } from '../store/notebook';
import { el } from '../ui/dom';

export function renderHome(root: HTMLElement): void {
  const searchRow = el('form', { className: 'search-row', autocomplete: 'off' });
  const input = el('input', {
    type: 'search',
    className: 'search-input',
    placeholder: '输入英文单词，开玩…',
    enterkeyhint: 'search',
    autocapitalize: 'off',
    autocorrect: 'off',
    spellcheck: 'false',
  }) as HTMLInputElement;
  const goBtn = el('button', { type: 'submit', className: 'btn primary' }, ['查']);
  searchRow.append(input, goBtn);
  searchRow.addEventListener('submit', (e) => {
    e.preventDefault();
    const w = input.value.trim();
    if (!w) return;
    goWord(w);
  });

  const notebookBtn = el('button', { type: 'button', className: 'btn ghost notebook-entry' });
  const count = notebookCount();
  notebookBtn.textContent = count > 0 ? `生词本 · ${count}` : '生词本';
  notebookBtn.addEventListener('click', () => goNotebook());

  const grid = el('div', { className: 'group-grid' });
  for (const g of groups) {
    const card = el('button', { type: 'button', className: 'group-card' });
    card.append(
      el('span', { className: 'group-emoji', textContent: g.emoji }),
      el('span', { className: 'group-name', textContent: g.nameZh }),
      el('span', { className: 'group-count', textContent: `${g.words.length} 词` }),
    );
    card.addEventListener('click', () => goGroup(g.id));
    grid.append(card);
  }

  root.append(
    el('header', { className: 'page-header' }, [
      el('p', { className: 'eyebrow', textContent: '点点点 · 词汇漫游' }),
      el('h1', { className: 'page-title', textContent: '词游' }),
      el('p', {
        className: 'page-sub',
        textContent: '不是刷卡背单词。从一词跳到词根、同义、同组——好玩地逛。',
      }),
    ]),
    searchRow,
    notebookBtn,
    el('h2', { className: 'block-title', textContent: '主题逛逛' }),
    grid,
  );
}
