# 项目概述

这个仓库是一个个人网站项目，用于构建静态站点并发布到 GitHub Pages。

# 项目用途

该项目作为个人网站的源码仓库维护，同时也跟踪构建后的静态产物。仓库主要用于本地编辑、本地预览、静态构建，以及基于 `docs/` 目录的直接发布。

# 框架与技术栈

- 静态站点生成器：Hugo
- 主题：LoveIt
- 辅助文档/笔记站点工具：VuePress 1
- 前端资源：主题自带 SCSS、JavaScript，以及 Hugo Pipes 生成资源
- 部署目标：GitHub Pages

# 参考资料与检索

在进行开发、排错、升级或模板适配时，如有必要，可优先查阅以下资料：

- Hugo 框架 GitHub 地址：<https://github.com/gohugoio/hugo>
- Hugo 文档仓库地址：<https://github.com/gohugoio/hugoDocs>
- LoveIt 主题 GitHub 地址：<https://github.com/dillonzq/loveit>
- LoveIt 主题文档地址：<https://hugoloveit.com/>

补充说明：

- 上述 Hugo 和 LoveIt 相关项目在 Context7 中可以检索到。
- 如果本地经验不足以确认某个 Hugo API、LoveIt 模板接口或配置项用法，应优先查官方仓库、官方文档，或通过 Context7 MCP 检索。
- 涉及主题升级、模板覆盖兼容、Hugo 新版本行为变化时，不应只凭记忆修改，应先检索再改动。

# 仓库结构

- `content/`：Hugo 主站内容
- `layouts/`：本地模板覆盖和自定义模板
- `assets/`：自定义样式和图片资源
- `static/`：原样复制到输出目录的静态文件
- `themes/loveit/`：以 git submodule 方式引入的 LoveIt 主题
- `docs/`：GitHub Pages 使用的构建产物输出目录
- `resources/_gen/`：由 Hugo 生成并在仓库中跟踪的资源缓存
- `notebook.simzhou.com/`：构建流程中使用的 VuePress 内容目录

# 构建与预览

- 主站构建：
  - `hugo --destination docs`
- 主站本地预览：
  - `hugo server`
- 本地环境要求：
  - 需要使用 Hugo extended 版本
- VuePress 相关命令定义在 `package.json` 中

# 部署方式

- 仓库设计为通过 `docs/` 目录发布 GitHub Pages。
- 当前约定使用本地 `main` 分支进行开发，实际发布分支以 GitHub Pages 配置为准。

# 维护说明

- `layouts/` 中的本地模板覆盖需要与当前 LoveIt 主题接口保持兼容。
- 升级 Hugo 或 LoveIt 后，应始终重新生成 `docs/`，并在合并前验证 GitHub Pages 的实际渲染结果。
- 涉及主题结构、模板接口或页面框架的改动，不能只依赖本地构建成功，还需要验证最终 Pages 页面表现。
