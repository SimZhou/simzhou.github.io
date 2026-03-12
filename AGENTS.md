# AI Agent Notes

## 项目类型

- 个人网站源码仓库
- 静态站点生成器：Hugo extended
- 主题：LoveIt
- 辅助站点工具：VuePress 1
- 发布方式：GitHub Pages，发布目录为 `docs/`

## 关键目录

- `content/`：主站内容
- `content/posts/`：文章
- `content/gallery/`：相册页元信息
- `layouts/`：本地模板覆盖
- `assets/`：样式、图片、相册源文件
- `assets/album/`：相册图片源目录
- `static/`：原样复制到输出目录
- `themes/loveit/`：LoveIt 子模块
- `docs/`：最终发布产物
- `resources/_gen/`：Hugo 资源缓存
- `notebook.simzhou.com/`：VuePress 内容

## 构建命令

- 构建：`hugo --destination docs`
- 本地预览：`hugo server`
- 需要 `Hugo extended`
- VuePress 相关命令见 `package.json`

## 发布约定

- 开发主分支：`main`
- GitHub Pages 使用仓库内 `docs/`
- 发布前必须重新生成 `docs/`

## 维护规则

- 优先保持 `layouts/` 与当前 LoveIt 接口兼容
- 升级 Hugo 或 LoveIt 后，必须重新构建并检查实际页面表现
- 模板、主题、页面框架类改动，不能只看构建成功，必须验证线上渲染
- 本地覆盖模板如果与主题接口冲突，优先对齐主题当前实现，而不是继续保留旧写法

## LoveIt 维护要点

- LoveIt 页面参数通常按 `.Params | merge .Site.Params.page` 合并；页面 front matter 会覆盖站点级默认值
- 常见页面参数包括：`subtitle`、`featuredImage`、`featuredImagePreview`、`lightgallery`、`comment`、`toc`、`code`、`share`、`math`
- 评论、CDN、`fingerprint` 在非 `production` 环境下可能被主题主动禁用；本地 `hugo server` 与线上表现可能不同
- 多语言页面使用 `index.zh-cn.md`、`index.en.md` 这类语言后缀文件；菜单和页面翻译不应假设自动 fallback
- 涉及 header、fixed buttons、主题初始化、data attributes、partial 结构等改动时，应优先查看当前主题源码实现，再决定是否保留本地 override
- 如果某个 override 只是复制旧版主题模板，升级后应优先删减或对齐，而不是继续累积兼容补丁

## Shortcodes

- Hugo v0.157.0 官方内置 shortcodes：`details`、`figure`、`highlight`、`instagram`、`param`、`qr`、`ref`、`relref`、`vimeo`、`x`、`youtube`
- 当前仓库 `themes/loveit/layouts/_shortcodes/` 提供的 LoveIt shortcodes：`admonition`、`bilibili`、`echarts`、`gist`、`highlight`、`image`、`link`、`mapbox`、`mermaid`、`music`、`person`、`raw`、`script`、`style`、`typeit`、`version`
- 使用策略：
  - 通用 Hugo 能力优先查 Hugo 官方文档
  - 主题特有 shortcode 以及与主题样式/JS耦合的能力，优先查 LoveIt 文档和当前主题源码
  - `highlight` 在 Hugo 和 LoveIt 中都存在；涉及渲染差异时，以当前主题实际输出为准
  - `image` 是当前站点最推荐的图片 shortcode，支持宽度、caption、链接等主题集成功能
  - 若希望 `image` 使用 LoveIt 原生图片浏览器，页面 front matter 需启用 `lightgallery: true`

## 当前相册实现

- 相册页默认读取 `assets/album/`
- 构建时会生成缩略图和放大图到 `docs/album/`
- `content/gallery/index.zh-cn.md` 与 `content/gallery/index.en.md` 主要用于标题和基础元信息

## 已知 override 风险点

- `layouts/_default/baseof.html`：曾因旧版属性名与新版 LoveIt 的 `data-*` 约定不一致，导致 fixed header 顶部间距异常
- `layouts/partials/header.html`：曾使用旧 Hugo/LoveIt 接口，升级后需要对齐当前主题实现
- `layouts/_default/gallery.html`：当前为本地自定义实现，不是主题原生模板；改动时要确认 `assets/album/` 读取、图片处理和 lightgallery 仍可用
- `content/gallery/index.zh-cn.md` 与 `content/gallery/index.en.md`：当前依赖 `layout: "gallery"`；如果移除或改名，`/gallery/` 可能退回普通页面渲染
- 任何直接复制自旧版 LoveIt 的 override 文件，升级主题后都应优先与主题当前同名模板逐项比对

## 检索入口

必要时查官方资料或用 Context7 MCP：

- Hugo: <https://github.com/gohugoio/hugo>
- Hugo Docs: <https://github.com/gohugoio/hugoDocs>
- LoveIt: <https://github.com/dillonzq/loveit>
- LoveIt Docs: <https://hugoloveit.com/>

## 操作偏好

- `AGENTS.md` 面向 AI；`Instructions.md` 面向人
- 说明类内容放 `Instructions.md`
- 决策约束、目录约定、构建规则放 `AGENTS.md`
