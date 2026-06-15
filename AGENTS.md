# AI Agent Notes

## 项目类型

- 个人网站源码仓库
- 静态站点生成器：Hugo extended
- 主题：LoveIt
- 辅助站点工具：VuePress 2
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

- 本地普通构建：`hugo --destination docs`
- 正式发布构建：`hugo --destination docs --baseURL https://simzhou.com/`
- 本地预览：`hugo server`
- 需要 `Hugo extended`
- VuePress 相关命令见 `package.json`

## 发布约定

- 开发主分支：`main`
- GitHub Pages 使用仓库内 `docs/`
- 发布前必须重新生成 `docs/`
- 发布提交前检查 `docs/sitemap.xml`，不能残留 `localhost:1313`

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
- `content/gallery/index.zh-cn.md`、`content/gallery/index.en.md` 与 `content/gallery/index.ja.md` 主要用于标题和基础元信息

## 已知 override 风险点

- `layouts/_default/baseof.html`：曾因旧版属性名与新版 LoveIt 的 `data-*` 约定不一致，导致 fixed header 顶部间距异常
- `layouts/partials/header.html`：曾使用旧 Hugo/LoveIt 接口，升级后需要对齐当前主题实现
- `layouts/_default/gallery.html`：当前为本地自定义实现，不是主题原生模板；改动时要确认 `assets/album/` 读取、图片处理和 lightgallery 仍可用
- `content/gallery/index.zh-cn.md`、`content/gallery/index.en.md` 与 `content/gallery/index.ja.md`：当前依赖 `layout: "gallery"`；如果移除或改名，`/gallery/` 可能退回普通页面渲染
- 任何直接复制自旧版 LoveIt 的 override 文件，升级主题后都应优先与主题当前同名模板逐项比对

## 本项目新增经验

### VuePress notebook 临时下线

- 当前仓库的 notebook 站点源目录是 `notebook.simzhou.com/`，发布目录是 `docs/notebook/`
- 如果需要临时下线 notebook，不要只改入口，至少做两件事：
  - 在 `config.toml` 里把中英文菜单中的 notebook 入口改到 `"/404.html"` / `"/en/404.html"`
  - 把 `docs/notebook/index.html` 改成直接跳转到 `/404.html`
- 改完菜单后必须重新执行 `hugo --destination docs`，否则主站生成产物里的顶部导航不会同步更新

### 多语言文章图片资源规则

- 本仓库文章通常使用 page bundle：图片与 `index.zh-cn.md` / `index.en.md` 放在同一目录
- LoveIt 的 `image` shortcode 和 markdown 图片渲染会正确走 `.Page.Resources`，优先使用这套机制
- 英文页面生成后，图片 URL 往往会落到 `/posts/...`，而不一定是 `/en/posts/...`；这在本仓库里是正常现象
- 不要假设 Hugo 会把同一组 page bundle 图片复制到中英文两个输出目录
- 即使两篇文章都使用同样的 `{{< image src="..." >}}` 写法，不同 page bundle 的最终解析结果也可能不一致；不要因为另一篇多语言文章显示正常，就假设当前文章也一定安全
- 如果英文页 / 日文页的最终 HTML 里仍然出现裸相对路径（例如 `cursor.png` 而不是 `/posts/.../cursor.png`），并且实际资源只生成在主语言 bundle 路径下，那么外文稿中应优先把这类“共用图片”直接改成稳定的绝对路径 `/posts/...`
- 对语言专属图片，仍优先使用各自语言目录下的绝对路径，例如英文图走 `/en/posts/.../*.en.png`，日文图走 `/ja/posts/.../*.ja.png`

### 日文站点与多语言本地化经验

- 站点现已支持第三语言 `ja`；新增语言时，不要只补文章文件，还要同步补：
  - `config.toml` 中的 `languages.<lang>`
  - `about` / `gallery` 这类静态页
  - 重新执行 `hugo --destination docs`
- 本仓库多语言文章仍遵循 page bundle 规则：在同目录下新增 `index.ja.md`
- `draft: true` 的日文稿不会生成到 `docs/ja/`；检查缺页时先看 front matter，不要误判为构建失败
- 新增日语搜索后，Hugo 会产出：
  - `docs/lib/lunr/lunr.ja.min.js`
  - `docs/lib/lunr/lunr.TinySegmenter.min.js`
