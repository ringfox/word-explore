import { lookupWord } from '../api/dictionary';
import {
  findWordEntry,
  peersInGroups,
  zhForWord,
} from '../data/groups';
import { getRoot, relatedByRoot, rootIdForWord } from '../data/roots';
import { goGroup, goHome, goNotebook, goWord } from '../router';
import { hasInNotebook, toggleNotebook } from '../store/notebook';
import { chip, el, section } from '../ui/dom';

export async function renderWord(root: HTMLElement, word: string): Promise<void> {
  const w = word.trim().toLowerCase();
  const known = findWordEntry(w);
  const zh = zhForWord(w) ?? known?.entry.zh;

  const shell = el('div', { className: 'word-shell' });
  root.append(shell);

  shell.append(navBar());

  const header = el('header', { className: 'page-header word-header' });
  header.append(el('p', { className: 'eyebrow', textContent: '单词详情' }));
  header.append(el('h1', { className: 'page-title word-title', textContent: w }));
  if (zh) {
    header.append(el('p', { className: 'zh-gloss', textContent: zh }));
  }
  const meta = el('div', { className: 'word-meta' });
  meta.append(el('span', { className: 'meta-loading', textContent: '正在拉取释义…' }));
  header.append(meta);
  shell.append(header);

  const notebookBtn = el('button', {
    type: 'button',
    className: 'btn notebook-toggle',
  }) as HTMLButtonElement;
  syncNotebookBtn(notebookBtn, w);
  notebookBtn.addEventListener('click', () => {
    toggleNotebook(w);
    syncNotebookBtn(notebookBtn, w);
  });
  shell.append(notebookBtn);

  const explore = el('div', { className: 'explore-stack' });
  shell.append(explore);

  // 同组 — 本地，立刻可点
  const peerBlocks = peersInGroups(w);
  if (peerBlocks.length) {
    for (const { group, peers } of peerBlocks) {
      const cloud = el('div', { className: 'chip-cloud' });
      for (const p of peers) cloud.append(chip(p.word, goWord));
      const headHint = el('button', {
        type: 'button',
        className: 'linkish',
      }, [`查看「${group.nameZh}」全部 →`]);
      headHint.addEventListener('click', () => goGroup(group.id));
      const body = el('div');
      body.append(cloud, headHint);
      explore.append(
        section(`同组 · ${group.emoji} ${group.nameZh}`, body, '点芯片跳到下一个词'),
      );
    }
  } else {
    explore.append(
      section(
        '同组 / 同类',
        el('p', {
          className: 'muted',
          textContent: '这个词还不在手建主题里。先玩同义词或词根，或从首页主题逛进来。',
        }),
      ),
    );
  }

  // 词根扩展 — 本地
  const rootRel = relatedByRoot(w);
  const hintedRootId = rootIdForWord(w) ?? known?.entry.rootId;
  if (rootRel) {
    const cloud = el('div', { className: 'chip-cloud' });
    for (const p of rootRel.peers) cloud.append(chip(p, goWord, 'chip-root'));
    explore.append(
      section(
        `词根 · ${rootRel.root.label}`,
        cloud,
        `${rootRel.root.meaningZh} — 同源词，点着串起来`,
      ),
    );
  } else if (hintedRootId) {
    const root = getRoot(hintedRootId);
    if (root) {
      const peers = root.words.filter((x) => x.toLowerCase() !== w);
      const cloud = el('div', { className: 'chip-cloud' });
      for (const p of peers) cloud.append(chip(p, goWord, 'chip-root'));
      explore.append(
        section(`词根 · ${root.label}`, cloud, `${root.meaningZh}`),
      );
    }
  } else if (peerBlocks.length) {
    // 无词根时：相关词 = 同组抽样（已在上面展示），给一句说明即可
    explore.append(
      el('p', {
        className: 'muted tip',
        textContent: '暂无手建词根；上面的同组词就是「相关词」入口。',
      }),
    );
  }

  // API 释义 + 同义词
  const dict = await lookupWord(w);
  if (shell.isConnected === false) return;

  meta.replaceChildren();
  if (dict.phonetic) {
    meta.append(el('span', { className: 'phonetic', textContent: dict.phonetic }));
  }
  if (dict.audio) {
    const play = el('button', { type: 'button', className: 'btn sm ghost' }, ['🔊 发音']);
    play.addEventListener('click', () => {
      const a = new Audio(dict.audio);
      void a.play().catch(() => undefined);
    });
    meta.append(play);
  }
  if (dict.source === 'fallback') {
    meta.append(
      el('span', {
        className: 'meta-warn',
        textContent: zh ? '词典离线，仍可逛同组' : '词典暂不可用',
      }),
    );
  }

  if (dict.meanings.length) {
    const box = el('div', { className: 'defs' });
    for (const m of dict.meanings.slice(0, 3)) {
      const block = el('div', { className: 'def-block' });
      if (m.partOfSpeech) {
        block.append(el('span', { className: 'pos', textContent: m.partOfSpeech }));
      }
      const ul = el('ul', { className: 'def-list' });
      for (const d of m.definitions) ul.append(el('li', { textContent: d }));
      block.append(ul);
      box.append(block);
    }
    // 插到 notebook 按钮后、explore 前
    notebookBtn.after(section('英文释义', box, '来自 Free Dictionary API'));
  }

  if (dict.synonyms.length) {
    const cloud = el('div', { className: 'chip-cloud' });
    for (const s of dict.synonyms) cloud.append(chip(s, goWord, 'chip-syn'));
    explore.prepend(
      section('同义词', cloud, '点一下，跳到另一个意思接近的词'),
    );
  } else if (dict.source === 'api') {
    explore.prepend(
      section(
        '同义词',
        el('p', { className: 'muted', textContent: '这条词条没返回同义词，试试同组或词根。' }),
      ),
    );
  }
}

function syncNotebookBtn(btn: HTMLButtonElement, word: string): void {
  const on = hasInNotebook(word);
  btn.textContent = on ? '✓ 已在生词本' : '+ 加入生词本';
  btn.classList.toggle('on', on);
}

function navBar(): HTMLElement {
  const bar = el('div', { className: 'nav-bar' });
  const home = el('button', { type: 'button', className: 'btn ghost back' }, ['← 首页']);
  home.addEventListener('click', () => goHome());
  const nb = el('button', { type: 'button', className: 'btn ghost' }, ['生词本']);
  nb.addEventListener('click', () => goNotebook());
  bar.append(home, nb);
  return bar;
}
