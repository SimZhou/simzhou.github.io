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
lightgallery: true
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

{{< image src="1HChJ1ZOawAA0GQ_.jpeg" width="60%" >}}

这个 compactor LLM 会同时读取它的 system prompt 和我们的输入。由于我们的输入中包含了一段 injection payload（上图红字部分），compactor 就被诱导把它自己的 system prompt 一并写进输出里。这个明文摘要只存在于 OpenAI 的服务器上。我们能看到的只有一个加密后的 blob：

{{< image src="2HChKADzawAEhBbJ.jpeg" width="60%" >}}

**此时我们还没有任何办法读取 blob 里面的内容。** 它经过了 AES 加密，而密钥保存在 OpenAI 的服务器端。我们唯一能做的，只是希望 compactor 确实服从了这次 injection，把它的 prompt 写进了摘要里。要验证这一点，只能进入第 2 步。

## 第 2 步：`create()`

接着，我把这个加密后的 blob 和第二条用户消息一起传给 `responses.create()`。服务器会先解密 blob，然后组装模型实际看到的上下文。

我发送的是：

{{< image src="3HChKHtTawAIdz1e.jpeg" width="60%" >}}

模型看到的内容大致像这样：

{{< image src="4HChKPjAbIAA2lCI.jpeg" width="60%" >}}

如果第 1 步成功了，那么解密后的 blob 里就应该包含 compaction prompt（也就是通过 injection 泄露出来的内容）。此外，服务器还会在 blob 前面额外加上一段 handoff prompt。所以，只要我们的探测消息成功诱导模型复述它所看到的内容，最终输出理论上就会同时暴露出这三部分：system prompt、handoff prompt，以及 compaction prompt。

## 输出结果

下面是一次运行 `extract_prompts.py` 得到的**完整、未经修改的输出**。黄色表示 system prompt，绿色表示 handoff prompt，粉色表示 compaction prompt。

{{< image src="5HChKbo_awAA3OEw.jpeg" width="60%" >}}

