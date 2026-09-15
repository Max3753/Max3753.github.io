# Harness 契约 — Max3753 博客

> 本文件是项目的 Harness 契约（source=0，最高优先级）。所有开发活动必须遵守。

## 项目基线

- **项目类型**: 静态博客（Hexo 7.3.0 + Butterfly 5.4.2）
- **语言**: JavaScript (Node.js ≥ 22), Markdown, Stylus, EJS/Pug
- **包管理器**: pnpm
- **部署目标**: GitHub Pages (`Max3753.github.io`, master 分支)
- **源码分支**: `source`（GitHub Actions 自动构建部署）

## 架构基线（不可违反）

1. **内容与配置分离**
   - 文章内容 → `source/_posts/*.md`
   - 站点配置 → `_config.yml`
   - 主题配置 → `_config.butterfly.yml`
   - 自定义样式 → `source/css/custom.css`
   - 自定义脚本 → `source/js/custom.js`

2. **构建产物不入库**
   - `public/` 和 `.deploy_git/` 永远不提交到 `source` 分支
   - 部署由 GitHub Actions 或本地 `hexo deploy` 完成

3. **搜索功能依赖链**
   - `_config.yml` 的 `search.use` 必须为 `local_search`（否则搜索 CSS 不编译）
   - `search.xml` 由 `hexo-generator-search` 生成，构建后必须存在
   - 内部资源使用 `internal_provider: local`（CDN 版本选择器不兼容）

4. **主题文件只读**
   - `themes/butterfly/` 是第三方主题，不直接修改
   - 定制通过 `_config.butterfly.yml` 或 `source/css/custom.css` 实现

## 质量门禁

- [ ] `pnpm build` 无错误
- [ ] `search.xml` 生成且包含全部文章
- [ ] `public/css/index.css` 包含 `#local-search .search-dialog .local-search-box input` 样式
- [ ] 本地 `pnpm server` 验证搜索功能正常
- [ ] 部署后远端页面与本地一致

## 部署流程

```bash
pnpm clean && pnpm build   # 1. 清理并构建
npx hexo deploy            # 2. 推送到 GitHub Pages
```

## 变更追踪

每次变更必须记录：
- 改了什么文件
- 为什么改（需求/缺陷编号）
- 如何验证（构建/测试/手动验证）