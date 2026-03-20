---
title: "Codex のコンテキスト圧縮はどう動くのか"
subtitle: "Kangwook Lee が X に投稿した記事の転載"
date: 2026-03-12T12:05:06+08:00
lastmod: 2026-03-12T12:05:06+08:00
draft: false
author: "Kangwook Lee"
authorLink: "https://x.com/Kangwook_Lee"
description: "Codex の compact() API がどのようにコンテキストを圧縮しているのかを、実験を通して探った記事の日本語版。"

tags: ["AI", "LLM", "Codex", "Agent", "コンテキストエンジニアリング"]
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
原著者: Kangwook Lee

元記事: <https://x.com/Kangwook_Lee/article/2028955292025962534>

codex 以外のモデルでは、オープンソースの Codex CLI はローカルでコンテキスト圧縮を行います。LLM が [compaction prompt](https://github.com/openai/codex/blob/main/codex-rs/core/templates/compact/prompt.md) を使って会話を要約します。後でその圧縮済みコンテキストを使うときには、`responses.create()` がその要約を位置づける handoff prompt と一緒に受け取ります。これらのプロンプトはどちらもソースコード上で確認できます。
<!--more-->

一方、codex モデルでは CLI は代わりに `compact()` API を呼び出し、その結果として **暗号化された blob** が返ってきます。内部で LLM を使っているのか、どんなプロンプトを使っているのか、そもそも handoff prompt があるのかどうかも分かりません。

以下では、単純なプロンプトインジェクション（API 呼び出し 2 回、Python 35 行）を使って、この API 側の compaction 経路でも実際には LLM による要約が行われており、独自の compaction prompt と、要約の前に付与される handoff prompt が存在することを示します。しかもそのプロンプトは、オープンソース版のものとほとんど同じです。

## Step 1 — compact()

細工したユーザーメッセージを使って `compact()` を呼び出します。サーバー側では compactor LLM が、独自の隠された system prompt を用いて入力を処理します（私はそれを見たことがなく、どうなっているのか知りたいわけです）。

サーバーは、compactor のコンテキストをおおよそ次のように組み立てているように見えます。

{{< image src="1HChJ1ZOawAA0GQ_.jpeg" width="60%" >}}

compactor LLM は system prompt と私たちの入力をまとめて読みます。こちらの入力にはインジェクション用のペイロード（上図の赤字）が含まれているため、compactor は自分自身の system prompt を出力の中に含めるように誘導されます。この平文の要約は OpenAI のサーバー上にしか存在しません。こちらから見えるのは暗号化された blob だけです。

{{< image src="2HChKADzawAEhBbJ.jpeg" width="60%" >}}

**この時点では、blob の中身を読む方法はありません。** これは AES で暗号化されており、鍵は OpenAI のサーバー側にあります。私たちにできるのは、compactor がインジェクションに従って自分のプロンプトを要約の中に書き込んだと期待することだけです。それを確かめるには Step 2 が必要です。

## Step 2 — create()

暗号化された blob と 2 つ目のユーザーメッセージを `responses.create()` に渡します。サーバーは blob を復号し、モデルのコンテキストを組み立てます。

私が送るのはこれです。

{{< image src="3HChKHtTawAIdz1e.jpeg" width="60%" >}}

モデルからは、だいたい次のように見えているようです。

{{< image src="4HChKPjAbIAA2lCI.jpeg" width="60%" >}}

もし Step 1 が成功していれば、復号後の blob には compaction prompt が入っているはずです（こちらのインジェクションによって漏えいしたものです）。さらにサーバーは blob の前に handoff prompt も付加します。つまり、このプローブでモデルに見えている内容をそのまま繰り返させることができれば、system prompt、handoff prompt、compaction prompt の 3 つすべてが明らかになるはずです。

## 出力

以下は extract_prompts.py を 1 回実行したときの **完全な未編集出力** です。黄色が system prompt、緑が handoff prompt、ピンクが compaction prompt です。

{{< image src="5HChKbo_awAA3OEw.jpeg" width="60%" >}}

これらが本物のプロンプトで、単なるハルシネーションではないとどう判断できるでしょうか。抽出された compaction prompt と handoff prompt は、オープンソースの Codex CLI で codex 以外のモデルに使われている既知のプロンプト（[prompt.md](https://github.com/openai/codex/blob/main/codex-rs/core/templates/compact/prompt.md)、[summary_prefix.md](https://github.com/openai/codex/blob/main/codex-rs/core/templates/compact/summary_prefix.md)）と非常によく似ています。モデルがそれを一から作り上げたとは考えにくい、というわけです。実行ごとに多少ばらつきはあります。

## 推定されるパイプライン

以上を踏まえると、サーバー側で `compact()` がどう動いているかについての現時点での最善の推測は次の通りです。

{{< image src="6HChKgsZaAAA6UXQ.jpeg" width="60%" >}}

## スクリプト

{{< image src="7HChKlnxbQAAlc3d.jpeg" width="60%" >}}

## 未解決の疑問

なぜ Codex CLI は、非 codex モデル向けにはローカル LLM、codex モデル向けには暗号化 API という、まったく異なる 2 つの圧縮経路を使っているのでしょうか。しかも、基礎となるプロンプトはほとんど同じです。ではなぜ要約をわざわざ暗号化する必要があるのでしょうか。

正直なところ、はっきりとは分かりません。もしかすると、この単純な実験では見抜けない追加情報、たとえばツール結果をどう圧縮・復元しているかのような情報が blob の中に含まれているのかもしれません。ただ、そこまでは私は検証していません。
