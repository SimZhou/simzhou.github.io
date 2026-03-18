---
title: "我用 Codex 做了一个日麻教程手册网站"
subtitle: ""
date: 2026-03-18T12:35:00+08:00
lastmod: 2026-03-18T12:35:00+08:00
draft: false
author: "SimZhou"
authorLink: "https://github.com/SimZhou"
description: "一篇关于如何使用 Codex 协助搭建和维护日麻教程手册网站的文章。"

tags: ["AI", "Codex", "Agent", "日麻", "立直麻将"]
categories: ["AI", "Projects"]

hiddenFromHomePage: false
hiddenFromSearch: false

toc:
  enable: true
math:
  enable: false
lightgallery: true
license: ""
---

最近，我用 Codex 做了一个日麻入门网站：<https://simzhou.com/riichi_mahjong_book/>。
<!--more-->
源码仓库在这里：<https://github.com/SimZhou/riichi_mahjong_book>。

# 背景

起因是最近入坑了雀魂，发现老是给人点炮，于是打算怒卸游戏（不是）

打算好好学习一下日麻技术（认真脸）

于是找到一个似乎是日本比较知名的立直麻将教学网站：<http://beginners.biz/>

之前似乎被一个叫79的博客转载翻译过，但是那个网站似乎已经被关闭了，所以我就想着自己搭建了一个网站。

# 使用Codex搭建网站

使用Codex做这个事情，真的非常简单。Codex尤其擅长这种简单的前后端任务。

基本上就是用下面一句话，就把项目初始化起来了：

```
请帮我根据http://beginners.biz/网页，做一个日麻教程手册网站。
```

# 一个重要的踩坑点

最初使用 Codex+ GPT5.4 模型进行搭建的时候，直接让模型对网页进行逐页翻译然后做成网页，

网页的前后端是没有任何问题的，

但发现翻译排版效果差强人意，

**不是这边丢了一张示意图，就是那边少了一些内容，或者翻译加了些自己的理解，甚至翻译错误**，

**并且让模型自己抽查了好几次，都没有完全解决，**

下面是一个翻译后丢失了原始页面示意图的例子：

{{< raw >}}
<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:flex-start; margin:1.5rem 0;">
  <figure style="flex:1 1 320px; margin:0;">
    <a href="Missing_figures--Original.png" data-lightgallery="item" title="原始网页，麻将牌的示意图">
      <img src="Missing_figures--Original.png" alt="原始网页，麻将牌的示意图" style="display:block; width:100%; height:auto;">
    </a>
    <figcaption class="image-caption">原始网页，麻将牌的示意图</figcaption>
  </figure>
  <figure style="flex:1 1 320px; margin:0;">
    <a href="Missing_figures--Observed.png" data-lightgallery="item" title="翻译后网页，麻将牌示意图发生了丢失">
      <img src="Missing_figures--Observed.png" alt="翻译后网页，麻将牌示意图发生了丢失" style="display:block; width:100%; height:auto;">
    </a>
    <figcaption class="image-caption">翻译后网页，麻将牌示意图发生了丢失</figcaption>
  </figure>
</div>
{{< /raw >}}

我心想，翻译这个问题，对大模型来说应该若干年前就不是难事了，

尤其是对于GPT5.4这种当前最领先的模型之一，不应该出现这么低级的错误。

**于是，我尝试创建了一个Skill，一切突然就变得容易了起来。**

# 使用Skill后的效果

我使用codex的`$skill-creator`，让它创建了一个Skill，大致告诉他：
 - 输入是原始日文的网页，输出为目标语言的网页
 - 尽量按照原来的含义翻译网页，不要加入自己的理解，也不能丢失内容
 - 不能丢失原文中的任何示意图
 - 不能改变网页的布局和样式，如果有表格等结构也要保留

结果，翻译后的网页无论是翻译还是排版效果都非常完美，贴近原文，没有任何问题。

以下是对比图 (其中左边是最初生成的页面，中间是使用了Skill后的结果，右边是原始日文页面)：

{{< image src="Fixed_Comparation_01.png" caption="(示例1) 左:最初生成的页面 vs 中:修正后的页面 vs 右:原始日文页面" width="100%" >}}

{{< image src="Fixed_Comparation_02.png" caption="(示例2) 左:最初生成的页面 vs 中:修正后的页面 vs 右:原始日文页面" width="100%" >}}

明显可以看到，修正后的页面效果与原网页已经比较接近，内容和版式都能较好保留。

内容长度也基本一致，不会多内容或者少内容。

(最后优化后的Skill文件见: [translate-japanese-webpage/SKILL.md](https://github.com/SimZhou/riichi_mahjong_book/blob/main/.agents/skills/translate-japanese-webpage/SKILL.md))

# 总结

目前这样的一个简单任务，Codex已经可以做的相当好。

美中不足的是，全程我还是需要不停的给Codex敲回车。

后续可以探索一下多Agent/SubAgent功能，指派一个Agent负责进行内容监督工作，另一个Agent负责进行网页翻译排版工作。

这样就可以解放双手，真正实现AI自动工作了。