我们怎么知道这些确实是真实 prompt，而不是模型幻觉出来的文本？因为提取出来的 compaction prompt 和 handoff prompt，与开源版 Codex CLI 在非 codex 模型路径下已知使用的 prompt 非常接近（[prompt.md](https://github.com/openai/codex/blob/main/codex-rs/core/templates/compact/prompt.md)、[summary_prefix.md](https://github.com/openai/codex/blob/main/codex-rs/core/templates/compact/summary_prefix.md)），这使得“模型完全凭空编造出这些内容”的可能性变得很低。不过，不同运行之间的结果还是会有波动。

## 推测出的 Pipeline

把这些线索拼起来后，下面这张图就是我们目前对服务端 `compact()` 工作方式的最佳猜测，也是这次提取实验所揭示出的 Pipeline。

{{< image src="6HChKgsZaAAA6UXQ.jpeg" width="60%" >}}

## 脚本

{{< image src="7HChKlnxbQAAlc3d.jpeg" width="60%" >}}

## 未解的问题

为什么 Codex CLI 会为非 codex 模型和 codex 模型分别采用两套完全不同的 compaction 路径（前者是本地 LLM，后者是加密 API），而它们底层使用的 prompt 却几乎一样？还有，为什么一定要把这个 summary 加密成 blob？

很难下定论。一个可能的解释是，这个加密 blob 里承载的信息不止这次简单实验所揭示出来的内容，比如可能还包含一些与 tool results 如何被 compact 和恢复有关的特殊数据。但我没有继续深挖这个方向。


## X 上面评论区的总结

### 短总结

这波讨论的重点不在“Codex 有没有用 prompt 做 compaction”，因为文章基本已经说明它确实用了；真正引发讨论的是：既然 prompt 和开源版本几乎一致，为什么还要把 summary 加密成 blob。大家的主流猜测包括防篡改、避免外部依赖内部实现细节、阻止他人收集数据来复刻能力，以及为未来加入更多服务端逻辑预留空间。另一个很有价值的实践观点是：相比 compaction prompt，本轮到下一轮之间的 handoff prompt 可能更关键，因为 summary 只是压缩信息，handoff 才决定模型如何继续工作。

### 观点分歧图
**核心问题：为什么 codex 的 compaction 要走“服务端 + 加密 blob”？**
```
├─ 观点 A：主要是工程与产品边界
│  ├─ 防篡改（tamper-proofing）
│  ├─ 避免用户依赖内部实现细节（Hyrum's Law）
│  └─ 给未来升级留空间，即使当前 prompt 看起来差不多
│
├─ 观点 B：主要是能力保护
│  ├─ 不想暴露 context -> compacted context 的数据对
│  ├─ 防止别人训练类似的小模型或复刻流程
│  └─ 加密不只是藏 prompt，更是在保护 Pipeline
│
├─ 观点 C：其实没有那么神秘
│  ├─ 文章表明底层仍然像是 “LLM + compaction prompt + handoff prompt”
│  ├─ prompt 和开源版接近，说明整体范式没变
│  └─ codex 效果更好，可能主要因为模型更强，不是 compact() 有魔法
│
└─ 观点 D：还没完全看透
   ├─ blob 里可能还有这次实验没提取出的结构化信息
   ├─ 可能涉及 tool results 的压缩与恢复
   └─ 也可能用了专门的小模型或额外服务端处理
```
### 长总结

这段讨论的核心，基本围绕两个问题展开：compact() 背后到底有没有“更高级的东西”，以及为什么要把 summary 加密。

整体上，讨论可以概括为这几类观点：

1. 认可原作者的逆向分析
很多人认为这次调查做得很扎实，属于“把看起来很黑盒的机制拆开来看”的典型案例。像 Beacon、carlo、Ayy solid work! 这类回复，本质上都是在肯定这篇文章的信息价值和分析方法。

2. 大家最关心的是“为什么要加密”
这是评论里最集中的焦点，主要有几种猜测：
   - tamper-proofing 而不是 secrecy：加密未必是为了保密 prompt 内容，而可能是为了防止用户篡改 compact 后的内容。
   - Hyrum's Law：如果明文暴露出来，开发者很快就会依赖这些“内部实现细节”，导致系统后续难以演进。
   - 防止别人复制能力：有人猜测 OpenAI 可能不想让外界轻易收集“原始上下文 -> compacted context”的数据对，从而训练类似的小模型或复刻其 compaction 方案。
   - 预留未来升级空间：也有人认为，当前看起来和开源版差不多，不代表以后不会逐步加入更多 proprietary 逻辑，因此先放到服务端并加密，是一种产品和能力边界上的提前布局。

3. 有人认为真正关键的不是 compaction prompt，而是 handoff prompt
这条观点很有实践价值。Lucas Araujo 提到，对于长时间运行的 AI assistant 来说，“总结得好”还不够，下一轮模型还必须知道“接下来该怎么做”。也就是说：
   - compaction prompt 负责“压缩信息”
   - handoff prompt 负责“告诉下一轮模型如何使用这些信息”
这说明在实际系统设计里，handoff 机制可能比单纯 summary 质量更决定效果。
4. 有人认为 codex 效果好，未必是 compaction 机制本身更神秘，比如 JJ Linares 的看法是：
   - 非 codex 模型走“local LLM compaction”，一个现实原因可能只是为了避免强绑定 OpenAI 模型
   - codex 的 compaction 体验更好，也许主要是因为模型整体更强，而不是 compact() 这个 API 本身有某种魔法
    这是一个比较“去神秘化”的解释。
5. 有人猜测服务端 compaction 可能还有尚未提取出的内容。虽然文章里提取出了 prompt，但评论区不少人认为 blob 里可能不只是普通 summary，例如：
   - 可能包含某些结构化状态
   - 可能有 tool results 的压缩/恢复信息
   - 可能有专门的小型 fine-tuned model 参与，也就是说，现有实验说明“它确实用了 LLM 和 prompt”，但不等于“已经把全部机制看透了”。

6. 一部分评论偏产品和工程感受，例如：
   - “context rot is solved” 说明有人主观上觉得 codex app 的上下文管理效果确实很好
   - “像魔术，拆开后就不神奇了” 这种评论表达的是对黑盒产品被解释后的感受
   - “应该有一个 compaction skill 来 orchestrate 整个流程” 则是在往工程抽象和产品化能力上延伸

如果压缩成几个 key insights，可以这样看：
 - 这次文章最大的价值，是证明了 codex 路径下的 compact() 并不是完全不可知的黑盒，背后大概率仍是“LLM + compaction prompt + handoff prompt”这套基本范式。
 - 讨论最集中的问题不是“有没有 prompt”，而是“为什么还要加密”。
 - 评论区比较有共识的一点是：加密更可能服务于产品演进、抗篡改、抗复制，而不只是单纯隐藏文本内容。
 - 从工程实践角度看，handoff prompt 可能比 compaction prompt 更关键，因为它决定下一轮模型如何接住前一轮的总结。
 - 也有人提醒，不要把效果全归因于 compaction 机制；模型本身更强，可能才是体验更好的主要原因。
