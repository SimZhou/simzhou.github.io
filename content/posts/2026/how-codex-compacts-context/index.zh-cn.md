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
<!--more-->

对于非 codex 模型，开源 Codex CLI 会在本地压缩上下文：由一个 LLM 使用一个[压缩提示词](https://github.com/openai/codex/blob/main/codex-rs/core/templates/compact/prompt.md)对对话进行总结。当后续使用压缩后的上下文时，`responses.create()` 会连同一个用于界定该摘要的交接提示词一起接收它。这两个提示词都可以在源代码中看到。

对于 codex 模型，CLI 则改为调用 `compact()` API，该 API 返回一个**加密的 blob**。我们并不知道其内部是否使用了 LLM、使用了什么提示词，或者是根本不存在交接提示词。

下面我将展示：一个简单的提示词注入实验（2 次 API 调用，35 行 Python 代码）如何揭示 API 压缩路径确实使用了 LLM 来总结上下文，并且它具有自己的压缩提示词，以及一个附加在摘要前的交接提示词。这些提示词与开源版本几乎完全一致。

## 第一步: compact()
我使用一条精心构造的用户消息调用 `compact()`。在服务端，一个用于压缩的 LLM 会使用其自身隐藏的系统提示词处理我们的输入（我从未见过这个提示词，并且要弄清楚它是什么）。

服务端似乎会像下面这样构造压缩器的上下文：

![](1HChJ1ZOawAA0GQ_.jpeg)

压缩器 LLM 会同时读取它的系统提示词和我们的输入。由于我们的输入包含一个注入载荷（上图红色文字），压缩器被诱导在其输出中包含它自己的系统提示词。这个明文摘要仅存在于 OpenAI 的服务器上。我们所能看到的只有加密后的 blob：

![](2HChKADzawAEhBbJ.jpeg)

**在这一点上，我们无法读取 blob 内部的内容。** 它经过 AES 加密，而密钥保存在 OpenAI 的服务器上。我们只能寄希望于压缩器服从了注入指令，并将它的提词写入了摘要。验证这一点的唯一方法就是第二步。

## 第二步: create()

我将加密后的 blob 和第二条用户消息一起传给 `responses.create()`。服务器会解密该 blob，并构造模型的上下文。

我发送的是：

![](3HChKHtTawAIdz1e.jpeg)

模型看到的内容似乎类似于：

![](4HChKPjAbIAA2lCI.jpeg)

如果第一步成功了，那么解密后的 blob 应当包含压缩提示词（即由我们的注入泄露出来的内容）。服务器还会在 blob 前附加一个交接提示词。因此，如果我们的探测成功诱导模型复述其所见内容，那么输出应当会揭示这三者：系统提示词、交接提示词，以及压缩提示词。

## 输出

下面是一轮 `extract_prompts.py` 运行得到的**完整、未经编辑的输出**。黄色 = 系统提示词，绿色 = 交接提示词，粉色 = 压缩提示词。

![](5HChKbo_awAA3OEw.jpeg)

我们如何知道这些是真实提示词，而不只是模型幻觉生成的文本？提取出的压缩提示词和交接提示词，与开源 Codex CLI 中用于非 codex 模型的已知提示词高度一致（[prompt.md](https://github.com/openai/codex/blob/main/codex-rs/core/templates/compact/prompt.md)、[summary_prefix.md](https://github.com/openai/codex/blob/main/codex-rs/core/templates/compact/summary_prefix.md)），因此模型凭空捏造它们的可能性较低。不同轮次的结果会有所变化。

## 推测的Pipeline
综合以上内容，下面是基于提取结果，我们对服务端 `compact()` 工作方式的最佳推测。

![](6HChKgsZaAAA6UXQ.jpeg)

## 脚本
![](7HChKlnxbQAAlc3d.jpeg)

## 开放问题
为什么 Codex CLI 会采用两条完全不同的压缩路径（非 codex 模型使用本地 LLM，codex 模型使用加密 API），而其底层提示词却几乎完全相同？又为什么要对摘要进行加密？
