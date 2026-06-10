---
title: "AudioLens の紹介：VS Code を音声解析ワークステーションにする拡張機能"
subtitle: "音声ファイルの再生、確認、解析のために"
date: 2026-06-09T21:00:00+08:00
lastmod: 2026-06-09T21:00:00+08:00
draft: false
author: "SimZhou"
authorLink: "https://github.com/SimZhou"
description: "AudioLens は VS Code、Cursor、Trae の中で Audacity / Audition に近い体験を提供する、音声再生・確認・軽量解析用の拡張機能です。"

tags: ["AudioLens", "VS Code", "音声アルゴリズム", "音声解析", "VibeCoding"]
categories: ["プロジェクト", "AI"]

hiddenFromHomePage: false
hiddenFromSearch: false

# featuredImage: "assets/Main-Screen-multichannel.ja-JP.q65.webp"
featuredImagePreview: "assets/Main-Screen-multichannel.ja-JP.q65.webp"

toc:
  enable: true
math:
  enable: false
lightgallery: true
license: ""
---

この記事では **AudioLens** を紹介します。AudioLens は、VS Code / Cursor / Trae の中で Audacity / Audition に近い使い心地を実現し、音声ファイルの再生、解析、確認を行うための新しい拡張機能です。

音声、音響イベント検出、音声アルゴリズム、信号処理、機械学習、音声データセット処理に関わる人にとって、日常のワークフローにはよくある痛点があります。

*コードはエディタの中にあり、データリストもエディタの中にあり、ログもエディタの中にあります。しかし、音声を聴く、波形を見る、スペクトルを確認するとなると、プレイヤー、Audacity、ファイルマネージャーなど別のツールに切り替えなければなりません。Remote SSH で作業している場合はさらに面倒で、SFTP などを使って音声をいったんローカルにコピーしてから開く必要があります。*

AudioLens が解決したいのはまさにこの問題です。**音声エンジニアリングに関する確認、再生、軽量解析を、できるだけエディタの中で完結させること。**

<!--more-->

