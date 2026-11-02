import { zhForWord } from '../data/groups';
import { goHome, goWord } from '../router';
import { listNotebook, removeFromNotebook } from '../store/notebook';
import { el } from '../ui/dom';

export function renderNotebook(root: HTMLElement): void {
  const items = listNotebook();

  root.append(
    (() => {
      const b = el('button', { type: 'button', className: 'btn ghost back' }, ['← 首页']) as HTMLButtonElement;
      b.addEventListener('click', () => goHome());
      return b;
    })(),
    el('header', { className: 'page-header' }, [
      el('p', { className: 'eyebrow', textContent: '只存本机' }),
      el('h1', { className: 'page-title', textContent: '生词本' }),
      el('p', {
        className: 'page-sub',
        textContent: items.length
          ? `已收 ${items.length} 个词，点词看详情，右滑感没有——直接点移除。`
          : '还是空的。逛词的时候点「加入生词本」就行。',
      }),
    ]),
  );

  if (!items.length) return;

  const list = el('ul', { className: 'notebook-list' });
  for (const item of items) {
    const li = el('li', { className: 'notebook-item' });
    const main = el('button', { type: 'button', className: 'notebook-main' });
    const zh = zhForWord(item.word);
    main.append(el('span', { className: 'notebook-word', textContent: item.word }));
    if (zh) main.append(el('span', { className: 'notebook-zh', textContent: zh }));
    main.addEventListener('click', () => goWord(item.word));

    const rm = el('button', { type: 'button', className: 'btn danger sm' }, ['移除']);
    rm.addEventListener('click', () => {
      removeFromNotebook(item.word);
      renderNotebookRefresh(root);
    });

    li.append(main, rm);
    list.append(li);
  }
  root.append(list);
}

function renderNotebookRefresh(root: HTMLElement): void {
  root.replaceChildren();
  renderNotebook(root);
}
