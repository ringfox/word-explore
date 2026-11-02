/** 手建词根/词缀小图：从词跳到同源词 */
export interface RootEntry {
  id: string;
  label: string;
  meaningZh: string;
  words: string[];
}

export const roots: RootEntry[] = [
  {
    id: 'spect',
    label: 'spect',
    meaningZh: '看 / 注视',
    words: ['inspect', 'respect', 'perspective', 'spectator', 'spectacle', 'suspect'],
  },
  {
    id: 'port',
    label: 'port',
    meaningZh: '携带 / 运送',
    words: ['transport', 'import', 'export', 'portable', 'support', 'airport'],
  },
  {
    id: 'scrib',
    label: 'scrib / script',
    meaningZh: '写',
    words: ['describe', 'manuscript', 'prescribe', 'scribble', 'script', 'subscribe'],
  },
  {
    id: 'dict',
    label: 'dict',
    meaningZh: '说 / 言',
    words: ['dictionary', 'predict', 'contradict', 'dictate', 'verdict'],
  },
  {
    id: 'form',
    label: 'form',
    meaningZh: '形状 / 形成',
    words: ['transform', 'reform', 'formal', 'inform', 'performance', 'uniform'],
  },
  {
    id: 'bio',
    label: 'bio',
    meaningZh: '生命',
    words: ['biology', 'biography', 'antibiotic', 'biosphere'],
  },
  {
    id: 'graph',
    label: 'graph',
    meaningZh: '写 / 画',
    words: ['photograph', 'biography', 'graphics', 'autograph', 'paragraph'],
  },
  {
    id: 'tele',
    label: 'tele',
    meaningZh: '远',
    words: ['telephone', 'television', 'telescope', 'telegram'],
  },
  {
    id: 'phon',
    label: 'phon',
    meaningZh: '声音',
    words: ['phone', 'phonetic', 'symphony', 'microphone', 'telephone'],
  },
  {
    id: 'circ',
    label: 'circ / cycl',
    meaningZh: '圆 / 环',
    words: ['circle', 'circuit', 'circulate', 'bicycle', 'cycle'],
  },
  {
    id: 'ject',
    label: 'ject',
    meaningZh: '投 / 抛',
    words: ['project', 'reject', 'inject', 'subject', 'object'],
  },
  {
    id: 'struct',
    label: 'struct',
    meaningZh: '建造',
    words: ['structure', 'construct', 'instruct', 'destruction'],
  },
];

const byId = new Map(roots.map((r) => [r.id, r]));
const wordToRoot = new Map<string, string>();
for (const r of roots) {
  for (const w of r.words) {
    wordToRoot.set(w.toLowerCase(), r.id);
  }
}

export function getRoot(id: string): RootEntry | undefined {
  return byId.get(id);
}

export function rootIdForWord(word: string): string | undefined {
  return wordToRoot.get(word.toLowerCase());
}

export function relatedByRoot(word: string): { root: RootEntry; peers: string[] } | null {
  const id = rootIdForWord(word);
  if (!id) return null;
  const root = byId.get(id);
  if (!root) return null;
  const peers = root.words.filter((w) => w.toLowerCase() !== word.toLowerCase());
  return { root, peers };
}
