export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | boolean | undefined> = {},
  children: (Node | string)[] = [],
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === false) continue;
    if (k === 'className') node.className = String(v);
    else if (k === 'textContent') node.textContent = String(v);
    else if (v === true) node.setAttribute(k, '');
    else node.setAttribute(k, String(v));
  }
  for (const c of children) {
    node.append(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return node;
}

export function clear(node: HTMLElement): void {
  node.replaceChildren();
}

export function chip(word: string, onClick: (w: string) => void, extraClass = ''): HTMLButtonElement {
  const btn = el('button', {
    type: 'button',
    className: `chip ${extraClass}`.trim(),
  }, [word]);
  btn.addEventListener('click', () => onClick(word));
  return btn;
}

export function section(title: string, body: HTMLElement, hint?: string): HTMLElement {
  const wrap = el('section', { className: 'section' });
  const head = el('div', { className: 'section-head' });
  head.append(el('h2', { className: 'section-title', textContent: title }));
  if (hint) head.append(el('p', { className: 'section-hint', textContent: hint }));
  wrap.append(head, body);
  return wrap;
}
