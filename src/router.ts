export type Route =
  | { name: 'home' }
  | { name: 'word'; word: string }
  | { name: 'group'; id: string }
  | { name: 'notebook' };

type Listener = (route: Route) => void;

const listeners = new Set<Listener>();

export function parseHash(hash = location.hash): Route {
  const raw = hash.replace(/^#\/?/, '').trim();
  if (!raw || raw === 'home') return { name: 'home' };
  const [seg, ...rest] = raw.split('/');
  if (seg === 'word' && rest[0]) {
    return { name: 'word', word: decodeURIComponent(rest.join('/')) };
  }
  if (seg === 'group' && rest[0]) {
    return { name: 'group', id: decodeURIComponent(rest[0]) };
  }
  if (seg === 'notebook') return { name: 'notebook' };
  return { name: 'home' };
}

export function toHash(route: Route): string {
  switch (route.name) {
    case 'home':
      return '#/';
    case 'word':
      return `#/word/${encodeURIComponent(route.word)}`;
    case 'group':
      return `#/group/${encodeURIComponent(route.id)}`;
    case 'notebook':
      return '#/notebook';
  }
}

export function navigate(route: Route): void {
  const next = toHash(route);
  if (location.hash === next || (route.name === 'home' && (location.hash === '' || location.hash === '#'))) {
    notify();
    return;
  }
  location.hash = next;
}

export function currentRoute(): Route {
  return parseHash();
}

export function onRoute(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify(): void {
  const r = currentRoute();
  listeners.forEach((fn) => fn(r));
}

export function startRouter(): void {
  window.addEventListener('hashchange', notify);
  if (!location.hash) location.hash = '#/';
  else notify();
}

/** 把词芯片点到详情 */
export function goWord(word: string): void {
  navigate({ name: 'word', word: word.trim().toLowerCase() });
}

export function goGroup(id: string): void {
  navigate({ name: 'group', id });
}

export function goHome(): void {
  navigate({ name: 'home' });
}

export function goNotebook(): void {
  navigate({ name: 'notebook' });
}
