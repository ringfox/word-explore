# 词游 · Word Explore

好玩的英语词汇**探索**网页游戏（不是传统刷卡背单词 App）。

核心循环：搜一个词 → 详情页点 **同义词 / 同组 / 词根** 芯片 → 跳到下一个词。主题组可离线逛；释义与同义词走公开词典 API。

## 功能

- 首页搜索任意英文词 + 主题组入口（衣物、食物、情绪、自然、学习、旅行、身体、家居、科技、动作）
- 词详情：手建中文释义、Free Dictionary 英文释义/音标/发音、同义词、同组、词根扩展
- 生词本：仅 `localStorage`（键名 `word-explore:notebook`），无登录
- 中文界面，内容为英文单词；移动端优先，可加到主屏幕（PWA manifest）

## 本地运行

```bash
npm i
npm run dev
```

构建：

```bash
npm run build
npm run preview
```

产物在 `dist/`，可丢到任意静态托管（Cloudflare Pages / Workers Assets / Nginx 等）。`vite.config.ts` 已设 `base: './'`，相对路径部署更省心。

## 数据说明

- `src/data/groups.ts`：手建主题与部分中文释义、词根提示
- `src/data/roots.ts`：小型词根图（spect / port / scrib / dict …）
- 词典：`https://api.dictionaryapi.dev/api/v2/entries/en/{word}`  
  失败或离线时仍可看手建中文与同组/词根；同义词可能为空。

## 路由

Hash 路由：`#/`、`#/word/inspect`、`#/group/clothing`、`#/notebook`

## License

MIT（自用/开源均可）