- 日语站点的站点级 SEO fallback 依赖：
  - `params.seo.descriptions.ja`
  - `params.seo.keywordsByLang.ja`
  - 否则首页、列表页、分类页、无自定义描述的静态页会回落到默认语言文案
- 本仓库已新增本地 SEO 覆盖：
  - `layouts/_partials/opengraph.html`
  - `layouts/_partials/twitter_cards.html`
  - 这些覆盖的目的，是让多语言页面的 `og:description` / `twitter:description` 跟随当前语言，而不是回落到站点默认中文
- `layouts/_partials/head/breadcrumb-schema.html` 已做多语言修正；列表页 / taxonomy 的 Breadcrumb JSON-LD 不应再残留 `Posts` / `Categories` 这类英文
- 语言切换菜单当前故意保留 `中文 / English / 日本語` 这种混合显示；这是为了误切换后更容易找回原语言，不要为了“视觉统一”轻易改掉

### 并排对比图的正确做法

- 不要在 raw HTML 里手写相对 `img src`
- 当前仓库已新增项目级 shortcode：`layouts/shortcodes/compare-images.html`
- 这个 shortcode：
  - 复用了 LoveIt 的 `plugin/img.html`
  - 通过 `.Page.Resources` 解析图片
  - 保留左右并排布局
  - 保留 lightgallery
  - 能同时稳定支持中文页和英文页
- 以后如果文章里需要两张图横向对比，优先用 `compare-images`，不要重复写 raw HTML

### 图片使用策略

- 如果中英文共用同一张图：
  - 优先使用 `{{< image src="..." >}}` 或 `{{< compare-images ... >}}`
  - 不要手写相对路径 `<img>`
- 如果多语言要使用不同图片：
  - 使用语言区分文件名，例如 `meme1.en.png`、`meme1.zh.jpg`、`meme1.ja.jpg`
  - 构建后检查实际生成路径是否符合预期
- UI 截图和文章大图优先转成 WebP；本仓库已验证 `q65` 对 AudioLens 主界面截图体积和质量较均衡
- 只提交文章实际引用的资源；不要把未引用的大 GIF、测试图、`.DS_Store` 或 `.textClipping` 带进 `content/` / `docs/`
- GIF 体积通常很大，能用静态图或 WebP/视频替代时不要直接发布 GIF
- 外部文章平台可能限制 GIF 帧数；发布前用 `ffprobe` 检查 `nb_frames`，超过 300 帧时优先保持尺寸、降到约 9fps 并再用 `gifsicle -O3 --lossy=80` 优化

### 排查图片问题的方法

- 先看生成产物，不要只看 markdown 源文件：
  - `docs/posts/...`
  - `docs/en/posts/...`
- `docs/ja/posts/...`
- 直接检查最终 HTML 中的 `href` / `data-src`
- 如果英文页 / 日文页里同一篇文章同时出现两种情况：
  - 一部分图片是 `/posts/...` 或 `/en/posts/...` / `/ja/posts/...`
  - 另一部分图片仍是裸文件名相对路径
  则优先怀疑是该 page bundle 的资源解析不稳定，而不是浏览器缓存问题
- 任何图片相关修改后，都重新执行 `hugo --destination docs`
- 发布前如需更新 `docs/sitemap.xml`，使用 `hugo --destination docs --baseURL https://simzhou.com/`，避免把 `hugo server` 的 `localhost` 写入产物

### 本环境下 git 操作经验

- 不要并行触发 `git commit` 和 `git push`
- 正确流程是串行执行：
  - 先 `git add` / `git commit`
  - 明确确认提交成功生成
  - 再执行 `git push origin main`
- 如果 `git commit` 和 `git push` 并行触发，可能出现 push 先执行、输出 `Everything up-to-date` 的情况
- 后续在这个仓库里发布改动时，`git push` 必须放在 commit 成功之后，作为后续阻塞操作执行

### 依赖与安全审计

- 本仓库 npm registry 指向 npmmirror 镜像，**它未实现 audit 端点**：本地直接 `npm audit` 会返回 `NOT_IMPLEMENTED` 或空输出，**不能据此判断漏洞已清除**
  - 查真实漏洞：`npm audit --registry=https://registry.npmjs.org/`