プロジェクトリンク：[GitHub](https://github.com/SimZhou/vscode-audiolens/blob/main/README.ja.md) / [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=simzhou.audiolens) / [Open VSX Marketplace](https://open-vsx.org/extension/simzhou/audiolens)

{{< image src="assets/Main-Screen-multichannel.ja-JP.q65.webp" caption="AudioLens のマルチチャンネルメイン画面" width="100%" >}}

## 1. 簡単な紹介

AudioLens は、音声エンジニアリング、音声アルゴリズム、音響イベント検出、信号処理、音声データの調査に向いた VS Code の音声確認・解析拡張機能です。

こうした場面では、音声ファイルはコード、設定、データリスト、書き起こしテキスト、モデル出力、実験ログと一緒に置かれていることがよくあります。エンジニアが知りたいのは、たとえば次のようなことです。

- 音声サンプルに無音、途中切れ、ポップノイズ、クリッピングはないか？
- マルチチャンネル音声の各チャンネルは正常か？
- ある選択範囲の RMS、ピーク、主周波数、帯域エネルギーはどの程度か？
- `.pcm` / `.raw` ファイルを指定パラメータで直接開けるか？
- Kaldi の `wav.ark:offset` をもっと手軽に確認できるか？
- Remote SSH 上のデータセットを、ローカルにコピーせずに抜き取り確認できるか？
- データリスト、ログ、書き起こしテキスト内の音声パスを直接開けるか？

AudioLens の設計目標は、**VS Code / Cursor / Trae から離れずに音声サンプルをすばやく確認すること**です。

## 2. 機能紹介

AudioLens は一般的な音声形式をサポートしています。

- WAV
- MP3
- FLAC
- Ogg / Opus
- M4A / AAC
- PCM / RAW
- Kaldi WAV Ark エントリ

### 2.1 波形とスペクトログラムの表示

音声を開くと、波形とスペクトログラムをそのまま確認できます。

{{< image src="assets/1.multi-channel_tracks_and_multi-view.ja-JP.gif" caption="マルチチャンネル音声トラックと複数ビューのデモ" width="100%" >}}

各チャンネルには個別に設定できます。

- 波形、スペクトログラム、または組み合わせ表示
- ミュート / ソロ

また、右上の設定から、FFT 点数、窓関数、周波数範囲、カラーパレット、輝度範囲など、スペクトログラムの各種パラメータを調整できます。

{{< image src="assets/config_menu.ja-JP.png" caption="スペクトログラム設定" width="32%" >}}

### 2.2 選択範囲の再生、解析、エクスポート

波形またはスペクトログラム上でドラッグすると、時間範囲を選択できます。

選択範囲を作成すると、次のことができます。

- 選択した部分だけを再生する
- 選択範囲の解析指標を見る
- 右クリックして選択範囲を WAV としてエクスポートする

{{< image src="assets/2.selection_playback_and_analysis.ja-JP.gif" caption="選択範囲の再生と解析のデモ" width="100%" >}}

現在、選択範囲の解析には次の内容が含まれます。

- 開始時刻、終了時刻、長さ
- RMS レベル
- ピークレベル
- 主周波数
- ピーク平均比
- クリッピング率
- ノイズフロア推定
- スペクトル重心
- ゼロ交差率
- 帯域エネルギー分布

これらの指標があると、日常的な調査がかなり速くなります。たとえば学習サンプル、イベント検出サンプル、収録結果を確認するときに、異常な部分を直接選択し、レベル、ノイズフロア、帯域分布が期待通りかどうかをすばやく判断できます。

### 2.3 Raw PCM / RAW ファイルのパラメータ指定読み込み

`.pcm` / `.raw` ファイルは生データです。ファイル自体には、サンプルレート、チャンネル数、ビット深度、浮動小数点か整数か、エンディアン、開始オフセットといった情報が記録されていません。

AudioLens では、`.pcm` / `.raw` の音声を明示的にパラメータ指定して読み込めます。

{{< image src="assets/3.pcm_raw_parameterized_loading.ja-JP.gif" caption="PCM と RAW のパラメータ指定読み込みデモ" width="100%" >}}

これらのパラメータはデフォルト値として保存でき、次回以降 PCM / RAW ファイルを開くときにも再利用できます。

### 2.4 音声ファイルヘッダー情報の確認

AudioLens では、音声ファイルの構造化されたヘッダー情報を直接確認できます。

現在サポートしている形式は次の通りです。

- WAV / RIFF
- FLAC
- Ogg
- MP4 / M4A
- AAC / ADTS
- MP3 / MPEG frame

この機能は、「再生はできるが、ツールチェーンで読むと問題が出る」ようなファイルを調べるときに向いています。たとえば WAV が標準的な 44 バイト PCM ヘッダーか、追加 chunk を含んでいるか、`fmt` chunk に拡張フィールドがあるかを確認できます。

{{< image src="assets/4.Inspect_Audio_Headers_in_One_Click.ja-JP.gif" caption="音声ヘッダー情報確認のデモ" width="100%" >}}

### 2.5 任意のテキストから音声パスを開く

音声データセットを扱うとき、多くの音声パスは `wav.scp`、`wavlist` のようなデータリスト、JSON、ログ、モデル出力の中に埋め込まれています。

AudioLens は通常のテキストファイル内の音声パスを認識できます。パスにマウスを重ねると、「AudioLens で開く」リンクから直接開けます。

{{< image src="assets/5.open_audio_paths_from_any_file.ja-JP.gif" caption="任意のファイルから音声パスを開くデモ" width="100%" >}}

この機能は何度か最適化されています。現在は大きなファイル全体に対して本文中リンクを一括生成するのではなく、必要なときに現在行または選択範囲だけを解析します。

そのため、大きな JSON、ログ、大規模なデータリストでも動作を軽く保てます。

### 2.6 Kaldi WAV Ark の直接読み込み

Kaldi エコシステムを使っている場合、`wav.ark:offset` はよく使われる音声インデックス形式です。

AudioLens は 2 つの開き方をサポートしています。

1. コマンドパレットの `AudioLens: Open Kaldi WAV Ark Audio` から `/path/to/wav.ark:offset` を入力する
2. 別の拡張機能 Kaldi Reader と組み合わせると、テキスト内の `/path/to/wav.ark:offset` から AudioLens で直接開ける

{{< image src="assets/6.open_kaldi_wav_ark_directly.ja-JP.gif" caption="Kaldi WAV Ark を直接開くデモ" width="100%" >}}

AudioLens は ark ファイル全体を読み込みません。offset の位置が `RIFF/WAVE` であることを確認し、対応する WAV ファイルだけを読み込みます。

Kaldi Reader Extension：[GitHub](https://github.com/SimZhou/vscode-kaldi-reader/blob/main/README.ja.md) / [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=simzhou.kaldi-reader) / [Open VSX Marketplace](https://open-vsx.org/extension/simzhou/kaldi-reader)

### 2.7 リモート SSH 対応

多くの音声データセットは、リモートの学習マシン、実験機、データサーバー上にあります。

AudioLens は Remote SSH 環境で、リモートワークスペース内の音声を直接読み取り、ローカルの VS Code Webview で表示・再生します。

そのため、遠隔地のサンプルを SFTP などでローカルにダウンロードせず、そのまま抜き取り確認できます。

## 3. インストール方法

- VS Code ユーザー：拡張機能マーケットプレイスで `AudioLens` と検索、または [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=simzhou.audiolens) からダウンロード
- Cursor、VSCodium、Trae、その他 Open VSX ユーザー：[Open VSX Marketplace](https://open-vsx.org/extension/simzhou/audiolens) からダウンロード
- オフラインインストール：[GitHub Releases](https://github.com/SimZhou/vscode-audiolens/releases) から VSIX パッケージをダウンロード

## 4. 今後追加したい機能

今後もいくつかの機能を強化していく予定です。

1. 機能面では、特定のチャンネルや選択範囲に対してハイパス / ローパスフィルタ、ゲイン調整、位相反転などの簡単な音声処理操作を実装し、処理後の結果を新しい音声ファイルとして保存できるようにする予定です。また、マルチチャンネル表示の使い勝手も引き続き改善し、各チャンネルの表示高さ / 幅を調整できるようにして、注目したいチャンネルを見やすくしたいと考えています。

2. 性能面では、現在のスペクトログラム計算と描画は日常利用には十分ですが、より高解像度で複雑なインタラクションを行う場合、GPU レンダリングにはまだ改善余地があります。そのため、今後 WebGL / GPU によるスペクトログラム描画も検討します。

## 最後に

AudioLens は、音声エンジニアリング、音声アルゴリズム、音響イベント検出、信号処理、音声データ調査に向けた VS Code 音声確認・解析拡張機能です。設計の出発点は、「このサンプルはいったいどんな状態なのかを一目で確認する」作業を、より速く、より自然にすることでした。

日常的に VS Code、Cursor、Trae の中で音声データを扱うなら、AudioLens は軽量で実用的な音声解析の入口になります。

より詳しい機能や今後の更新を確認したい場合は、[AudioLens の GitHub プロジェクト](https://github.com/SimZhou/vscode-audiolens/blob/main/README.ja.md) を見てください。
