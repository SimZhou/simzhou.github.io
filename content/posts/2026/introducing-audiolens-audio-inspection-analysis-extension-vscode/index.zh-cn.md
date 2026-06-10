---
title: "介绍 AudioLens：一个把 VS Code 变成音频分析工作站的插件"
subtitle: "用于播放、分析、观察音频文件"
date: 2026-06-09T21:00:00+08:00
lastmod: 2026-06-09T21:00:00+08:00
draft: false
author: "SimZhou"
authorLink: "https://github.com/SimZhou"
description: "AudioLens 是一个尝试在 VS Code、Cursor 和 Trae 中复刻 Audacity / Audition 体验的音频播放、查看与轻量分析插件。"

tags: ["AudioLens", "VS Code", "语音算法", "音频分析", "VibeCoding"]
categories: ["Projects", "AI"]

hiddenFromHomePage: false
hiddenFromSearch: false

# featuredImage: "assets/Main-Screen-multichannel.zh-CN.q65.webp"
featuredImagePreview: "assets/Main-Screen-multichannel.zh-CN.q65.webp"

toc:
  enable: true
math:
  enable: false
lightgallery: true
license: ""
---

本文介绍 **AudioLens**，一个全新的，尝试在 VS Code / Cursor / Trae 中复刻 Audacity / Audition 的最佳体验，用于播放、分析、观察音频文件的插件。

针对语音、声音事件检测、音频算法、信号处理、机器学习或音频数据集处理工作者，日常工作流的一个痛点问题是：

*代码在编辑器里，数据清单文件在编辑器里，日志也在编辑器里，但音频一旦要听、要看波形、要查频谱，就不得不切到播放器、Audacity、文件管理器等工具。如果是 Remote SSH 工作，那么甚至更复杂，需要先将音频通过 SFTP 等工具拷贝到本地再打开。*

AudioLens 想解决的就是这个问题：**让音频工程相关的查看、播放和轻量分析，都尽量留在编辑器里完成。**

<!--more-->

