---
title: "Building AudioLens: A VS Code Extension for Audio Preview and Spectrogram Analysis"
subtitle: "Supports common audio formats, including raw PCM"
date: 2026-05-27T19:25:24+08:00
lastmod: 2026-05-27T23:40:30+08:00
draft: false
author: "SimZhou"
authorLink: "https://github.com/SimZhou"
description: "AudioLens is an audio inspection and analysis extension for VS Code, built for speech, audio algorithms, machine learning, and data annotation workflows."

tags: ["AudioLens", "VS Code", "Speech Algorithms", "Audio Analysis", "VibeCoding"]
categories: ["Projects", "AI"]

hiddenFromHomePage: false
hiddenFromSearch: false

# featuredImage: "assets/Main-Screen-multichannel.en-US.q65.webp"
featuredImagePreview: "assets/Main-Screen-multichannel.en-US.q65.webp"

toc:
  enable: true
math:
  enable: false
lightgallery: true
license: ""
---
<!-- <p class="post-note">Cover image: AudioLens running inside VS Code</p> -->

Recently I vibed a VS Code extension that can read, play, and analyze audio directly inside VS Code. It is called **AudioLens**.

I shared it in a few speech algorithm engineering groups, and the feedback was pretty good.

Project links: [GitHub](https://github.com/SimZhou/vscode-audiolens/blob/main/README.md) / [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=simzhou.audiolens)

<!--more-->

{{< image src="AudioLens.shop_preview.en-US.png" caption="AudioLens Marketplace page" width="100%" >}}

## Motivation

Speech algorithm engineers usually switch back and forth between two main work surfaces:

- A code editor, such as VS Code
- An audio analysis tool, such as Audition or Audacity

The pain point is straightforward:

- When writing code, you mainly work in the editor; when analyzing audio, you have to switch to another app.
- **If the code runs on a remote server, it gets even more annoying: you often have to download the audio first before you can listen to it.**

Is there already a solution? Kind of. There is an extension called audio-preview in the VS Code Marketplace. It has around 200K downloads, and I used it myself for years.

But the UI is rough, the feature set is limited, and there are quite a few bugs. Its last update was in 2024, and the author seems to have stopped maintaining it.

So, out of frustration, I decided to vibe one myself, ~~and also test what Codex can do~~.

## What AudioLens Does
{{< image src="assets/Main-Screen-multichannel.en-US.q65.webp" caption="AudioLens multi-channel main screen" width="100%" >}}

Since I work on speech algorithms myself, I know the requirements pretty well. I basically put in the features I felt such a tool should have:

- **Multi-channel audio playback**: read multi-channel audio, play selected regions, solo channels, mute selected channels, and so on
- **Multiple views**: waveform, spectrogram, plus zooming and panning for both views
- **Audio analysis**: select a region and immediately get analysis results, such as RMS dB and frequency analysis
- **Multiple format support**: common audio formats such as `wav`, `mp3`, `flac`, `ogg`, `opus`, `m4a`, and `aac`
- **RAW support**: PCM / RAW audio data, with remembered PCM settings such as channel count and sample rate for opening similar files more easily
- **Spectrogram controls**: FFT size, window type, zero-padding factor, frequency scale, palette, and other parameters
- **Remote SSH support**: open and analyze audio files directly on a remote machine without downloading them locally
- **Localization**: currently supports 17 languages

Here are a few GIF demos, so everyone can get a direct feel for the interaction.

{{< image src="assets/1.multi-channel_tracks_and_multi-view.en-US.gif" caption="Multi-channel tracks and multiple views" width="100%" >}}

{{< image src="assets/2.selection_playback_and_analysis.en-US.gif" caption="Selection playback and audio analysis" width="100%" >}}

{{< image src="assets/3.pcm_raw_parameterized_loading.en-US.gif" caption="PCM / RAW parameterized loading" width="100%" >}}

There is also a question-mark button in the top-right corner with more detailed usage help, if you want to explore further.

## The Vibe Coding Process

The Vibe Coding process was basically a loop of continuously giving my requirements to Codex.

At a high level, I had two main requirements:

1. Keep the overall code simple, clean, and modular, without over-abstracting it
2. Implement the core expensive functions, such as FFT and spectrogram computation, in Rust for performance

The rest was mostly feature and detail polishing:

- Install and test the offline VSIX it built
- Tell Codex how the UI should change and how the features should change

Then repeat that loop.

I also collected quite a few requests from people around me during the process.

The whole thing happened in fragments, but the actual time spent letting it work was probably only about one day.

~~Honestly, getting to act as architect + product manager while having Codex as a capable assistant felt pretty great.~~

## Afterword

I have always felt that in the Vibe Coding era, human taste matters a lot. Building this extension made me even more convinced of that.

**Because LLMs are very powerful, but it is hard to say that they have good taste.**

They can complete your requirements quickly and well. But what a good interface should look like, where a button should go, how wide a panel should be, how the UI should be designed, and whether the UX feels reasonable: for these things, they basically have no real perception (~~no world model~~).

But in the end, the thing you build is still meant to be used by humans.

So taste may become humanity's temporary moat.
