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

## 当前相册实现

- 相册页默认读取 `assets/album/`
- 构建时会生成缩略图和放大图到 `docs/album/`
- `content/gallery/index.zh-cn.md` 与 `content/gallery/index.en.md` 主要用于标题和基础元信息

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