项目地址：[GitHub](https://github.com/SimZhou/vscode-audiolens/blob/main/README.zh-CN.md) / [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=simzhou.audiolens) / [Open VSX Marketplace](https://open-vsx.org/extension/simzhou/audiolens)

{{< image src="assets/Main-Screen-multichannel.zh-CN.q65.webp" caption="AudioLens 多通道主界面" width="100%" >}}

## 1. 简单介绍

AudioLens 是一个偏向音频工程、语音算法、声音事件检测、信号处理和音频数据排查的 VS Code 音频查看与分析插件。

在这些场景中，音频文件往往和代码、配置、数据列表、转写文本、模型输出、实验日志放在一起。工程人员一般关心的是：

- 音频样本是否存在静音、截断、爆音或削波？
- 多通道音频的每个通道是否正常？
- 某个选区的 RMS、峰值、主频、频段能量大概是什么情况？
- `.pcm` / `.raw` 文件能否按指定参数直接打开？
- Kaldi 的 `wav.ark:offset` 能否更方便地查看？
- Remote SSH 上的数据集能否无需复制到本地就完成抽查？
- 数据列表、日志、转写文本里的音频路径能否直接打开？

AudioLens 的设计目标就是：**在不离开 VS Code / Cursor / Trae 的情况下，快速检查音频样本。**

## 2. 功能介绍

AudioLens 支持常见音频格式，包括：

- WAV
- MP3
- FLAC
- Ogg / Opus
- M4A / AAC
- PCM / RAW
- Kaldi WAV Ark 条目

### 2.1 查看波形图与频谱图

打开音频后，可以直接查看波形图和频谱图：

{{< image src="assets/1.multi-channel_tracks_and_multi-view.zh-CN.gif" caption="多通道音轨与多视图演示" width="100%" >}}

其中，每个通道都可以单独设置：

- 波形图、频谱图或组合视图
- 静音 / 独奏

另外，在右上角的设置中，还可以调整频谱图的各种参数，例如 FFT 点数、窗函数、频率范围、配色和亮度范围：

{{< image src="assets/config_menu.zh-CN.png" caption="频谱图设置" width="32%" >}}

### 2.2 选区播放、选区分析和选区导出

在波形图或频谱图上拖拽，可以创建时间选区。

有选区之后，可以：

- 只播放选中片段
- 查看选区分析指标
- 右键把选区导出为 WAV

{{< image src="assets/2.selection_playback_and_analysis.zh-CN.gif" caption="选区播放与分析演示" width="100%" >}}

当前选区分析包括的内容有：

- 起止时间和时长
- RMS 电平
- 峰值电平
- 主频
- 峰均比
- 削波比例
- 噪声底估计
- 频谱质心
- 过零率
- 频段能量分布

这些指标可以让日常排查问题更快。例如在检查训练样本、事件检测样本或采集结果时，可以直接框选异常片段，快速判断电平、噪声底和频段分布是否符合预期。

### 2.3 Raw PCM / RAW 文件参数化读取

`.pcm` / `.raw` 文件是原始数据，文件本身不会记录采样率、通道数、位宽、浮点/整型、大小端和起始偏移。

AudioLens 可以显式配置参数读取 `.pcm` / `.raw` 后缀的音频：

{{< image src="assets/3.pcm_raw_parameterized_loading.zh-CN.gif" caption="PCM 和 RAW 参数化读取演示" width="100%" >}}

同时，这些参数可以保存为默认值，后续打开 PCM / RAW 文件时继续使用。

### 2.4 音频文件头信息查看

AudioLens 可以直接查看音频文件的结构化头信息。

目前支持查看：

- WAV / RIFF
- FLAC
- Ogg
- MP4 / M4A
- AAC / ADTS
- MP3 / MPEG frame

这个功能适合排查一些“能播放，但工具链读起来有问题”的文件。例如 WAV 是否为标准 44 字节 PCM 头，是否包含额外 chunk，或者 `fmt` chunk 是否有扩展字段。

{{< image src="assets/4.Inspect_Audio_Headers_in_One_Click.zh-CN.gif" caption="音频头信息查看演示" width="100%" >}}

### 2.5 从任意文本中打开音频路径

做音频数据集时，很多音频路径都藏在数据清单（例如 `wav.scp`、`wavlist`）、JSON、日志或模型输出里。

AudioLens 支持在普通文本文件中识别音频路径。将鼠标悬停到路径上，可以直接点击“在 AudioLens 中打开”。

{{< image src="assets/5.open_audio_paths_from_any_file.zh-CN.gif" caption="从任意文件中打开音频路径演示" width="100%" >}}

这个功能经过了几版优化，现在不会针对整份大文件批量生成正文超链接，而是在需要时解析当前行或选区。

因此，大 JSON、大日志、大型数据清单文件也能保持流畅。

### 2.6 可直接读取 Kaldi WAV Ark

如果工作流中仍在使用 Kaldi 生态，`wav.ark:offset` 是很常见的音频索引方式。

AudioLens 支持两种打开方式：

1. 通过命令面板中的 `AudioLens: 打开 Kaldi WAV Ark 音频` 入口，直接输入 `/path/to/wav.ark:offset`
2. 如果配合另一个插件 Kaldi Reader，还可以从文本里的 `/path/to/wav.ark:offset` 直接跳转使用 AudioLens 打开。

{{< image src="assets/6.open_kaldi_wav_ark_directly.zh-CN.gif" caption="直接打开 Kaldi WAV Ark 演示" width="100%" >}}

AudioLens 不会加载整个 ark 文件，而是会校验 offset 处是否为 `RIFF/WAVE`，再只读取对应的 WAV 文件。

Kaldi Reader Extension：[GitHub](https://github.com/SimZhou/vscode-kaldi-reader/blob/main/README.zh-CN.md) / [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=simzhou.kaldi-reader) / [Open VSX Marketplace](https://open-vsx.org/extension/simzhou/kaldi-reader)

### 2.7 远程 SSH 支持

很多音频数据集都在远程训练机、实验机或数据服务器上。

AudioLens 在 Remote SSH 场景下直接读取远端工作区里的音频，并在本地 VS Code Webview 中查看和播放。

因此，远端样本可以直接抽查，无需通过 SFTP 等方式下载到本地。

## 3. 安装方式

- VS Code 用户：直接在插件市场搜索 `AudioLens`，或从 [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=simzhou.audiolens) 下载
- Cursor、VSCodium、Trae 或其他使用 Open VSX 的编辑器用户：从 [Open VSX Marketplace](https://open-vsx.org/extension/simzhou/audiolens) 下载
- 离线安装：从 [GitHub Releases](https://github.com/SimZhou/vscode-audiolens/releases) 下载 VSIX 包

## 4. 未来还会新增的功能

后续还会继续增强几个功能。

1. 功能上：计划实现一些简单的音频处理操作，例如针对某个通道或选区做高通 / 低通滤波、增益调整、反相等处理，并将处理后的结果保存为新的音频文件。同时也会继续优化多通道场景下的显示体验，例如支持调整不同通道的显示高度 / 宽度，让重点通道更容易观察。

2. 性能上：现在频谱计算和绘制已经能满足日常使用，但在更高分辨率、更复杂交互下，GPU 渲染会有进一步优化空间，因此后续会考虑使用 WebGL / GPU 进行频谱图渲染。

## 写在最后

作为一个面向音频工程、语音算法、声音事件检测、信号处理和音频数据排查的 VS Code 音频查看与分析插件，AudioLens 的设计初衷是让“看一眼样本到底是什么情况”这件事变得更快、更顺手。

如果日常工作中经常需要在 VS Code、Cursor 或 Trae 里处理音频数据，AudioLens 可以作为一个轻量且实用的音频分析入口。

如果想了解更多功能细节，或者参与反馈和改进，可以查看 AudioLens 的 [GitHub 项目页](https://github.com/SimZhou/vscode-audiolens/blob/main/README.zh-CN.md)。