- 修复 npm 间接依赖漏洞优先用 `package.json` 的 `overrides` 强制版本（已含 `vite`、`picomatch`，后补 `esbuild`、`postcss`）；改完 `npm install` 重新解析 lock，npm 会自动 dedupe 统一版本
- 升级 `vite` / `esbuild` / `postcss` 这类构建核心依赖后，必须跑一次 `npm run buildNotebook` 验证构建未损坏
- GitHub Dependabot 扫描异步滞后：`git push` 返回的漏洞统计可能是旧 lock 快照；判断漏洞是否真消除用 `gh api 'repos/SimZhou/simzhou.github.io/dependabot/alerts?state=open'` 看 open 列表

### VuePress 状态更新

- `notebook.simzhou.com/` 已迁移到 VuePress 2 构建链，不再维护 VuePress 1
- 根目录 `package.json` 里的 notebook 构建命令当前使用 `vuepress next`
- 旧版 VuePress 1 依赖链曾是 npm audit / GitHub Dependabot 高危告警的重要来源；后续不要再回退到 VuePress 1

### 当前 notebook 下线策略

- notebook 目前处于临时下线状态
- 主站导航中的 “笔记本 / Notebook” 入口已经改到主站 404：
  - 中文：`/404.html`
  - 英文：`/en/404.html`
- 发布目录中的 `docs/notebook/index.html` 也被替换为跳转到 `/404.html`
- 如果将来重新上线 notebook，需要同时恢复：
  - `config.toml` 中的中英文菜单链接
  - `docs/notebook/` 的真实构建产物

### 已完成的全站 SEO 基础改造

- `config.toml` 已切到正式 `https` 根地址：`https://simzhou.com/`
- 已启用并覆盖 `robots.txt`
- 已生成并发布 `sitemap.xml`
- `<head>` 已补齐基础 SEO 元信息：
  - `description`
  - `keywords`
  - `author`
  - `robots`
  - `canonical`
  - `hreflang`
  - `x-default`
- 已补齐站点级与文章级 JSON-LD 结构化数据
- 已新增 `BreadcrumbList` 结构化数据 partial：
  - `layouts/_partials/head/breadcrumb-schema.html`
- 与 SEO 相关的本地覆盖主要集中在：
  - `layouts/baseof.html`
  - `layouts/robots.txt`
  - `layouts/_partials/head/meta.html`
  - `layouts/_partials/head/link.html`
  - `layouts/_partials/head/seo.html`
  - `layouts/_partials/head/breadcrumb-schema.html`

### 搜索引擎收录与验证状态

- Google / Bing / 百度的优化工作要区分三类：
  - 抓取与发现：`robots.txt`、`sitemap.xml`
  - 验证：站长平台文件或 meta / DNS 验证
  - 主动提交：IndexNow、站长平台 URL 提交
- 当前已接入或已准备好的验证/提交资源：
  - 百度验证文件：`static/baidu_verify_ScTCY6Ajb4.html`
  - Bing 验证文件：`static/BingSiteAuth.xml`
  - IndexNow key 文件：`static/2696c9db-b5a7-457c-b5d5-08557966975a.txt`
- 发布后对应线上地址是：
  - `https://simzhou.com/baidu_verify_ScTCY6Ajb4.html`
  - `https://simzhou.com/BingSiteAuth.xml`
  - `https://simzhou.com/2696c9db-b5a7-457c-b5d5-08557966975a.txt`

### Google Search Console 重定向页经验

- Search Console 里的“网页会自动重定向”不一定是故障
- 对本仓库来说，以下 URL 被标成重定向页通常是正常收敛：
  - `http://simzhou.com/*`
  - `http://www.simzhou.com/*`
  - `https://www.simzhou.com/*`
  - 无尾斜杠目录 URL，例如 `https://simzhou.com/gallery`
- 判断是否真有问题时，先检查三件事：
  - `config.toml` 的 `baseURL` 是否仍是规范域名 `https://simzhou.com/`
  - 页面 canonical 是否指向规范 URL
  - sitemap 是否只提交规范 URL，而不是 `http` / `www` / 无尾斜杠版本
- 如果规范 URL 已可访问且可索引，这类重定向页通常不需要单独“修复”
- 更值得修的是站内残留的旧绝对链接，例如 front matter 里的 `http://simzhou.com/about`

