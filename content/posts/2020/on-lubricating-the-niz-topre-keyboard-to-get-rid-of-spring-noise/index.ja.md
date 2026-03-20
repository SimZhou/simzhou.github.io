---
title: "Niz Plum Topre キーボードに潤滑してスプリングノイズを消す話"
subtitle: ""
date: 2020-07-31T16:04:42+08:00
lastmod: 2020-07-31T16:04:42+08:00
draft: true
author: "Simon"
authorLink: ""
description: "Plum Niz Topre キーボードを分解し、スプリングに潤滑剤を塗ってスプリングノイズを解消する方法を紹介する。"

tags: ['キーボード', 'Topre']
categories: ['日常']

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: ""
featuredImagePreview: ""

toc:
  enable: true
math:
  enable: false
lightgallery: true
license: ""
ruby: false
---

<!--more-->

## 動機

Topre キーボードのスプリングノイズは、長く使っているうちに出てくることがあります。気にせず使い続けることもできますが、キーごとに音が違って聞こえるのはやはり少し気になります。特に完璧さを求めるタイプの人ならなおさらです。

## スプリングノイズの原因

Reddit の投稿 [1] によると、スプリングノイズの主な原因は、スプリング下端と PCB が当たるときの衝撃にあるようです。図で表すと、だいたいこんな感じです。

{{< image src="illustration.jpg" caption="ノイズ源のイメージ図" width="50%">}}

YouTube にも Plum EC-S の同じスプリングノイズ問題を報告している動画があります。[Plum 87 EC-S spring noise - Youtube](https://youtu.be/bYGL0GBpwd8) です。コメント欄では、スプリングに潤滑剤を塗るか、少しだけ伸ばしてみる方法が挙げられていました。

そこで、自分のキーボードのスプリングノイズに対してどの方法が有効かを確かめるため、ひとつのスイッチでいくつかの方法を試してみました。結果は次の通りです。

- **ガイドレールに潤滑する**: :x: ノイズには効かない
- **スプリング上部に潤滑する**: :x: ノイズは残る
- **スプリングを少し引き伸ばす**: :x: これも効かず、しかも **おすすめしない**。スプリングを傷めて余計な問題を引き起こすかもしれません（スプリングはスイッチの挙動を支える重要な部品なので）。
- **スプリング下部に潤滑する**: :heavy_check_mark: きれいに効いた。塗布後、スプリングノイズは消えた

これで、どの方法を取るべきかはかなりはっきりしました。私の手元には GP205 がなかったので、代わりに PMX-200（シリコンフルード、1000cs）を使いましたが、十分うまくいきました。

## Niz Plum を分解する

### 

ベゼルを外すときの画像

ベゼルを外したあとの画像

フラットケーブルを抜く画像

ネジを外す画像

シリコンシートを外す前の画像

シリコンシートを外したあとの画像（スプリング）

ガイドレールの画像

スプリングへ潤滑する様子の画像

S

## 参考

[1] [Guide on Getting Rid of Spring Noise - Reddit](https://www.reddit.com/r/HHKB/comments/hlnpy2/guide_on_getting_rid_of_spring_noise_ping_after/)
