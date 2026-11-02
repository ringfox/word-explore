import { rootIdForWord } from './roots';

export interface WordEntry {
  word: string;
  zh?: string;
  /** 可选；未填时会尝试从 roots 图反查 */
  rootId?: string;
}

export interface ThemeGroup {
  id: string;
  nameZh: string;
  blurb: string;
  emoji: string;
  words: WordEntry[];
}

export const groups: ThemeGroup[] = [
  {
    id: 'clothing',
    nameZh: '衣物',
    blurb: '穿在身上的那些词：从外套到鞋带，点开一件再逛下一件。',
    emoji: '👕',
    words: [
      { word: 'shirt', zh: '衬衫' },
      { word: 'jacket', zh: '夹克' },
      { word: 'coat', zh: '外套' },
      { word: 'sweater', zh: '毛衣' },
      { word: 'hoodie', zh: '连帽衫' },
      { word: 'pants', zh: '裤子' },
      { word: 'jeans', zh: '牛仔裤' },
      { word: 'skirt', zh: '裙子' },
      { word: 'dress', zh: '连衣裙' },
      { word: 'socks', zh: '袜子' },
      { word: 'shoes', zh: '鞋子' },
      { word: 'boots', zh: '靴子' },
      { word: 'hat', zh: '帽子' },
      { word: 'scarf', zh: '围巾' },
      { word: 'gloves', zh: '手套' },
      { word: 'belt', zh: '腰带' },
      { word: 'uniform', zh: '制服', rootId: 'form' },
      { word: 'pocket', zh: '口袋' },
    ],
  },
  {
    id: 'food',
    nameZh: '食物',
    blurb: '吃的、喝的、闻着就饿的词。点着点着可能会真的饿。',
    emoji: '🍜',
    words: [
      { word: 'bread', zh: '面包' },
      { word: 'rice', zh: '米饭' },
      { word: 'noodle', zh: '面条' },
      { word: 'soup', zh: '汤' },
      { word: 'salad', zh: '沙拉' },
      { word: 'chicken', zh: '鸡肉' },
      { word: 'beef', zh: '牛肉' },
      { word: 'fish', zh: '鱼' },
      { word: 'egg', zh: '鸡蛋' },
      { word: 'cheese', zh: '奶酪' },
      { word: 'fruit', zh: '水果' },
      { word: 'apple', zh: '苹果' },
      { word: 'banana', zh: '香蕉' },
      { word: 'vegetable', zh: '蔬菜' },
      { word: 'coffee', zh: '咖啡' },
      { word: 'tea', zh: '茶' },
      { word: 'dessert', zh: '甜点' },
      { word: 'spice', zh: '香料' },
      { word: 'snack', zh: '零食' },
    ],
  },
  {
    id: 'emotion',
    nameZh: '情绪',
    blurb: '心里那些起伏：开心、紧张、好奇——给感觉贴上英文标签。',
    emoji: '💭',
    words: [
      { word: 'happy', zh: '开心的' },
      { word: 'sad', zh: '悲伤的' },
      { word: 'angry', zh: '生气的' },
      { word: 'afraid', zh: '害怕的' },
      { word: 'excited', zh: '兴奋的' },
      { word: 'nervous', zh: '紧张的' },
      { word: 'calm', zh: '平静的' },
      { word: 'curious', zh: '好奇的' },
      { word: 'proud', zh: '自豪的' },
      { word: 'lonely', zh: '孤独的' },
      { word: 'grateful', zh: '感激的' },
      { word: 'jealous', zh: '嫉妒的' },
      { word: 'hopeful', zh: '充满希望的' },
      { word: 'anxious', zh: '焦虑的' },
      { word: 'relieved', zh: '如释重负的' },
      { word: 'confused', zh: '困惑的' },
    ],
  },
  {
    id: 'nature',
    nameZh: '自然',
    blurb: '山、水、风、树——走出屏幕也能在心里逛一圈的词。',
    emoji: '🌿',
    words: [
      { word: 'mountain', zh: '山' },
      { word: 'river', zh: '河' },
      { word: 'ocean', zh: '海洋' },
      { word: 'forest', zh: '森林' },
      { word: 'tree', zh: '树' },
      { word: 'flower', zh: '花' },
      { word: 'cloud', zh: '云' },
      { word: 'rain', zh: '雨' },
      { word: 'wind', zh: '风' },
      { word: 'sun', zh: '太阳' },
      { word: 'moon', zh: '月亮' },
      { word: 'star', zh: '星星' },
      { word: 'stone', zh: '石头' },
      { word: 'soil', zh: '土壤' },
      { word: 'wildlife', zh: '野生动物' },
      { word: 'biosphere', zh: '生物圈', rootId: 'bio' },
      { word: 'valley', zh: '山谷' },
      { word: 'island', zh: '岛' },
    ],
  },
  {
    id: 'learning',
    nameZh: '学习',
    blurb: '课堂、笔记、考试与好奇——把「学」相关的词串起来。',
    emoji: '📚',
    words: [
      { word: 'study', zh: '学习' },
      { word: 'read', zh: '阅读' },
      { word: 'write', zh: '写' },
      { word: 'listen', zh: '听' },
      { word: 'practice', zh: '练习' },
      { word: 'memory', zh: '记忆' },
      { word: 'focus', zh: '专注' },
      { word: 'exam', zh: '考试' },
      { word: 'homework', zh: '作业' },
      { word: 'teacher', zh: '老师' },
      { word: 'student', zh: '学生' },
      { word: 'dictionary', zh: '词典', rootId: 'dict' },
      { word: 'paragraph', zh: '段落', rootId: 'graph' },
      { word: 'manuscript', zh: '手稿', rootId: 'scrib' },
      { word: 'describe', zh: '描述', rootId: 'scrib' },
      { word: 'predict', zh: '预测', rootId: 'dict' },
      { word: 'instruct', zh: '指导', rootId: 'struct' },
      { word: 'phonetic', zh: '语音的', rootId: 'phon' },
    ],
  },
  {
    id: 'travel',
    nameZh: '旅行',
    blurb: '出发、抵达、迷路与惊喜——路上用得到的词。',
    emoji: '✈️',
    words: [
      { word: 'trip', zh: '旅行' },
      { word: 'journey', zh: '旅程' },
      { word: 'airport', zh: '机场', rootId: 'port' },
      { word: 'ticket', zh: '票' },
      { word: 'passport', zh: '护照', rootId: 'port' },
      { word: 'luggage', zh: '行李' },
      { word: 'hotel', zh: '酒店' },
      { word: 'map', zh: '地图' },
      { word: 'route', zh: '路线' },
      { word: 'destination', zh: '目的地' },
      { word: 'souvenir', zh: '纪念品' },
      { word: 'guide', zh: '导游 / 指南' },
      { word: 'border', zh: '边境' },
      { word: 'transport', zh: '交通 / 运输', rootId: 'port' },
      { word: 'export', zh: '出口', rootId: 'port' },
      { word: 'import', zh: '进口', rootId: 'port' },
      { word: 'adventure', zh: '冒险' },
      { word: 'explore', zh: '探索' },
    ],
  },
  {
    id: 'body',
    nameZh: '身体',
    blurb: '从头到脚的部件词，加上一点「感觉」和「动作」。',
    emoji: '🫀',
    words: [
      { word: 'head', zh: '头' },
      { word: 'eye', zh: '眼睛' },
      { word: 'ear', zh: '耳朵' },
      { word: 'nose', zh: '鼻子' },
      { word: 'mouth', zh: '嘴' },
      { word: 'hand', zh: '手' },
      { word: 'finger', zh: '手指' },
      { word: 'arm', zh: '手臂' },
      { word: 'leg', zh: '腿' },
      { word: 'foot', zh: '脚' },
      { word: 'heart', zh: '心脏 / 心' },
      { word: 'brain', zh: '大脑' },
      { word: 'skin', zh: '皮肤' },
      { word: 'bone', zh: '骨头' },
      { word: 'muscle', zh: '肌肉' },
      { word: 'breath', zh: '呼吸' },
      { word: 'voice', zh: '声音' },
      { word: 'shoulder', zh: '肩膀' },
    ],
  },
  {
    id: 'home',
    nameZh: '家居',
    blurb: '房间里的日常物件：灯、椅、窗——把家变成可点的地图。',
    emoji: '🏠',
    words: [
      { word: 'room', zh: '房间' },
      { word: 'kitchen', zh: '厨房' },
      { word: 'bedroom', zh: '卧室' },
      { word: 'bathroom', zh: '浴室' },
      { word: 'sofa', zh: '沙发' },
      { word: 'chair', zh: '椅子' },
      { word: 'table', zh: '桌子' },
      { word: 'lamp', zh: '灯' },
      { word: 'window', zh: '窗户' },
      { word: 'door', zh: '门' },
      { word: 'mirror', zh: '镜子' },
      { word: 'curtain', zh: '窗帘' },
      { word: 'pillow', zh: '枕头' },
      { word: 'blanket', zh: '毯子' },
      { word: 'shelf', zh: '架子' },
      { word: 'fridge', zh: '冰箱' },
      { word: 'stove', zh: '炉灶' },
      { word: 'key', zh: '钥匙' },
    ],
  },
  {
    id: 'tech',
    nameZh: '科技',
    blurb: '屏幕、网络与「远距离」词根：tele / phon / graph 常在这里碰头。',
    emoji: '💻',
    words: [
      { word: 'computer', zh: '电脑' },
      { word: 'phone', zh: '电话', rootId: 'phon' },
      { word: 'telephone', zh: '电话', rootId: 'tele' },
      { word: 'television', zh: '电视', rootId: 'tele' },
      { word: 'internet', zh: '互联网' },
      { word: 'website', zh: '网站' },
      { word: 'app', zh: '应用' },
      { word: 'screen', zh: '屏幕' },
      { word: 'keyboard', zh: '键盘' },
      { word: 'password', zh: '密码' },
      { word: 'download', zh: '下载' },
      { word: 'upload', zh: '上传' },
      { word: 'photograph', zh: '照片', rootId: 'graph' },
      { word: 'graphics', zh: '图形', rootId: 'graph' },
      { word: 'microphone', zh: '麦克风', rootId: 'phon' },
      { word: 'circuit', zh: '电路', rootId: 'circ' },
      { word: 'project', zh: '项目 / 投射', rootId: 'ject' },
      { word: 'software', zh: '软件' },
    ],
  },
  {
    id: 'action',
    nameZh: '动作',
    blurb: '跑、看、想、建——日常动词，点着串成一条行动链。',
    emoji: '🏃',
    words: [
      { word: 'run', zh: '跑' },
      { word: 'walk', zh: '走' },
      { word: 'jump', zh: '跳' },
      { word: 'look', zh: '看' },
      { word: 'think', zh: '想' },
      { word: 'speak', zh: '说' },
      { word: 'listen', zh: '听' },
      { word: 'build', zh: '建造' },
      { word: 'construct', zh: '建造', rootId: 'struct' },
      { word: 'transform', zh: '转变', rootId: 'form' },
      { word: 'support', zh: '支持', rootId: 'port' },
      { word: 'reject', zh: '拒绝', rootId: 'ject' },
      { word: 'inspect', zh: '检查', rootId: 'spect' },
      { word: 'respect', zh: '尊重', rootId: 'spect' },
      { word: 'circulate', zh: '循环 / 流通', rootId: 'circ' },
      { word: 'inform', zh: '告知', rootId: 'form' },
      { word: 'subscribe', zh: '订阅', rootId: 'scrib' },
      { word: 'explore', zh: '探索' },
    ],
  },
];

