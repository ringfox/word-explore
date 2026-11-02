import './style.css';
import { currentRoute, onRoute, startRouter, type Route } from './router';
import { renderHome } from './pages/home';
import { renderGroup } from './pages/group';
import { renderNotebook } from './pages/notebook';
import { renderWord } from './pages/word';
import { clear } from './ui/dom';

const mount = document.querySelector('#app');
if (!(mount instanceof HTMLElement)) throw new Error('#app missing');
const app: HTMLElement = mount;

let renderToken = 0;

async function render(route: Route): Promise<void> {
  const token = ++renderToken;
  clear(app);
  app.classList.remove('fade-in');
  void app.offsetWidth;
  app.classList.add('fade-in');

  switch (route.name) {
    case 'home':
      renderHome(app);
      break;
    case 'group':
      renderGroup(app, route.id);
      break;
    case 'notebook':
      renderNotebook(app);
      break;
    case 'word':
      await renderWord(app, route.word);
      break;
  }

  if (token !== renderToken) return;
  document.title =
    route.name === 'word'
      ? `${route.word} · 词游`
      : route.name === 'group'
        ? `主题 · 词游`
        : route.name === 'notebook'
          ? `生词本 · 词游`
          : `词游 · Word Explore`;
  window.scrollTo(0, 0);
}

onRoute((r) => {
  void render(r);
});
window.addEventListener('notebook-change', () => {
  const r = currentRoute();
  if (r.name === 'notebook' || r.name === 'home') {
    void render(r);
  }
});

startRouter();
