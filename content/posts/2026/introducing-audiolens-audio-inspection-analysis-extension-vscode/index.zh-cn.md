---
title: "Vibe 了一个可以直接在 VS Code 里听音频、分析频谱的插件"
subtitle: "支持多种音频格式，包括 raw PCM"
date: 2026-05-27T19:25:24+08:00
lastmod: 2026-05-27T19:25:24+08:00
draft: false
author: "SimZhou"
authorLink: "https://github.com/SimZhou"
description: "AudioLens 是一个运行在 VS Code 里的音频查看与分析扩展，面向语音、音频算法、机器学习和数据标注工作流。"

tags: ["AudioLens", "VS Code", "语音算法", "音频分析", "VibeCoding"]
categories: ["Projects", "AI"]

hiddenFromHomePage: false
hiddenFromSearch: false

# featuredImage: "Main-Screen-multichannel.zh-CN.png"
featuredImagePreview: "Main-Screen-multichannel.zh-CN.png"

toc:
  enable: true
math:
  enable: false
lightgallery: true
license: ""
---
<!-- <p class="post-note">封面配图：AudioLens运行界面</p> -->

最近我 Vibe 了一个可以直接在 VS Code 中读取、试听和分析音频的插件，名字叫 **AudioLens**。

在若干个语音算法交流群里分享了一下，反响不错。

<!--more-->

{{< image src="AudioLens.shop_preview.zh-CN.png" caption="AudioLens 商店界面" width="100%" >}}

## 初衷

语音算法工程师平时主要在两个工作界面之间来回切换：

- 代码编辑器：例如 VS Code
- 音频分析软件：例如 Audition、Audacity

痛点需求是：

- 写代码的时候，主要在代码编辑器里工作；分析音频的时候，又要切到另一个软件里去。
- **如果代码跑在远程服务器上，那就更麻烦了，还得先把音频下载下来再听……**

有没有现成方案呢？其实是有的。VS Code 插件商店里有一个叫做 audio-preview 的插件，下载量 200K，我自己也用了好多年。

但是奈何，界面丑，功能少，Bug 多，2024 年最后一次维护后，作者似乎也不再更新了……

于是，一怒之下，咱自己 Vibe 一个吧，~~正好也测试一下 Codex 的能力~~！

## AudioLens 功能介绍
{{< image src="Main-Screen-multichannel.zh-CN.png" caption="AudioLens 多通道主界面" width="100%" >}}

由于我自己就在做语音算法，因此需求我很清楚。这个插件把我觉得该有的功能基本都做进去了，包括：

- **多通道音频播放**：多通道音频读取、选区播放、独奏播放、指定通道静音等
- **多种视图**：波形图、语谱图，以及两类视图的缩放和平移
- **音频分析**：直接框选一段音频，立刻弹出分析结果，例如 RMS dB、频率分析等
- **多格式支持**：支持常见音频格式，例如 `wav`、`mp3`、`flac`、`ogg`、`opus`、`m4a`、`aac`
- **RAW 支持**：支持 PCM / RAW 原始数据，并且可以记忆 PCM 的通道数、采样率等参数，方便打开同类音频
- **语谱图调整**：支持调整 FFT 窗长、窗类型、零填充因子、频率刻度、配色等参数
- **Remote SSH 支持**：可以直接打开远程机器上的音频进行分析，无需下载到本地
- **多语言支持**：目前支持 17 种语言

其它废话就不多说了，有兴趣的朋友可以到 [GitHub](https://github.com/SimZhou/vscode-audiolens/blob/main/README.zh-CN.md#%E5%8A%9F%E8%83%BD%E6%BC%94%E7%A4%BA) 上看功能演示，也可以直接去 [VS Code 扩展商店](https://marketplace.visualstudio.com/items?itemName=simzhou.audiolens) 下载体验。

## Vibe Coding 过程

Vibe Coding 的过程基本上就是不断地把自己的需求输出给 Codex，

大方向上，我有这么 2 个诉求：

1. 整体代码以简单、干净、模块化为宗旨，不做过度抽象
2. 核心耗时函数（例如 FFT、频谱图计算等）为了保证速度，用 Rust 实现

其它的过程，基本上就是在打磨功能和细节：

- 安装并测试它编译好的离线 VSIX
- 告诉 Codex，界面要怎么改，功能要怎么改……

这两者的循环。

期间也收集了很多周围人的需求。

整个过程断断续续，实打实让它干活的时间，估计也就 1 天。

~~说实话，当了一回架构师 + 产品经理，且有 Codex 这样的得力助手，这感觉真的很爽。~~

## 后话

我始终觉得，Vibe Coding 时代，人的 Taste 很重要。而这次写这个插件的过程，也更加让我笃定了这一点。

**因为大模型虽然很厉害，但确实不能说很有审美。**

它可以把你的需求完成得又快又好，但是具体界面长什么样才算好，这个按钮放哪里，框框放多宽，那个 UI 怎么设计，UX 是否合理，这些问题，它其实完全没有感知（~~没有世界模型~~）。

但是，东西做出来终究还是要给人来用的。

因此，Taste 可能就成了人类暂时的护城河。