### 404 与下线页索引策略

- 404 页面不应继续输出 `index,follow`，当前仓库已在 `layouts/_partials/head/meta.html` 中对 `.Kind == "404"` 输出 `noindex,nofollow`
- notebook 下线跳转页 `docs/notebook/index.html` 也应显式输出 `noindex,nofollow`
- 以后如果再做临时下线页、占位页或跳转页，优先检查最终生成 HTML 的 `<meta name="robots">`，不要只看模板源文件
- 涉及搜索收录问题时，排查顺序应优先看生成产物：
  - `docs/404.html`
  - `docs/en/404.html`
  - `docs/notebook/index.html`

### IndexNow 接入方式

- 仓库已接入 IndexNow，采用官方 key 文件 + POST API 的最小闭环方案
- 已有手动提交脚本：
  - `scripts/submit_indexnow.sh`
- 已有变更 URL 收集脚本：
  - `scripts/collect_indexnow_urls.sh`
- 已有 GitHub Actions 自动提交流程：
  - `.github/workflows/indexnow.yml`
- 当前自动化逻辑：
  - 监听 `main` 分支 push
  - 比较 push 前后 `docs/*.html` 的差异
  - 将变更页面路径映射为公开 URL
  - 自动调用 `submit_indexnow.sh` 提交到 IndexNow
- 本地手动调用格式：
  - `scripts/submit_indexnow.sh https://simzhou.com/some-page/`
- `collect_indexnow_urls.sh` 的路径映射规则：
  - `docs/index.html` -> `https://simzhou.com/`
  - `docs/en/index.html` -> `https://simzhou.com/en/`
  - 目录页 `.../index.html` -> 对应目录 URL，并补尾部 `/`
  - 跳过 `404.html`

### Bing Webmaster 经验

- Bing 的 XML 文件验证要求文件位于站点根目录；本仓库正确做法是把验证文件放到 `static/`
- 不要把用户手工下载后临时放在仓库根目录的 `BingSiteAuth.xml` 直接当发布文件使用
- 正确流程：
  - 读取根目录临时文件内容
  - 同步到 `static/BingSiteAuth.xml`
  - 重新 `hugo --destination docs`
  - 确认 `docs/BingSiteAuth.xml`
  - 再提交和推送
- Bing 的 SEO 提示里：
  - `Indexed successfully` 说明收录链路是通的
  - `More than one h1 tag` 值得优先处理
  - `Title too short` 次一级处理即可

### H1 层级优化经验

- LoveIt 默认 `themes/loveit/layouts/summary.html` 会在列表页把每篇摘要标题渲染成 `h1`
- 这会导致首页和列表页出现多个 `h1`，容易被 Bing 报 `More than one h1 tag`
- 当前仓库已新增本地覆盖：
  - `layouts/summary.html`
- 该覆盖的核心策略是：
  - 列表页摘要标题从 `h1` 降为 `h2`
  - 单篇文章页主标题仍保留 `h1`
- 文章正文中如果已经有页面主标题，正文小节应尽量从 `##` 开始
- 以后如果 Bing 再报多 `h1`，先检查：
  - 列表模板
  - 单篇页模板
  - markdown 正文是否误用过多一级标题

### 文章与样式相关经验

- 文章正文 `h1` 到 `h4` 的“标题前间距”已在 `assets/css/_custom.scss` 中调大；标题后间距未调
- 麻将文章中那句对比说明已经改成单独一行的辅助说明，使用 `post-note` 样式，灰色、缩小、居中显示
- 以后如果要做类似“补充说明/注释”，优先复用 `post-note` 样式，而不是写内联样式

### SEO / 站长平台后续优先级

- 当前已经完成的技术层工作：
  - 基础 meta
  - canonical / hreflang
  - sitemap / robots
  - Article / Breadcrumb JSON-LD
  - IndexNow
  - Bing / 百度验证文件准备
- 后续若继续推进，优先级建议：
  - 先完成 Google Search Console / Bing / 百度的站点验证与 sitemap 提交
  - 再补历史文章的 `description`、高质量封面图和英文内容质量
  - 最后才处理低优先级的首页 title 微调或更细碎的 SEO 提示

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
