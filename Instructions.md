# 网站维护说明

本文档面向日常维护者，说明这个网站项目的常见操作方式，包括构建、更新、部署，以及新增文章、相册内容和页面内容时的基本流程。

# 一、项目用途与整体结构

这个仓库是个人网站的源码仓库，同时也跟踪构建后的静态页面产物。

当前网站的主要组成如下：

- 主站框架：[Hugo](https://github.com/gohugoio/hugo) [[文档](https://gohugo.io/)]
- 主题：[LoveIt](https://github.com/dillonzq/loveit) [[文档](https://hugoloveit.com/)]
- 辅助内容站点：VuePress 1
- GitHub Pages 发布目录：`docs/`

常用目录说明：

- `content/`：网站正文内容
- `content/posts/`：文章内容
- `content/about/`：关于页内容
- `content/gallery/`：相册页内容
- `layouts/`：本地模板覆盖与自定义模板
- `assets/`：自定义样式、图片等资源
- `static/`：原样复制到网站输出目录的静态文件
- `themes/loveit/`：LoveIt 主题子模块
- `docs/`：构建后用于 GitHub Pages 发布的静态文件
- `resources/_gen/`：Hugo 生成的资源缓存
- `notebook.simzhou.com/`：VuePress 相关内容

# 二、本地环境要求

本项目日常维护通常需要以下工具：

- Hugo extended
- Node.js
- Yarn
- VuePress 1

主站构建依赖 Hugo。
如果需要构建 VuePress 部分，则还需要 Node.js/Yarn。

# 三、常用命令

## 1. 本地主站预览

```bash
hugo server
```

如果需要包含草稿内容：

```bash
hugo server -D
```

如果希望关闭 Fast Render：

```bash
hugo server --disableFastRender
```

或：

```bash
hugo server -D --disableFastRender
```

## 2. 主站构建

推荐直接使用：

```bash
hugo --destination docs
```

构建完成后，静态文件会输出到 `docs/` 目录。

## 3. 本地查看构建后的静态文件

```bash
python -m http.server --directory docs
```

## 4. 使用 `package.json` 中的脚本

仓库中还保留了以下脚本：

```bash
yarn dev
yarn build
yarn devNotebook
```

其中：

- `yarn dev`：运行 Hugo 本地开发服务
- `yarn build`：执行站点构建流程
- `yarn devNotebook`：运行 VuePress 本地服务

# 四、Shortcodes 速查

本项目写文章时，可以使用 Hugo 内置 shortcodes，也可以使用 LoveIt 主题额外提供的 shortcodes。

## 1. Hugo 官方内置 shortcodes

按当前 Hugo 官方文档（v0.157.0）可用的内置 shortcodes 包括：

- `details`
- `figure`
- `highlight`
- `instagram`
- `param`
- `qr`
- `ref`
- `relref`
- `vimeo`
- `x`
- `youtube`

说明：

- 这些 shortcode 的用法以 Hugo 官方文档为准
- 其中 `ref` / `relref` 常用于站内链接
- `figure` 常用于普通图片插入
- `highlight` 常用于代码块高亮
- `instagram`、`vimeo`、`x`、`youtube` 属于嵌入型 shortcode

## 2. LoveIt 主题提供的 shortcodes

按当前仓库中的主题目录 `themes/loveit/layouts/_shortcodes/`，LoveIt 提供以下 shortcodes：

- `admonition`
- `bilibili`
- `echarts`
- `gist`
- `highlight`
- `image`
- `link`
- `mapbox`
- `mermaid`
- `music`
- `person`
- `raw`
- `script`
- `style`
- `typeit`
- `version`

常用建议：

- 图片优先使用 `image`
- 提示块/说明块优先使用 `admonition`
- Mermaid 图表使用 `mermaid`
- ECharts 使用 `echarts`
- 需要主题风格化链接时可用 `link`
- 需要直接插入原始 HTML/脚本/样式时，分别看 `raw`、`script`、`style`

注意：

- `highlight` 在 Hugo 和 LoveIt 中都存在；如果遇到样式或输出差异，以当前站点实际渲染为准
- LoveIt 的 shortcode 是否可用，最终以当前主题版本源码为准
- 主题升级后，应重新检查 `themes/loveit/layouts/_shortcodes/` 中是否有新增、删除或参数变化

# 五、部署方式

当前网站通过 GitHub Pages 部署，发布目录为仓库中的 `docs/`。

典型发布流程如下：

1. 在本地修改内容或模板
2. 运行构建命令，更新 `docs/`
3. 检查页面是否正常
4. 提交源码和 `docs/` 变更
5. 推送到远端仓库
6. 等待 GitHub Pages 自动发布

如果是普通内容更新，通常只需要：

```bash
hugo --destination docs
git add .
git commit -m "..."
git push
```

# 六、分支维护建议

如果是以下类型的改动，建议新开分支验证后再合并：

- 升级 Hugo 版本
- 升级 LoveIt 主题版本
- 修改 `layouts/` 中的模板
- 修改 `assets/` 中的样式
- 修改站点结构、导航、页面框架

推荐流程：

1. 从 `main` 新建分支
2. 在分支上修改并构建 `docs/`
3. 将 GitHub Pages 临时切到该分支的 `docs/`
4. 在线验证页面表现
5. 验证通过后再合并回 `main`

# 七、如何新增文章

文章内容放在：

```text
content/posts/
```

当前项目采用“文章一个目录”的组织方式。通常建议按年份分目录，再按文章 slug 建目录，例如：

```text
content/posts/2026/my-new-post/
```

在这个目录中通常包含：

- `index.zh-cn.md`：中文正文
- `index.en.md`：英文正文（如果有）
- 文章配图、封面图、附件等资源文件

推荐做法：

1. 新建文章目录
2. 写入 `index.zh-cn.md`
3. 如需双语，再补 `index.en.md`
4. 将文章中使用的图片放在同目录下
5. 运行 `hugo --destination docs` 验证

示例结构：

```text
content/posts/2026/my-new-post/
├── index.zh-cn.md
├── index.en.md
├── cover.png
└── image-1.png
```

说明：

- 同目录资源适合在文章中直接引用
- 封面图也通常与文章正文放在同一个目录下
- 如果是正文配图，优先使用 LoveIt 的 `image` shortcode，例如：

```markdown
{{< image src="example.jpg" width="60%" >}}
```

- 如果希望点击图片时使用 LoveIt 原生图片浏览器，而不是普通跳转，记得在该文章页面的 front matter 中启用：

```toml
lightgallery: true
```

# 八、如何新增相册内容

当前相册照片主要放在：

```text
assets/album/
```

当前相册页会自动读取 `assets/album/` 中的图片，并生成缩略图和点击放大预览。

常见维护方式如下：

## 1. 新增或替换相册照片

直接把照片放入：

```text
assets/album/
```

然后执行：

```bash
hugo --destination docs
```

构建后，相册页会自动更新。

建议：

- 尽量使用常见图片格式，例如 `.jpg`、`.jpeg`、`.png`
- 文件名尽量避免过于混乱，方便后续排序或整理
- 如果一次新增较多照片，建议构建后在线检查缩略图和放大效果

## 2. 修改相册首页标题或基础信息

直接编辑：

- `content/gallery/index.zh-cn.md`
- `content/gallery/index.en.md`

适用于修改相册页标题、subtitle、多语言内容等。

## 3. 如有需要，再扩展为独立相册子页面

可以在 `content/gallery/` 下新增一个独立内容页，例如：

```text
content/gallery/my-album/
├── index.zh-cn.md
├── index.en.md
├── image1.jpg
└── image2.jpg
```

这种方式适合未来做“分专题相册”或“独立相册文章”，但当前默认展示方式仍然是 `assets/album/` 自动相册网格。

# 九、如何修改现有页面内容

## 1. 关于页

编辑：

- `content/about/index.zh-cn.md`
- `content/about/index.en.md`

## 2. 首页展示内容

首页内容和站点参数主要来自：

- `config.toml`
- 主题模板
- 首页相关内容页

如果是导航、语言菜单、站点标题、页脚等，通常需要改 `config.toml`。

## 3. 文章页正文

直接修改对应文章目录中的：

- `index.zh-cn.md`
- `index.en.md`

# 九、如何修改导航、站点参数和基础配置

主配置文件是：

```text
config.toml
```

常见修改内容包括：

- 网站标题
- 菜单导航
- 多语言配置
- 评论系统配置
- 页脚信息
- `publishDir`
- `baseURL`

如果需要修改站点菜单，一般修改 `languages.zh-cn.menu.main` 和 `languages.en.menu.main` 下的内容。

# 十、如何修改模板和样式

## 1. 模板

本地覆盖模板位于：

```text
layouts/
```

这些文件会覆盖主题默认模板。

修改模板时要注意：

- 当前主题是 LoveIt
- 本地覆盖模板需要与当前主题版本保持兼容
- 升级主题后，旧模板接口可能失效

如果页面布局出现异常，应优先检查：

- `layouts/_default/baseof.html`
- `layouts/partials/header.html`
- 其他覆盖主题默认模板的文件

## 2. 样式

自定义样式位于：

```text
assets/css/
```

如需添加站点级样式调整，可以优先考虑：

- `assets/css/_custom.scss`
- `assets/css/_override.scss`

# 十一、静态文件与额外资源

如果某些文件需要原样出现在最终网站根目录，可以放在：

```text
static/
```

例如：

- `CNAME`
- 验证文件
- 独立静态资源

这些文件在构建时会直接复制到 `docs/`。

# 十二、维护时的注意事项

1. 修改模板、主题、Hugo 版本后，一定要重新构建 `docs/`
2. 不要只看本地编译通过，还要检查实际页面效果
3. 升级 LoveIt 或 Hugo 后，要特别留意本地 `layouts/` 覆盖模板是否仍兼容
4. GitHub Pages 发布目录是 `docs/`，因此发布前必须确认 `docs/` 已更新
5. 如果是结构性改动，建议使用分支进行发布验证

# 十三、推荐的日常更新流程

对于普通文章或页面内容更新，推荐流程如下：

1. 修改内容文件
2. 执行：

```bash
hugo --destination docs
```

3. 本地检查页面
4. 提交代码：

```bash
git add .
git commit -m "Update content"
git push
```

对于模板、主题或站点结构更新，推荐流程如下：

1. 新建分支
2. 修改模板或配置
3. 执行构建
4. 将分支作为 GitHub Pages 临时发布源验证
5. 验证通过后合并回主分支
