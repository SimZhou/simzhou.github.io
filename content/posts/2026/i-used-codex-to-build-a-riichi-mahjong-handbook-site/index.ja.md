---
title: "Codex を使ってリーチ麻雀の入門サイトを作った"
subtitle: ""
date: 2026-03-18T12:35:00+08:00
lastmod: 2026-03-18T12:35:00+08:00
draft: false
author: "SimZhou"
authorLink: "https://github.com/SimZhou"
description: "Codex を使ってリーチ麻雀の入門サイトを作り、保守したときの記録。"

tags: ["AI", "Codex", "Agent", "リーチ麻雀", "麻雀"]
categories: ["AI", "プロジェクト"]

hiddenFromHomePage: false
hiddenFromSearch: false
featuredImage: "mahjong-soul-games.webp"
featuredImagePreview: "mahjong-soul-games.webp"

toc:
  enable: true
math:
  enable: false
lightgallery: true
license: ""
---

最近、Codex を使って初心者向けのリーチ麻雀サイトを作った。<https://simzhou.com/riichi_mahjong_book/en/>
<!--more-->
ソースリポジトリはこちら: <https://github.com/SimZhou/riichi_mahjong_book>。

## 背景

最近 Mahjong Soul を始めたのだが、すぐに他家へ放銃しまくることに気づき、危うくキレてアンインストールしかけた。

結局、ちゃんと時間を取ってリーチ麻雀を勉強したほうがいいと思うようになった。

そこでたどり着いたのが、日本ではかなり有名らしいリーチ麻雀の解説サイトだった。<http://beginners.biz/>

以前は「79」というブログが転載・翻訳していたようだが、そのサイトはもう閉鎖されたようなので、自分で作ることにした。

## Codex を使ってサイトを作る

こういう作業に Codex を使うのは、実際かなり簡単だった。特にこの手の、比較的まっすぐなフロントエンド＋バックエンド作業はとても得意だ。

実際、このプロジェクトはほぼ 1 本のプロンプトから始まった。

```text
Please build a riichi mahjong handbook site based on http://beginners.biz/.
```

## 大きな落とし穴

最初のうちは Codex + GPT-5.4 を使い、元のページを 1 枚ずつ翻訳して Web ページに変換させていた。

フロントエンドとバックエンド自体は問題なかったが、翻訳品質とレイアウト品質は期待外れだった。

**説明用の画像が 1 枚抜け落ちることもあれば、内容の一部が消えることもあった。場所によっては、モデルが勝手に解釈を足したり、誤訳したりすることすらあった。**

**しかも、何度かセルフレビューさせても、それらの問題は完全には解消されなかった。**

以下は、翻訳後に元ページの説明図が欠落してしまった例である。

{{< compare-images
  left_src="Missing_figures--Original.png"
  left_alt="麻雀牌の説明図が含まれている元ページ"
  left_title="麻雀牌の説明図が含まれている元ページ"
  left_caption="麻雀牌の説明図が含まれている元ページ"
  right_src="Missing_figures--Observed.png"
  right_alt="麻雀牌の説明図が失われた翻訳後のページ"
  right_title="麻雀牌の説明図が失われた翻訳後のページ"
  right_caption="麻雀牌の説明図が失われた翻訳後のページ"
>}}

そのとき私はこう思った。翻訳は、大規模モデルにとって何年も前に難問でなくなっていてよいはずではないか。

特に GPT-5.4 のような、現時点でもっとも強力なモデルのひとつであれば、この程度の低レベルなミスは本来起きるべきではない。

**そこで Skill を作ってみたところ、一気に話が楽になった。**

## Skill を使ったあとの結果

Codex の `$skill-creator` を使って Skill を作り、だいたい次のような指示を与えた。

 - 入力は元の日本語 Web ページ、出力はターゲット言語版のページ
 - 勝手な解釈を加えず、内容も落とさず、できる限り原文に忠実に翻訳する
 - 元ページにある説明図は 1 枚も省略しない
 - ページのレイアウトやスタイルを変えず、表などの構造も保つ

すると結果はかなり良くなった。翻訳後のページは文面でもレイアウトでも原文にかなり近くなり、目立つ問題はほとんどなくなった。

以下は比較画像である。

<p class="post-note">左が最初に生成されたページ、中央が Skill 使用後に修正されたページ、右が元の日本語ページ。</p>

{{< image src="Fixed_Comparation_01.png" caption="（例 1）左: 初期生成ページ / 中央: 修正版 / 右: 元の日本語ページ" width="100%" >}}

{{< image src="Fixed_Comparation_02.png" caption="（例 2）左: 初期生成ページ / 中央: 修正版 / 右: 元の日本語ページ" width="100%" >}}

見れば分かるように、修正版のほうが内容面でもレイアウト面でも原ページにずっと忠実だ。

本文の長さもおおむね原文とそろっており、不自然に長くなったり短くなったりしていない。

（最終的に洗練された Skill ファイルはこちら: [translate-japanese-webpage/SKILL.md](https://github.com/SimZhou/riichi_mahjong_book/blob/main/.agents/skills/translate-japanese-webpage/SKILL.md)）

## まとめ

この種の作業であれば、Codex はすでにかなりしっかり仕事をしてくれる。

主な欠点は、作業中ずっとこちらが Enter を押し続けなければならなかったことだ。

今後は、マルチ Agent / SubAgent のワークフローも試してみる価値があるだろう。たとえば、1 体の Agent にコンテンツ品質を監督させ、別の Agent にページ翻訳とレイアウト処理を担当させる、といった形だ。

そうなれば、この手の作業を AI 同士が協調して、かなり自動的に完了させる姿にずっと近づくはずだ。
