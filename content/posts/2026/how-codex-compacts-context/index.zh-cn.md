---
title: "[译文] 探究 Codex 中上下文压缩的工作方式"
subtitle: "转载自 Kangwook Lee 发布在 X 的文章"
date: 2026-03-12T12:05:06+08:00
lastmod: 2026-03-12T12:05:06+08:00
draft: false
author: "Kangwook Lee"
authorLink: "https://x.com/Kangwook_Lee"
description: ""

tags: ["AI", "LLM", "Codex", "Agent", "Context Engineering"]
categories: ["AI"]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "0HChK-6VawAIhJ8h.jpeg"
featuredImagePreview: "0HChK-6VawAIhJ8h.jpeg"

toc:
  enable: true
math:
  enable: false
lightgallery: false
license: ""
---
原作者：Kangwook Lee

原文链接：<https://x.com/Kangwook_Lee/article/2028955292025962534>

对于非 codex 模型，开源版 Codex CLI 会在本地对上下文进行 compact：由一个 LLM 使用 [compaction prompt](https://github.com/openai/codex/blob/main/codex-rs/core/templates/compact/prompt.md) 对整段对话做总结。后续再次使用这段 compact 后的上下文时，`responses.create()` 会连同一个用于说明这份摘要用途的 handoff prompt 一起接收它。这两个 prompt 都可以在源码中直接看到。
<!--more-->

而对于 codex 模型，CLI 则会改为调用 `compact()` API，并返回一个**加密后的 blob**。我们并不知道它内部是否同样使用了 LLM、具体使用了什么 prompt，或者是否还存在 handoff prompt。

下面我会展示：只靠一次简单的 prompt injection（2 次 API 调用、35 行 Python 代码），就可以发现 API compaction 这条路径确实会使用 LLM 来总结上下文，而且它也有自己的一套 compaction prompt，并会在摘要前面拼接一个 handoff prompt。这些 prompt 与开源版本几乎一致。

## 第 1 步：`compact()`

我先用一条精心构造的用户消息调用 `compact()`。在服务端，一个负责 compaction 的 LLM 会使用它自己的隐藏 system prompt 来处理我们的输入（这个 prompt 我从未见过，而这正是我想搞清楚的东西）。

服务器看起来大致是这样组装 compactor 上下文的：

![](1HChJ1ZOawAA0GQ_.jpeg)

这个 compactor LLM 会同时读取它的 system prompt 和我们的输入。由于我们的输入中包含了一段 injection payload（上图红字部分），compactor 就被诱导把它自己的 system prompt 一并写进输出里。这个明文摘要只存在于 OpenAI 的服务器上。我们能看到的只有一个加密后的 blob：

![](2HChKADzawAEhBbJ.jpeg)

**此时我们还没有任何办法读取 blob 里面的内容。** 它经过了 AES 加密，而密钥保存在 OpenAI 的服务器端。我们唯一能做的，只是希望 compactor 确实服从了这次 injection，把它的 prompt 写进了摘要里。要验证这一点，只能进入第 2 步。

## 第 2 步：`create()`

接着，我把这个加密后的 blob 和第二条用户消息一起传给 `responses.create()`。服务器会先解密 blob，然后组装模型实际看到的上下文。

我发送的是：

![](3HChKHtTawAIdz1e.jpeg)

模型看到的内容大致像这样：

![](4HChKPjAbIAA2lCI.jpeg)

如果第 1 步成功了，那么解密后的 blob 里就应该包含 compaction prompt（也就是通过 injection 泄露出来的内容）。此外，服务器还会在 blob 前面额外加上一段 handoff prompt。所以，只要我们的探测消息成功诱导模型复述它所看到的内容，最终输出理论上就会同时暴露出这三部分：system prompt、handoff prompt，以及 compaction prompt。

## 输出结果

下面是一次运行 `extract_prompts.py` 得到的**完整、未经修改的输出**。黄色表示 system prompt，绿色表示 handoff prompt，粉色表示 compaction prompt。

![](5HChKbo_awAA3OEw.jpeg)

我们怎么知道这些确实是真实 prompt，而不是模型幻觉出来的文本？因为提取出来的 compaction prompt 和 handoff prompt，与开源版 Codex CLI 在非 codex 模型路径下已知使用的 prompt 非常接近（[prompt.md](https://github.com/openai/codex/blob/main/codex-rs/core/templates/compact/prompt.md)、[summary_prefix.md](https://github.com/openai/codex/blob/main/codex-rs/core/templates/compact/summary_prefix.md)），这使得“模型完全凭空编造出这些内容”的可能性变得很低。不过，不同运行之间的结果还是会有波动。

## 推测出的 Pipeline

把这些线索拼起来后，下面这张图就是我们目前对服务端 `compact()` 工作方式的最佳猜测，也是这次提取实验所揭示出的 Pipeline。

![](6HChKgsZaAAA6UXQ.jpeg)

## 脚本

![](7HChKlnxbQAAlc3d.jpeg)

## 未解的问题

为什么 Codex CLI 会为非 codex 模型和 codex 模型分别采用两套完全不同的 compaction 路径（前者是本地 LLM，后者是加密 API），而它们底层使用的 prompt 却几乎一样？还有，为什么一定要把这个 summary 加密成 blob？

很难下定论。一个可能的解释是，这个加密 blob 里承载的信息不止这次简单实验所揭示出来的内容，比如可能还包含一些与 tool results 如何被 compact 和恢复有关的特殊数据。但我没有继续深挖这个方向。