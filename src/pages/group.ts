import { getGroup } from '../data/groups';
import { goHome, goWord } from '../router';
import { chip, el } from '../ui/dom';

export function renderGroup(root: HTMLElement, id: string): void {
  const group = getGroup(id);
  if (!group) {
    root.append(
      el('p', { className: 'empty', textContent: '找不到这个主题组。' }),
      backBtn(),
    );
    return;
  }

  const chips = el('div', { className: 'chip-cloud large' });
  for (const w of group.words) {
    const label = w.zh ? `${w.word}` : w.word;
    const c = chip(label, () => goWord(w.word), 'chip-word');
    if (w.zh) {
      c.append(el('span', { className: 'chip-zh', textContent: w.zh }));
    }
    chips.append(c);
  }

  root.append(
    backBtn(),
    el('header', { className: 'page-header' }, [
      el('p', { className: 'eyebrow', textContent: `${group.emoji} 主题组` }),
      el('h1', { className: 'page-title', textContent: group.nameZh }),
      el('p', { className: 'page-sub', textContent: group.blurb }),
    ]),
    chips,
  );
}

function backBtn(): HTMLButtonElement {
  const b = el('button', { type: 'button', className: 'btn ghost back' }, ['← 首页']) as HTMLButtonElement;
  b.addEventListener('click', () => goHome());
  return b;
}