const groupById = new Map(groups.map((g) => [g.id, g]));

/** word(lower) -> 出现的主题组 id 列表 */
const wordIndex = new Map<string, string[]>();
/** word(lower) -> 我们手建的中文释义（取首次） */
const zhIndex = new Map<string, string>();
/** word(lower) -> rootId */
const rootHint = new Map<string, string>();

for (const g of groups) {
  for (const w of g.words) {
    const key = w.word.toLowerCase();
    const list = wordIndex.get(key) ?? [];
    if (!list.includes(g.id)) list.push(g.id);
    wordIndex.set(key, list);
    if (w.zh && !zhIndex.has(key)) zhIndex.set(key, w.zh);
    const rid = w.rootId ?? rootIdForWord(w.word);
    if (rid) rootHint.set(key, rid);
  }
}

export function getGroup(id: string): ThemeGroup | undefined {
  return groupById.get(id);
}

export function groupsForWord(word: string): ThemeGroup[] {
  const ids = wordIndex.get(word.toLowerCase()) ?? [];
  return ids.map((id) => groupById.get(id)!).filter(Boolean);
}

export function zhForWord(word: string): string | undefined {
  return zhIndex.get(word.toLowerCase());
}

export function rootHintForWord(word: string): string | undefined {
  return rootHint.get(word.toLowerCase()) ?? rootIdForWord(word);
}

export function peersInGroups(word: string, limit = 24): { group: ThemeGroup; peers: WordEntry[] }[] {
  return groupsForWord(word).map((group) => ({
    group,
    peers: group.words
      .filter((w) => w.word.toLowerCase() !== word.toLowerCase())
      .slice(0, limit),
  }));
}

export function findWordEntry(word: string): { group: ThemeGroup; entry: WordEntry } | null {
  const key = word.toLowerCase();
  for (const g of groups) {
    const entry = g.words.find((w) => w.word.toLowerCase() === key);
    if (entry) return { group: g, entry };
  }
  return null;
}

export function allKnownWords(): string[] {
  return [...wordIndex.keys()].sort();
}
