/** Free Dictionary API — 释义 / 音标 / 音频 / 同义词 */

export interface DictMeaning {
  partOfSpeech: string;
  definitions: string[];
  synonyms: string[];
}

export interface DictResult {
  word: string;
  phonetic?: string;
  audio?: string;
  meanings: DictMeaning[];
  synonyms: string[];
  source: 'api' | 'fallback';
}

const cache = new Map<string, DictResult>();

export async function lookupWord(word: string): Promise<DictResult> {
  const key = word.trim().toLowerCase();
  if (!key) {
    return { word: '', meanings: [], synonyms: [], source: 'fallback' };
  }
  const hit = cache.get(key);
  if (hit) return hit;

  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(key)}`,
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as Array<{
      word?: string;
      phonetic?: string;
      phonetics?: Array<{ text?: string; audio?: string }>;
      meanings?: Array<{
        partOfSpeech?: string;
        definitions?: Array<{ definition?: string; synonyms?: string[] }>;
        synonyms?: string[];
      }>;
    }>;

    const entry = data[0];
    if (!entry) throw new Error('empty');

    const phonetic =
      entry.phonetic ||
      entry.phonetics?.find((p) => p.text)?.text ||
      undefined;
    const audio = entry.phonetics?.find((p) => p.audio)?.audio || undefined;

    const meanings: DictMeaning[] = (entry.meanings ?? []).map((m) => {
      const defs = (m.definitions ?? [])
        .map((d) => d.definition)
        .filter((d): d is string => Boolean(d))
        .slice(0, 3);
      const syns = [
        ...(m.synonyms ?? []),
        ...(m.definitions ?? []).flatMap((d) => d.synonyms ?? []),
      ];
      return {
        partOfSpeech: m.partOfSpeech ?? '',
        definitions: defs,
        synonyms: unique(syns).slice(0, 12),
      };
    });

    const synonyms = unique(meanings.flatMap((m) => m.synonyms)).slice(0, 16);

    const result: DictResult = {
      word: entry.word ?? key,
      phonetic,
      audio,
      meanings,
      synonyms,
      source: 'api',
    };
    cache.set(key, result);
    return result;
  } catch {
    const fallback: DictResult = {
      word: key,
      meanings: [],
      synonyms: [],
      source: 'fallback',
    };
    cache.set(key, fallback);
    return fallback;
  }
}

function unique(arr: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of arr) {
    const k = s.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(s);
  }
  return out;
}
