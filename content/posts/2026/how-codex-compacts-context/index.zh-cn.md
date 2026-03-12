---
title: "研究 Codex 的上下文压缩是如何工作的"
subtitle: "对 Kangwook Lee 一篇 X Article 的中文翻译"
date: 2026-03-12T12:05:06+08:00
lastmod: 2026-03-12T12:05:06+08:00
draft: false
author: "Simon"
authorLink: ""
description: ""

tags: ["AI", "LLM", "Codex", "Agent", "Context Engineering"]
categories: ["AI"]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: ""
featuredImagePreview: ""

toc:
  enable: true
math:
  enable: false
lightgallery: false
license: ""
---
原文作者：Kangwook Lee  
原始链接：<https://x.com/Kangwook_Lee/article/2028955292025962534>

下面是基于我本地保存的 `article.html` 做的中文翻译。原文中的截图、流程图和代码截图这里暂时不内嵌，只保留正文内容与结构。
<!--more-->

对于非 codex 模型，开源 Codex CLI 会在本地做上下文压缩：它用一个 LLM 配合 compaction prompt 对对话进行总结。之后在使用压缩后的上下文时，`responses.create()` 会收到一段 handoff prompt，用来为这份 summary 提供框架。这两个 prompt 都可以在源码中看到。

而对于 codex 模型，CLI 则会调用 `compact()` API，它返回的是一个加密后的 blob。我们并不知道它内部是否也用了 LLM、具体用了什么 prompt，甚至不知道是否存在 handoff prompt。

下面我会展示：只用一个非常简单的 prompt injection（2 次 API 调用，35 行 Python），就能揭示 API 这条压缩路径确实使用了一个 LLM 来总结上下文，而且它也有自己的 compaction prompt，并且在 summary 前面还加上了 handoff prompt。更重要的是，这些 prompt 和开源版本几乎是一样的。

## Step 1 — compact()

我先用一条专门构造过的用户消息调用 `compact()`。在服务端，一个负责压缩的 compactor LLM 会使用它自己的隐藏 system prompt 来处理我们的输入。我之前从未见过这个 system prompt，而这正是我想搞清楚的东西。

从行为上看，服务端似乎会以某种类似下面的方式来组装 compactor 的上下文。

compactor LLM 会把自己的 system prompt 和我们的输入一起读进去。由于我们的输入里包含了一段 injection payload，compactor 会被诱导把它自己的 system prompt 也写进输出中。这份明文 summary 只存在于 OpenAI 的服务器上。我们客户端能看到的，只有那个加密后的 blob。

在这一步，我们还没有办法知道 blob 里面到底是什么。它是用 AES 加密的，而密钥保存在 OpenAI 的服务器上。我们唯一能做的，就是希望 compactor 确实听从了 injection，把它的 prompt 写进了 summary 里。要验证这件事，就只能进入第二步。

## Step 2 — create()

我把加密后的 blob，加上另一条新的用户消息，一起传给 `responses.create()`。服务端会先把 blob 解密，再组装模型最终看到的上下文。

我发送的是一条专门设计的探针消息。

而模型在服务端看到的上下文，大致上应该会像另一张图里展示的那样。

如果第一步成功了，那么解密后的 blob 里就应该包含 compaction prompt，也就是被 injection 泄露出来的那部分内容。与此同时，服务端还会在这个 blob 前面再额外加上一段 handoff prompt。于是，只要我们的探针能够让模型复述它所看到的内容，最终输出里就应该能同时暴露出三样东西：

- system prompt
- handoff prompt
- compaction prompt

## Output

下面展示的是 `extract_prompts.py` 一次运行得到的完整、未经编辑的输出。原文里用黄色标 system prompt，用绿色标 handoff prompt，用粉色标 compaction prompt。

我们怎么知道这些不是模型瞎编出来的文本，而是真实的 prompt 呢？

因为提取出来的 compaction prompt 和 handoff prompt，与开源 Codex CLI 在非 codex 模型路径里使用的 prompt 高度相似，对应的就是：

- `prompt.md`
- `summary_prefix.md`

这使得“模型凭空编造出这些内容”的可能性大大降低。当然，不同运行之间的结果还是会有波动。

## The Guessed Pipeline

把这些证据拼在一起之后，我们大概可以猜测：`compact()` 在服务端内部大致就是这样工作的。原文在这里给了一张流程图。

## The Script

原文这里附了一张脚本截图，展示了用于做这次实验的脚本。

## Open Question

还有一个开放问题：

为什么 Codex CLI 会针对不同模型，采用两条完全不同的上下文压缩路径？

- 对非 codex 模型：本地 LLM 压缩
- 对 codex 模型：加密后的 API blob

明明底层 prompt 又几乎一致，为什么还要这样区分？以及，为什么 summary 还要被加密？

作者的回答是：很难说。

也许这个加密 blob 里承载的东西，比这次简单实验能揭示出来的更多。比如，它可能还包含了一些和 tool result 如何被压缩、如何被恢复有关的额外状态。只是作者没有继续往下测试。

## 备注

我觉得这篇文章有意思的地方在于，它把一个通常只会被当作“产品体验差异”的现象，拆解成了非常具体的工程机制：

- compaction prompt
- handoff prompt
- 加密 blob
- 二阶段恢复

也就是说，Codex 在长任务里的连续性，并不只是“上下文更长”这么简单，而更像是一种更明确的任务状态交接机制。
