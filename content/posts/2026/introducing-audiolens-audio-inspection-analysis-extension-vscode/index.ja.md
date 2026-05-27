---
title: "AudioLens を作る：音声プレビューとスペクトログラム解析のための VS Code 拡張機能"
subtitle: "raw PCM を含む複数の音声形式に対応"
date: 2026-05-27T19:25:24+08:00
lastmod: 2026-05-27T23:40:30+08:00
draft: false
author: "SimZhou"
authorLink: "https://github.com/SimZhou"
description: "AudioLens は VS Code 上で動く音声確認・解析用の拡張機能で、音声アルゴリズム、機械学習、データアノテーションのワークフロー向けに作られています。"

tags: ["AudioLens", "VS Code", "音声アルゴリズム", "音声解析", "VibeCoding"]
categories: ["プロジェクト", "AI"]

hiddenFromHomePage: false
hiddenFromSearch: false

# featuredImage: "Main-Screen-multichannel.ja-JP.png"
featuredImagePreview: "Main-Screen-multichannel.ja-JP.png"

toc:
  enable: true
math:
  enable: false
lightgallery: true
license: ""
---
<!-- <p class="post-note">カバー画像: VS Code で動作する AudioLens</p> -->

最近、VS Code の中で音声を読み込み、再生し、解析できる拡張機能を Vibe した。名前は **AudioLens**。

いくつかの音声アルゴリズム系のグループで共有してみたところ、反応はなかなか良かった。

<!--more-->

{{< image src="AudioLens.shop_preview.en-US.png" caption="AudioLens の Marketplace ページ" width="100%" >}}

## きっかけ

音声アルゴリズムのエンジニアは、普段おもに 2 つの作業画面を行き来している。

- コードエディタ: たとえば VS Code
- 音声解析ソフト: たとえば Audition や Audacity

そこで困ることはシンプルだ。

- コードを書くときは主にエディタで作業するが、音声を解析するときには別のソフトに切り替える必要がある。
- **もしコードがリモートサーバー上で動いているなら、さらに面倒になる。音声をいったんダウンロードしてから聴かなければならないことが多い。**

既存の解決策はないのか。実はある。VS Code Marketplace には audio-preview という拡張機能があり、ダウンロード数は 200K ほどある。私自身も何年も使っていた。

ただ、UI は粗く、機能は少なく、Bug も多い。最後の更新は 2024 年で、作者ももう保守していないように見える。

そこで、腹を立てた勢いで、自分で 1 つ Vibe することにした。~~ついでに Codex の能力も試せるし。~~

## AudioLens の機能紹介
{{< image src="Main-Screen-multichannel.ja-JP.png" caption="AudioLens のマルチチャンネルメイン画面" width="100%" >}}

私は自分でも音声アルゴリズムの仕事をしているので、欲しい機能はかなりはっきりしていた。この拡張機能には、自分が必要だと思う機能をだいたい入れている。

- **マルチチャンネル音声の再生**: マルチチャンネル音声の読み込み、選択範囲再生、ソロ再生、指定チャンネルのミュートなど
- **複数の表示モード**: 波形、スペクトログラム、そして両方のズームとパン
- **音声解析**: 範囲を選択すると、RMS dB や周波数解析などの結果がすぐに表示される
- **複数形式のサポート**: `wav`、`mp3`、`flac`、`ogg`、`opus`、`m4a`、`aac` などの一般的な音声形式に対応
- **RAW サポート**: PCM / RAW の生データに対応し、チャンネル数やサンプルレートなどの PCM 設定を記憶できるため、同種の音声を開きやすい
- **スペクトログラム設定**: FFT サイズ、窓関数、ゼロパディング倍率、周波数スケール、配色などを調整可能
- **Remote SSH サポート**: リモートマシン上の音声をローカルにダウンロードせず、そのまま開いて解析できる
- **多言語対応**: 現在 17 言語に対応

宣伝文句はこのくらいにしておく。興味があれば [GitHub](https://github.com/SimZhou/vscode-audiolens/blob/main/README.ja.md#%E3%83%87%E3%83%A2) で機能デモを見ることもできるし、[VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=simzhou.audiolens) から直接インストールして試すこともできる。

## Vibe Coding の過程

Vibe Coding の過程は、基本的には自分の要求を Codex に出し続けることだった。

大きな方針として、要求は 2 つあった。

1. コード全体はシンプルでクリーン、かつモジュール化された状態を保ち、過度に抽象化しないこと
2. FFT やスペクトログラム計算のような重いコア関数は、速度を確保するために Rust で実装すること

それ以外の作業は、ほとんど機能と細部の磨き込みだった。

- Codex がビルドしたオフライン VSIX をインストールしてテストする
- UI をどう変えるか、機能をどう変えるかを Codex に伝える

この 2 つを繰り返す。

その間、周囲の人たちからもかなり多くの要望を集めた。

全体としては断続的な作業だったが、実際に Codex に働いてもらった時間は、おそらく 1 日くらいだったと思う。

~~正直なところ、アーキテクト兼プロダクトマネージャーになり、Codex という頼れる助手を持つ感覚はかなり気持ちよかった。~~

## 後書き

私はずっと、Vibe Coding の時代には人間の Taste がとても重要になると思っている。今回この拡張機能を作って、その考えはさらに強くなった。

**なぜなら、大規模言語モデル（LLM）はとても強力だが、審美眼があるとは言いにくいからだ。**

要求を速く、うまく実現することはできる。しかし、具体的にどんな画面なら良いのか、このボタンはどこに置くべきか、パネルの幅はどれくらいがよいのか、UI をどう設計すべきか、UX が自然かどうか。こうした問題については、実のところほとんど感知できていない（~~世界モデルがない~~）。

しかし、作ったものは結局、人間が使うものだ。

だから Taste は、人類にとって一時的な堀になるのかもしれない。
