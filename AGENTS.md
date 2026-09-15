# AGENTS.md — 项目约束

## 项目概述

Max3753 的个人博客，基于 Hexo 7.3.0 + Butterfly 5.4.2 主题，部署到 GitHub Pages。

## 技术栈

- **框架**: Hexo 7.3.0
- **主题**: Butterfly 5.4.2（`themes/butterfly/`，只读，不直接修改）
- **包管理器**: pnpm
- **Node.js**: ≥ 22（pnpm v11 要求）
- **渲染器**: hexo-renderer-marked, hexo-renderer-stylus, hexo-renderer-ejs, hexo-renderer-pug
- **插件**: hexo-generator-search (local_search), hexo-generator-feed, hexo-generator-sitemap, hexo-offline

## 目录结构

```
blog/
├── _config.yml              # 站点配置（含 search.use: local_search）
├── _config.butterfly.yml    # 主题配置
├── source/
│   ├── _posts/              # 文章（Markdown）
│   ├── css/custom.css       # 自定义样式
│   └── js/custom.js         # 自定义脚本
├── themes/butterfly/        # 主题（只读）
├── public/                  # 构建产物（不入库）
└── .github/workflows/       # CI 配置
```

## 关键约束

1. **搜索配置**: `_config.yml` 的 `search.use` 必须为 `local_search`。若缺失，搜索框 CSS（`.local-search-box input`）不会编译进 `index.css`，导致搜索框样式异常。
2. **CDN 配置**: `_config.butterfly.yml` 的 `CDN.internal_provider` 必须为 `local`。CDN 版 `local-search.min.js` 使用 `.local-search-input`（类选择器），与生成的 `id="local-search-input"` 不匹配。
3. **构建命令**: `pnpm clean && pnpm build`（`hexo clean && hexo generate`）
4. **部署命令**: `npx hexo deploy`（推送到 `Max3753.github.io` 的 master 分支）
5. **构建产物**: `public/`、`.deploy_git/`、`db.json` 永不提交
6. **主题定制**: 不修改 `themes/butterfly/`，通过 `_config.butterfly.yml` 和 `source/css/custom.css` 实现

## 工作流

1. 修改文章 → `source/_posts/*.md`
2. 修改样式 → `source/css/custom.css`
3. 修改配置 → `_config.yml` / `_config.butterfly.yml`
4. 本地验证 → `pnpm build && pnpm server`
5. 部署 → `npx hexo deploy`（或推送到 `source` 分支触发 CI）

## 质量门禁

- `pnpm build` 必须无错误
- 搜索功能必须可用（`search.xml` 存在、CSS 含 `.local-search-box input` 样式）
- 部署后远端与本地一致（注意 CDN 缓存，必要时 Ctrl+F5）