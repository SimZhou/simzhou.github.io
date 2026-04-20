---
title: "新時代のためのプログラミングガイド - 2026"
subtitle: "補助的コーディングから Vibe Coding へ"
date: 2026-04-17T20:09:00+08:00
lastmod: 2026-04-17T20:09:00+08:00
draft: false
author: "Simon Zhou"
description: "AI によるプログラミングのパラダイム変化についての個人的な記事。初期の大規模モデルによる補助的コーディングから、今日の CLI Agent を中心とした Vibe Coding までを扱う。"

tags: ["AI", "LLM", "VibeCoding", "Claude Code", "Codex", "Gemini CLI"]
categories: ["AI"]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "ClaudeGeminiCodex.jpg"
featuredImagePreview: "ClaudeGeminiCodex_preview.jpg"

toc:
  enable: true
code:
  maxShownLines: 30
math:
  enable: false
lightgallery: true
license: ""
---
この記事はもともと、社内共有のために準備していた発表原稿の下書きとして書き始めたものだ。ただ、その中で公開しても再利用できる部分を整理し、ブログ記事としてまとめることにした。なので、社内リポジトリや社内フロー、社内事例のような内容は意図的に避け、できるだけ多くの開発者にとって再利用可能な方法論、仕事の習慣、考え方の変化だけを残すつもりでいる。

この記事の主な読者として想定しているのは、まだ IDE ベースの補助的コーディングや、大規模モデルの Web チャット機能を使ってはいるものの、Claude Code や Codex CLI のようなコマンドラインツールはまだあまり使ったことがない人たちだ。だからこの文章で伝えたいのは、なぜ CLI ツールこそが未来なのか、そして CLI ツールの入門的な使い方を大まかに紹介することだ。

この文章の核心を一言で要約するなら、こうなる。**大規模モデルによる補助的コーディングは出発点にすぎず、Vibe Coding は新しい働き方そのものだ。** それは単に「IDE にチャット欄が 1 つ増えた」ことでもなければ、「AI にコード補完を手伝わせる」ことでもない。むしろ、**「コードを書く」という行為そのものが、少しずつ「目標を説明し、過程に制約を与え、結果をレビューし、システムを反復的に改善する」プロセスへと再構成されていくこと**に近い。そして後者に必要なのは、**自然言語で Agent と対話することだけ**だ。
<!--more-->

私は最初からこう理解していたわけではない。むしろ、ごく普通に「ChatGPT の Web 版で数行のコードを直してもらう」ところから始まり、少しずつ今の理解にたどり着いた。

{{< image src="/posts/2026/programming-guide-for-the-new-era-2026/dev-to-uploads.webp" width="60%" >}}


# 前書き: 補助的コーディングから Vibe Coding へ至る私的な利用史

ここ数年の自分の利用の軌跡を振り返ると、おおまかにはいくつかの段階に分けられる。

最初期、**2022 年に ChatGPT が登場したころ**、私は GPT-3.5 の Web サービスを購入し、それを**検索エンジンよりも人間らしいプログラミング Q&A ツール**として使っていた。当時の典型的な使い方はとても単純で、Linux ツールの引数の使い方を聞く、エラー内容を説明させる、ちょっとしたボイラープレートコードを生成させる、関数のリファクタリングを手伝わせる、散らかったロジックを整理してもらう、といったものだった。あの時代の大規模モデルは、今と比べればまだずっと弱かったが、それでもプログラミングの中には外部委託できる「機械的な思考」がかなりあるのだと、初めて実感させられた。

{{< image src="/posts/2026/programming-guide-for-the-new-era-2026/ChatGPT_Entry_Point.webp" width="40%" >}}

その後、私は **Cursor** に課金して使い始めた。これは非常に重要な段階だった。なぜなら、**AI が単に質問に答えるだけでなく、プロジェクト全体の文脈を理解し始めた**ことを初めて体験したからだ。私は次第に「このコードはどう書くべきか」だけを聞かなくなり、「現在のプロジェクトのスタイルに合わせてこの機能を完成させてほしい」といった聞き方をするようになった。この時点で、AI の役割は検索の代替から、**まだ完全には信頼できないが、すでに協働できる初級の相棒**へと変わっていた。

{{< image src="/posts/2026/programming-guide-for-the-new-era-2026/cursor.png" width="40%" >}}

その後、VSCode の GitHub Copilot も試した。Copilot が私に与えた影響は、「いちばんうまくコードを書く」ことではなかった。むしろ、「AI がコーディングに参加すること」を日常化した点にある。自動補完、局所的な生成、書きながら先回りして提案してくる体験によって、私は徐々にモデルと一緒に働くことに慣れていった。この段階では、Copilot はむしろ、決して嫌がらずに手伝ってくれる助手のような存在だった。

さらにその後、私は **Claude Code を使い始めた**。これは、私の AI コーディング体験全体の中でも、ほとんどもっとも**認知を揺さぶられた**段階だった。それ以前の Web ベースの LLM、Cursor、Copilot でも効率向上は強く感じていたが、あくまで「補助的コーディングの相棒」に近かった。ところが Claude Code は、**AI がもはや数行のコード補完や数個の質問への回答を手伝うだけではなく、具体的なタスクを独立して完了できる段階に入っている**ことを実感させた。予算の制約があり、さらに Claude は中国本土向けにかなり厳しいアクセス制限をかけていたため、かなり長いあいだ私は Claude Code を主に智譜 GLM-4.7 につないで使っていた。この時期に最も衝撃だったのは、モデルそのものの強さ以上に、CLI Agent という対話形式そのものが、すでに仕事の進め方を変えていたことだ。つまり、IDE の中で「この小さなコード片を直して」と頼むのではなく、**ターミナルの中で、実在するリポジトリ、実在する制約、実在するコマンド、実在するリスクを Agent に渡し、調査と処理を任せる**ようになっていた。

そのあいだ、Gemini 3.1 Pro が公開されたあとには、Gemini CLI と組み合わせて数か月ほど使っていたこともある。その使い心地にも、私は再び素直に驚かされた。

しかし、2026 年 3 月に **Codex と GPT-5.4** を使い始めてから、私は**もう一度、大きく認識を揺さぶられた**。ある意味では、この衝撃は Claude Code を初めて使ったときよりもさらに直接的だった。なぜなら、**十分に賢い Agent であれば、私の仕事のかなりの部分を本当に丸ごと引き受けられるのだと、Codex が初めてここまで具体的に感じさせたからだ**。以前なら最低限レビューくらいは必要だと思っていたコードも、今では完全に読まずに任せられることがある。（あとから分かったことだが、その一因は Codex の安全審査メカニズムが Claude Code より緩く、確認なしでやってくれることが多かったからでもある。）


{{< image src="/posts/2026/programming-guide-for-the-new-era-2026/CC-Gemini-Codex.png" width="50%" >}}

{{< image src="/posts/2026/programming-guide-for-the-new-era-2026/TheStarter3_2_Nero_AI_Image_Upscaler_Anime_Face.jpeg" width="54%" caption="私はこれを「御三家」と呼ぶのが好きだ。ポケモンの最初の 3 匹を思わせるからだ。" >}}

その時期、私は 1 週間ほど、かなり強い不安と恐怖に襲われた時期すらあった。感覚としてはとても直接的だった。**AI はあまりにも賢く、もしかすると本当に私を置き換えてしまうかもしれない。** そう感じるほど賢いがゆえに、人は「プログラマの仕事の中で本当に代替不能な部分はどこなのか」「将来、ソフトウェア工学の中心的な労働は全体として別の場所へ移るのではないか」「ワークフローの中で人間の役割は、承認し、検収し、Enter を押す人に近づいていくのではないか」といった前提を、改めて見直し始めることになる。

そして、まさにそうした感情と考えが、私の別の記事 [人類の未来の仕事は、AI のために Enter キーを押すことになるかもしれない]({{< relref "/posts/2026/humans-job-in-the-future-will-be-to-press-enter-for-ai/index.ja.md" >}}) を直接生み出した。あの記事を書いたのは不安を煽りたかったからではない。Codex を本当に生産性ツールとして使うようになってから、それが本当に人類の未来の 1 つの可能性かもしれないと、私は真剣に感じたからだ。

**だから、なぜ私は Vibe Coding を一過性の流行語としてではなく、かなり真面目に語るのかと聞かれたら、答えは単純だ。自分が本当にその道を通ってきて、実際にパラダイムの変化を体感したからだ。**

# 1. 大規模モデルを使うことは、そのまま Vibe Coding ではない

ここではまず 1 つ区別しておく必要がある。**大規模モデルを使って補助的にコーディングすること ≠ Vibe Coding** だ。

「Vibe Coding」という言葉は、[Andrej Karpathy が X に投稿したツイート](https://x.com/karpathy/status/1886192184808149383) に由来する。その言葉は当時、多くの人が AI コーディングツールを使う中で薄々感じていながら、まだうまく言語化できていなかった体験の変化を、かなり正確に捉えていた。

{{< image src="VibeCodingDefinition-AndrejKarpathy.en.png" width="60%" caption="Vibe Coding について語った Karpathy の X 投稿" >}}

今では多くの人が、**ChatGPT（Web 版）、Cursor、Trae、DeepSeek のようなツールを使ってコードを書くのを補助させている**。しかし、**ほとんどの場合、それはまだ「補助的コーディング」にとどまっている**。AI が補完、説明、生成、修正を手伝ってくれる一方で、主たるワークフローそのものは人間が IDE の中で手作業で前に進めている。もちろん、それでも効率は大きく向上する。だが**本質的には、まだ「自分がコードを書く人」であり、AI は少し賢い道具にすぎない。**

そこに対して Vibe Coding では、決定的に重要な変化が 1 つ加わる。つまり、**「どうやるか」の部分を丸ごと Agent に委ねる**ようになり、**自分は主に「何をやるか」「どこまでやるか」「境界条件は何か」「いつ止めるか」を管理する**ようになるのだ。

<p class="text-red"><strong>もっと正確に言えば、あなたは Prompt だけを書く。コードは 1 行も打たないし、git push のような最も簡単なコマンドすら自分では打たない。</strong></p>

このとき、あなたとツールの関係は、もはや単なる Q&A の関係ではなく、むしろタスク委任に近い関係になる。

{{< image src="/posts/2026/programming-guide-for-the-new-era-2026/Reddit-WhatIsVibeCoding-Question.png" width="60%" >}}

{{< image src="/posts/2026/programming-guide-for-the-new-era-2026/Reddit-WhatIsVibeCoding-Answer.png" width="65%" caption="Reddit 上のユーザーによる Vibe Coding の定義。非常に正確だと思う。" >}}

IDE を使う人の中には、なぜ CLI を使う必要があるのかと聞く人もいるかもしれない。彼らはまだこの問題を「VSCode vs Vim」の選択として理解していることが多い。だが、AI 時代において IDE と CLI は、すでにまったく異なる協働哲学になっている。

1. **IDE** のワークフローでは、AI はむしろ**超有能な同僚や顧問**のようなもので、必要なときに呼び出す存在だ。
2. **CLI** のワークフローでは、AI はむしろ**超有能な部下**に近く、あなたはその直属の上司になる。あなたはそれをどう制約し、どう権限を与え、どう監査するかを学ばなければならない。

この 2 つは同じ次元の比較ではない。しかし私個人の感覚では、後者のほうが前者より上位にある。理由は 1 つ、かなり残酷な現実があるからだ。

<p class="text-red"><strong>今の AI は、コードを書くことも Debug することも、すでに速くてうまい。人間は手放すことを学ぶべきだ。</strong></p>

ただし、ここでいう「Vibe」とは、レビューしないことでも、考えないことでも、モデルに適当に書かせることでもない。むしろ別のリズムに入るということだ。
- **人間がより多く担うもの: 目標の定義、タスク分解、制約設定、成果物の点検**
- **Agent が担うもの: 資料調査、具体実装、ファイル探索、コマンド実行、テスト検証**

このリズムは、**もはや「AI が私のコードを書くのを助ける」ではなく、「私は優秀な部下に仕事を指示している」**という関係だ。だからといって「コードを理解する必要が完全になくなる」わけでもないし、「人間の言葉さえ話せれば複雑なエンジニアリングができる」わけでもない。信頼できるエンジニアリングを行うには、やはり判断力が必要だ。**目標が正しく理解されたか、どこにリスクがあるか、いつ Agent を止めるべきか、どの変更を人間が手で確認すべきか**を見極める力がいる。

言い換えれば、**Vibe Coding とはエンジニアリング規律を捨てることではなく、「実装を手で書く」ことから「タスクシステムとレビュー機構を設計する」ことへと、その規律の置き場所を移すことだ。**

{{< image src="/posts/2026/programming-guide-for-the-new-era-2026/vibe-coding-1.jpg" width="80%" caption="" >}}

# 2. AI Coding CLI ツールにおけるいくつかの約束事

AI Coding CLI ツールが発展するにつれて、**業界では徐々にいくつかのデフォルトの約束事や規範が形成されてきた。この章ではそれらを紹介していく。**

まず、AI Coding CLI はチャットツールではない。これは、**リポジトリを読み、コマンドを実行し、ファイルを書き換えることのできるエンジニアリング代理人**だと考えると分かりやすい。だからこそ、リポジトリの中には、大規模モデルの仕事を導くための約束されたファイルが必要になる。

## 2.1 Agents 向けの説明文書

最近の AI が書いたコードリポジトリを見ていると、リポジトリのルートに `AGENTS.md`、`CLAUDE.md`、`GEMINI.md` のようなファイルが置かれていることがよくある。

その仕組み自体はとても単純だ。

 - <p class="text-red"><strong>AI Coding CLI ツールを起動すると、この Markdown ファイルはデフォルトでコンテキストに読み込まれる。</strong></p>

{{< admonition type=tip title="AGENTS.md について" open=true >}}

`AGENTS.md` (<https://agents.md/>) は、リポジトリ主説明文書のための仕様を定めたオープン標準であり、現在は Codex と Gemini に採用されている。その定義は次のとおりだ。

> Think of AGENTS.md as a README for agents: a dedicated, predictable place to provide the context and instructions to help AI coding agents work on your project.

つまり、
 - `README.md` は人間向けで、クイックスタート、プロジェクト紹介、コントリビューションガイドなどを主に置く。
 - `AGENTS.md` は Agent 向けで、ビルド手順、テスト方法、コード規約、README に入れると冗長になるが Agent にとっては重要な詳細を書く。

この 2 つは互いを置き換えるのではなく、相互補完の関係にある。

{{< /admonition >}}

現在よく使われる CLI ツールでは、入口となるファイル名の慣習はおおむね次のとおりだ。

1. [Claude Code](https://code.claude.com/docs/ja/memory#claude-md-%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB): `CLAUDE.md` を使う
2. [Codex CLI](https://developers.openai.com/codex/guides/agents-md): `AGENTS.md` を使う
3. [Gemini CLI](https://geminicli.com/docs/cli/gemini-md/): `GEMINI.md` を使うか、設定ファイルで変更できる

開発者ごとに使うツールが異なるため、実務上は 1 つの主説明文書を維持しつつ、各ツールが期待するファイル名をシンボリックリンクで同じ文書へ向けるやり方がよく使われる。例えば:
```bash
./AGENTS.md
./CLAUDE.md@ -> AGENTS.md
./GEMINI.md@ -> AGENTS.md
```

ここで 1 つ、オープンソースリポジトリの例を挙げる。それはこのブログで使っているフレームワーク [Gohugo](https://github.com/gohugoio/hugo) だ。このフレームワークは 13 年の歴史を持つが、最近になって Agent 向けの説明文書も導入した。
 - AGENTS.md: https://github.com/gohugoio/hugo/blob/master/AGENTS.md
 - CLAUDE.md: https://github.com/gohugoio/hugo/blob/master/CLAUDE.md

## 2.2 Skills - Agent 向けの遅延読み込みマニュアル

Agent にとって、必要な情報をすべて `AGENTS.md` に詰め込んでしまうと、コンテキストは簡単に膨れ上がってしまう。

中には、無関係な仕事をしているときには知らなくてもよく、関連する問題に遭遇したときにだけ対応する文書を読めばよい情報もある。

こうした問題意識から生まれたのが `SKILL.md` だ。

{{< admonition type=tip title="SKILL.md について" open=true >}}

`SKILL.md` (<https://agentskills.io/what-are-skills>) もまたオープン標準であり、Skills に関する一連の規範を定めている。現在、すべての AI Coding CLI ツールはこの形式を採用している。

その定義はこうだ。
> Agent Skills are folders of instructions, scripts, and resources that agents can discover and use to do things more accurately and efficiently.


そしてその仕組みの核心は、[この一文](https://agentskills.io/what-are-skills#how-skills-work) にある。
> Skills use **progressive disclosure** to manage context efficiently

**漸進的開示 (progressive disclosure)** によって、SKILL.md の長い本文は**必要なときだけ**読み込まれ、一気にコンテキストを圧迫しないようになっている。

{{< /admonition >}}

ここでは、具体的な SKILL.md の例を 1 つ示す（*Code を開いて参照*）。

````
---
name: summarize-experiment
description: アルゴリズム実験の結果を要約する。実験出力の分析、異なる実験設定の比較、指標変化の要約、実験振り返りの執筆などを依頼されたときに使う。
---

ユーザーから実験結果の要約を求められたら、次の順番で行う。

1. まずリポジトリの説明ファイルを読み、このプロジェクトにおける実験ディレクトリ、ログ形式、指標名、結果保存場所を確認する。
2. 直近の実験出力ファイルを探す。例えば:
    ```bash
    find . -type f \( -name "*.log" -o -name "*.json" -o -name "*.yaml" -o -name "*.csv" \) | tail -n 50
    ```
3. よくある指標フィールドを検索する。例えば:
    ```bash
    rg -n "accuracy|acc|auc|f1|precision|recall|loss|ndcg|mrr|bleu|rouge" .
    ```
4. 実験が複数ある場合は、次を優先して抽出する:
    - 実験設定の差分
    - データセットの差分
    - ランダムシードの差分
    - 主要指標の変化
5. 結果を出力するときは、次の形式で要約する:
    - 今回の実験目的
    - 主要設定
    - 中核指標
    - ベースラインとの違い
    - 可能性のある原因
    - 次の提案
6. 指標の揺れが異常なら、必ず次を確認してユーザーに注意を促す:
    - データセットやデータ分割が変わっていないか
    - ランダムシードが変わっていないか
    - 評価スクリプトが変わっていないか
    - 学習が未収束、またはログ不完全ではないか
````
<p class="post-emphasis-center post-note">（例: 実際のアルゴリズム実験フローをまとめた Skill）</p>

この Skill は、Agent が実験結果の要約を依頼されたときにどう振る舞うべきかを定義している。

そして、その動作原理も実はとても単純だ。

 - <p class="text-red"><strong>AI Coding CLI ツール起動時には、各 SKILL.md のうち '---' で囲まれた 'name' と 'description' の部分だけがデフォルトでコンテキストに読み込まれ、それ以外の本文は、その Skill が実際に使われたときにだけ読み込まれる。</strong></p>

つまり、次の部分だけ:
```
---
name: summarize-experiment
description: アルゴリズム実験の結果を要約する。実験出力の分析、異なる実験設定の比較、指標変化の要約、実験振り返りの執筆などを依頼されたときに使う。
---
```
が CLI 起動時に読み込まれ、その下の本文はどれだけ長くても、「漸進的開示」によって、その Skill が必要になったときにだけモデルのコンテキストへ入る。

こうして、AI Coding CLI は起動時点でどんな Skill を持っているかを知り、対応する呼び出し条件に遭遇したときに、その Skill を読み込めるようになる。

## 2.3 説明文書と SKILLS.md の発見階層

上の 2 つの約束事は、AI Coding CLI におけるコンテキスト管理の中でも特に重要な 2 つの概念だ。

**ただし、`CLAUDE.md / AGENTS.md` はプロジェクトのルートにしか置けないわけではない。**
 - ユーザーディレクトリにも置ける。そうすると、より広域なユーザーレベルのコンテキストになる。
 - プロジェクトのサブディレクトリにも置ける。そうすると、現在の作業ディレクトリにより近い、局所的なコンテキストになる。

Codex を例にすると、公式にはその階層は次のように定義されている。

1. AGENTS.md
    - リポジトリのルール、作業規約、長期的制約を担う
    - 公式ドキュメントでは明示的に 3 層をサポートしている:
        - `グローバル級`: `~/.codex/AGENTS.md`
        - `プロジェクト級`: リポジトリルートの AGENTS.md
        - `サブディレクトリ級`: プロジェクトルートから現在の作業ディレクトリまでの途中にある AGENTS.md
    - 現在の作業ディレクトリに近いほど優先度が高い
    - 参考: <https://developers.openai.com/codex/guides/agents-md#how-codex-discovers-guidance>
    - 参考: <https://developers.openai.com/codex/skills#where-to-save-skills>

**より汎用的な Markdown ほど階層は高く、より具体的な Markdown ほど階層は低い。**

**こうして書けば、説明文書は肥大化しにくく、Skill も再利用しやすくなる。**

# 3. AI Coding CLI ツールの入門

ツールの起動方法自体はとても簡単で、リポジトリ内で対応するコマンドを実行するだけでよい。

{{< image src="/posts/2026/programming-guide-for-the-new-era-2026/Snipaste_2026-04-17_23-41-58.png" width="100%" >}}

## 3.1 通常モード / 計画モード / 高権限モード

Shift + Tab でモードを切り替えられる。Claude Code には 3 種類のモードがある。

1. **通常モード (normal mode)**: デフォルトの作業モード。Claude はプロジェクト内容を直接読み、分析し、修正できるが、重要な操作では依然として確認を求める。
2. **計画モード (plan mode)**: 調査、分析、実行計画の作成だけを行い、ファイルは直接変更しない。先に方針を見て影響範囲を評価してから、着手するか決めたいときに向いている。
3. **高権限モード (always accept edits on)**: Claude が逐次確認なしで直接編集を行える。目標がすでに明確で、連続して改動を完了してほしいときに向いている。

*(Codex の場合、Shift + Tab で切り替えられるのは最初の 2 モードだけで、高権限モードは `/permissions` コマンドで明示的に有効化する必要がある。)*

## 3.2 よく使う Slash コマンド

対話インターフェースで `/` から始まる特定のコマンドを入力すると、特定の機能が使える。ツールごとに完全には一致しないが、大まかに共通していて、しかもよく使うのは次のようなものだ。

1. `/init`: プロジェクトを初期化する。`git init` に近いイメージで、ここでの `/init` は AGENTS.md 文書を初期化することを指す
2. `/model`: モデルを切り替える
3. `/skills`: 現在読み込まれている技能を確認・管理する
4. `/status`: 現在のセッション状態、権限、コンテキスト使用量、Token 使用量などを確認する
5. `/compact`: 長い会話のコンテキストを圧縮する（コンテキストウィンドウが埋まりそうなときに使う）
6. `/clear`: コンテキスト履歴を消去する（話題を切り替えたいときに使う）

Claude Code には、さらに Codex にはない独自の Slash コマンドもいくつかある。

1. `/rewind`: コンテキストを過去のある時点まで巻き戻す。入力を誤って戻したいときや、別の分岐を試したいときにとても便利だ。
2. `/btw`: “by the way モード”。主タスクを中断せず、主コンテキストも汚さずに、小さな質問を一時的に差し込める。たとえば作業中に「この設定項目は何か」「このコマンドはどう書くか」のような小さな確認をして、終わったらその話題だけ閉じたいときに向いている。
3. `/plugin`: Claude Code 独自のプラグインマーケットプレイス。アプリストアのようなもので、各種プラグイン、Skills、MCP を検索して直接インストールできる。

<p style="color: #6f6f73; font-style: italic;">（Codex はこのあたりの機能を今のところ追ってこなかった。個人的には、これは両者の設計思想の違いなのだと思う。Codex はもっと簡潔なツールを目指していて、巻き戻しやプラグインに頼らなくても、自然言語だけで等価な機能を得られると考えているのだろう。）</p>

## 3.3 Skill の明示呼び出しと暗黙呼び出し

Skill を明示的に呼び出したい場合は、`$<SkillName>` (Codex) または `/<SkillName>` (Claude Code) を使える。例えば:

{{< image src="skill-explicitly-trigger.en.png" width="80%" caption="命令の中に skill 名を含めると、明示的に呼び出せる。" >}}

{{< image src="/posts/2026/programming-guide-for-the-new-era-2026/use-skills.png" width="80%" caption="ツールごとに Skill の明示呼び出し方法は異なる。Codex は $、Claude Code は / を使う。" >}}

また、どの Skill を使うべきかを明示しなくても、AI Coding CLI ツールは作業中に SKILL.md の `"description"` フィールドに書かれた「呼び出し条件のヒント」に基づいて、自動的に Skill を呼び出すことがある。

# 4. AI Coding CLI ツールのいくつかの上級 / 前沿機能

今日（2026 年 4 月 18 日）の時点では、ほとんどの人にとって必要なのは、実は上で述べた内容を押さえたうえで、自分の `AGENTS.md` / `CLAUDE.md` / `GEMINI.md` と Skills リポジトリをしっかり作り込み、十分に賢い大規模モデルのインターフェースにつなぐことだけだ。それだけでも Agent にかなり難しいタスクをやらせられるようになる。

ただ、人間は目の前のもので満足しない。いつだって、モデルの能力をできるだけ限界まで引き出そうとする。なのでこの章では、私が取り上げる価値があると思うものを選びつつ、いわゆる Harness Engineering の界隈が CLI ツールに与えようとしている、いくつかの上級 / 前沿機能について話してみたい。

## 4.1 Subagents（子代理）

Agent が特定のタスクを実行するとき、その中でさらにいくつかの Subagent(s) を呼び出し、特定の仕事を任せられることがある。これらの Subagent(s) は、次の特徴を持つ。
 - 独立したコンテキスト（主 Agent のコンテキストを継承しない）
 - カスタムされたシステムプロンプト（自分の担当タスクを遂行するため）
 - 特定のツールアクセス権限と独立した許可

少し抽象的なので、ここでは [Claude Code 公式の例](https://code.claude.com/docs/ja/sub-agents#%E3%83%87%E3%83%BC%E3%82%BF%E3%82%B5%E3%82%A4%E3%82%A8%E3%83%B3%E3%83%86%E3%82%A3%E3%82%B9%E3%83%88) を直接見てみよう。
```
---
name: data-scientist
description: データ分析の専門家。SQL クエリ、BigQuery 操作、データインサイトが得意。データ分析タスクやクエリでは積極的に使うべき。
tools: Bash, Read, Write
model: sonnet
---

あなたは SQL と BigQuery 分析を専門とするデータサイエンティストだ。

呼び出されたら:
1. 分析要求を理解する
2. 効率的な SQL クエリを書く
3. 必要に応じて BigQuery CLI (`bq`) を使う
4. 結果を分析し要約する
5. 発見を分かりやすく提示する

重要な実践:
- 適切なフィルタを入れた最適化 SQL を書く
- 適切な集約と JOIN を使う
- 複雑なロジックには説明コメントを加える
- 結果を読みやすく整形する
- データに基づく提案を出す

各分析について:
- クエリ方針を説明する
- すべての仮定を書く
- 重要な発見を強調する
- データに基づく次の提案を行う

クエリは常に効率的かつコスト効率よくすること。
```
<p class="post-emphasis-center post-note">（Claude Code 公式の Subagent 例: データサイエンティスト）</p>

<p class="text-red"><strong>見て分かるように、Subagent のフォーマットは Skill と非常によく似ている。</strong></p>

<p class="text-red"><strong>そのため、Subagent の呼び出し方も Skill と非常によく似ており、明示呼び出しと暗黙呼び出しの両方がある。</strong></p>

[Claude Code 公式ドキュメントの Subagents 章](https://code.claude.com/docs/ja/sub-agents#%E3%82%B5%E3%83%96%E3%82%A8%E3%83%BC%E3%82%B8%E3%82%A7%E3%83%B3%E3%83%88%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B) では、次のように明記されている。
 - Claude は、リクエスト内のタスク記述、subagent 設定内の description フィールド、現在のコンテキストに基づいて自動的に委任する。
 - 自動委任だけでは足りない場合は、自分で subagent を指定して呼び出せる。

さらに、Subagent は [バックグラウンド実行](https://code.claude.com/docs/ja/sub-agents#%E3%82%B5%E3%83%96%E3%82%A8%E3%83%BC%E3%82%B8%E3%82%A7%E3%83%B3%E3%83%88%E3%82%92%E3%83%95%E3%82%A9%E3%82%A2%E3%82%B0%E3%83%A9%E3%82%A6%E3%83%B3%E3%83%89%E3%81%BE%E3%81%9F%E3%81%AF%E3%83%90%E3%83%83%E3%82%AF%E3%82%B0%E3%83%A9%E3%82%A6%E3%83%B3%E3%83%89%E3%81%A7%E5%AE%9F%E8%A1%8C%E3%81%99%E3%82%8B) もサポートしており、並列タスクが可能になる。これは Skill にはない能力だ。

## 4.2 Ralph Loop

Ralph Loop はサードパーティのリポジトリで、出典は <https://github.com/snarktank/ralph> だ。

{{< image src="/posts/2026/programming-guide-for-the-new-era-2026/Ralph-Loop.png" width="70%" >}}

Ralph Loop の思想は、**Agent にタスクリストに従って自動的に何度も実行させ、最後までやり切らせる**というものだ。

<p class="text-red"><strong>ここでいう「自動」とは、Agent が完全な権限を持ち、人間の確認を必要としないという意味だ。人は本当に寝ていてもいい。</strong></p>

その仕組みはソースコードを見ると分かりやすい。
 - <https://github.com/snarktank/ralph/blob/6c53cb0b831ebe8739c6a003e22af14902d8b0b5/ralph.sh#L84>

```shell
for i in $(seq 1 $MAX_ITERATIONS); do
  echo ""
  echo "==============================================================="
  echo "  Ralph Iteration $i of $MAX_ITERATIONS ($TOOL)"
  echo "==============================================================="

  # Run the selected tool with the ralph prompt
  if [[ "$TOOL" == "amp" ]]; then
    OUTPUT=$(cat "$SCRIPT_DIR/prompt.md" | amp --dangerously-allow-all 2>&1 | tee /dev/stderr) || true
  else
    # Claude Code: use --dangerously-skip-permissions for autonomous operation, --print for output
    OUTPUT=$(claude --dangerously-skip-permissions --print < "$SCRIPT_DIR/CLAUDE.md" 2>&1 | tee /dev/stderr) || true
  fi

  # Check for completion signal
  if echo "$OUTPUT" | grep -q "<promise>COMPLETE</promise>"; then
    echo ""
    echo "Ralph completed all tasks!"
    echo "Completed at iteration $i of $MAX_ITERATIONS"
    exit 0
  fi

  echo "Iteration $i complete. Continuing..."
  sleep 2
done
```
<p class="post-emphasis-center post-note">（Ralph Loop の中核ロジック部分）</p>

その中で最も重要なのは、次の 1 行だ。

```shell
claude --dangerously-skip-permissions --print
```
- `--dangerously-skip-permissions`: Claude Code に完全権限を与え、人間の確認を不要にする
- `--print`: Claude Code を非対話モードで動かす（公式ドキュメント: [Claude Code をプログラムから実行する](https://code.claude.com/docs/ja/headless) を参照）

Ralph Loop は `for` ループで Claude を回す際、各イテレーションで Progress Report を記録し、それを次のイテレーションへ渡している。参考:
- <https://github.com/snarktank/ralph/blob/main/prompt.md#consolidate-patterns>

<p class="text-red"><strong>そして、こうした反復を通じて、徐々に進捗を前に進め、最終的にタスク完了まで持っていく。</strong></p>

私の考えでは、Ralph Loop は GitHub リポジトリ内での利用シーン（プロダクト機能開発）に加えて、特に次の 2 つの場面にも向いている。
1. 非常に見つけにくいシステム Bug の分析と特定
2. アルゴリズムモデル性能の改善

## 4.3 Agent Teams（代理チーム）

Agent Teams は Claude Code の <u>実験的機能</u> であり、公式ドキュメントには [Subagents との違い](https://code.claude.com/docs/ja/agent-teams#subagents-%E3%81%A8%E3%81%AE%E6%AF%94%E8%BC%83) を説明する図がある。

{{< image src="/posts/2026/programming-guide-for-the-new-era-2026/subagents-vs-agent-teams-light.avif" width="100%" caption="Subagents は主 Agent にだけ結果を返し、互いには会話しない。一方、agent teams ではメンバーがタスクリストを共有し、作業を引き受け、互いに直接コミュニケーションする。" >}}

ただ、この機能は複数の「Teammate」を立ち上げ、しかもその「Teammate」同士が互いに会話もできるため、Token 消費が非常に激しい。そのわりに、現時点では Agent Teams が実運用で本当にうまく使われている場面をまだあまり見ていないので、~~Anthropic が Token をもっと売るために考えた、実用性の低い華やかな機能なのではないかと言いたくもなる~~。もちろん、これを単に実験的な機能として受け止め、今後この仕組みを使って本当に価値あるプロダクトを作る人が現れるのを期待してもよい。

# 5. 個人的な利用経験と理解

## 5.1 1 つの原則: メインリポジトリで雑談しない

**メインリポジトリでは、現在のプロジェクトに直接関係することだけをやる。**

もし、もっと開いた話題や別の話題をしたいなら、例えば:

1. 学習ルート
2. 副次プロジェクトの brainstorming
3. アーキテクチャ方針の比較
4. その他のさらに関係の薄い雑談や Q&A

より良いやり方は、次のとおりだ。

1. 別の一時ディレクトリを作って、新しく Codex / Claude のセッションを立ち上げ、その新しいセッションでやり取りする
2. 新しいセッションの中で話題を変える前には、`/clear` する

<p class="text-red"><strong>理由は単純だ。既存のコンテキストは、新しい質問に対する Agent の判断を乱すし、新しい質問は元のプロジェクト主線のコンテキストも汚してしまう。</strong></p>

## 5.2 Subagents と Skills の違い

[Subagents](https://code.claude.com/docs/ja/skills) と [Skills](https://code.claude.com/docs/ja/sub-agents) は <u>Markdown の形式が非常によく似ている</u> が、本質的には別物だ。公式ドキュメントによれば、その違いは次のとおりだ。

- Skill の本体は `SKILL.md` であり、文書の言い方を借りれば「Skills は Claude ができることを拡張する」。Claude はそれを「自分のツールキットに追加し」、関連するときに読み込んだり、`/skill-name` で呼び出したりする。本質的には、説明、知識、ワークフロー、タスクスクリプトの集合だ。
- Subagent の本体は「専門化された AI アシスタント」であり、それぞれが「自分自身のコンテキストウィンドウで動作」し、独自のシステムプロンプト、ツール権限、独立した許可を持つ。主 Claude は適合するタスクをそれに委任し、Subagent は独立して作業したあと結果を返す。

つまり:

- Skill が解決するのは、「この種のことに遭遇したら、どんなルールや台本に従って行うべきか」だ。
- Subagent が解決するのは、「この仕事を誰に任せ、どんな隔離されたコンテキストと権限で実行させるか」だ。

もう 1 つ、混同されやすいが公式文書には明確に書かれている点がある。Skill も `context: fork` を設定でき、その場合は subagent による隔離環境で実行される。しかし、それでも本質は変わらない。文書では「skill content becomes the prompt that drives the subagent」と書かれている。つまり、subagent の中で動いていたとしても、Skill は依然として「タスク説明 / プロンプト」であり、「実行者」そのものではない。実行者はあくまで subagent という種類の存在だ。

## 5.3 ツールごとの違い

2025 年初頭から、OpenAI は大規模モデルアプリで最も広く使われていた `/chat/completions` API を段階的に廃止し、`/responses` API へ移行してきた。その結果、大規模モデル推論の基盤インターフェースは相互互換ではなくなり、異なるツールを同じモデルにつないで純粋比較することが難しくなった。

この点について、私はすでに智譜公式に要望を出している (<https://github.com/zai-org/GLM-5/issues/39>)。OpenAI の `/responses` API を互換実装して Codex に対応してほしい、という要望だ。もしそうなれば、将来的には同じモデルに接続した状態で Claude Code と Codex の長短を比較しやすくなるだろう。

総じて言えば、
- エコシステムの成熟度だけを見るなら、現時点ではやはり Claude Code のほうが強い。特に `/marketplace` とコミュニティ活性の面でそうだ。
- 実行体験だけを見るなら、Codex はとても強い。Agent Loop の実行は速く、探索能力も高く、特にリポジトリの規約、制約、コマンドがよく整備されている場合に向いている。

ただし、現時点ではツールとモデルの結びつきがまだかなり深いため、モデルから切り離してツール単体の良し悪しを評価するのは難しい。

また、GPT-5.4、Opus4.6、GLM-5.1、MINIMAX-M2.7 などのモデル差については、ここでは評価しない。実際に使いながら体感したり、周囲やネット上の人と意見交換したりすれば、各自それなりの使用感が見えてくると思う。

# 6. まとめ

以上の内容を通して、AI Coding CLI ツールがもたらす生産性の大きな向上を、より多くの人が実感し、新しい Vibe Coding という働き方の魅力を感じ、~~ついでに自分の仕事が AI に置き換えられるかもしれないという不安も少し味わって~~ もらえたらと思う。

すでに Claude Code / Codex CLI / Gemini CLI のような CLI ツールを使い始めている人、あるいは深く使っている人にとっては、上の内容は比較的浅く、十分に網羅的ではないかもしれない。それでも、これから入門する大多数の人にとっては、十分すぎるくらいの資料にはなっているはずだ。

学習が進んできたら、さらに多くの公式ドキュメント、ネット上の資料、フォーラムなども読んで、自分が AI をより上手に扱う力を深めていくことを勧めたい。

最後に、楽しい Token 焼きを！


# 7. おすすめの参考資料

## 7.1 （おすすめ）Claude Code ベストプラクティス:

{{< image src="/ja/posts/2026/programming-guide-for-the-new-era-2026/Claude-Code-Best-Practice.ja.png" width="60%" >}}

Claude Code が以前に公開した公式ベストプラクティスガイド。さまざまなコードベース、言語、環境の中で Anthropic 社内チームが実際に有効だと確認した使い方がまとめられている。内容の多くは Codex にも当てはまる。

 - <https://code.claude.com/docs/ja/best-practices>

## 7.2 Claude Code のソースコード級解説

{{< image src="/ja/posts/2026/programming-guide-for-the-new-era-2026/Learn-Claude-Code.ja.png" width="60%" >}}

以前に誤って公開されてしまった Claude Code のソースコードをもとに、大規模モデルを使って作られた解説サイト:

 - <https://learn.shareai.run/ja/>

Harness Engineering、Agent の実行メカニズム、コンテキストの編成方法、あるいはこうしたツールが内部でどう組み上がっているかに興味があるなら、このサイトは延伸読書としてかなり向いている。

# 参考リンク

1. Vibe Coding に関する Andrej Karpathy の X 投稿: <https://x.com/karpathy/status/1886192184808149383>
2. Claude Code
    - 公式ドキュメント: <https://code.claude.com/docs/ja/quickstart>
    - CLAUDE.md: <https://code.claude.com/docs/ja/memory#claude-md-%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB>
    - Skills: <https://code.claude.com/docs/ja/skills>
3. OpenAI - Codex
    - 公式ドキュメント: <https://developers.openai.com/codex/cli>
    - AGENTS.md: <https://developers.openai.com/codex/guides/agents-md>
    - Skills: <https://developers.openai.com/codex/skills/>
4. Google - Gemini CLI
    - 公式ドキュメント: <https://geminicli.com/docs/get-started/>
    - GEMINI.md: <https://geminicli.com/docs/cli/gemini-md/>
    - Skills: <https://geminicli.com/docs/cli/skills/>
5. AGENTS.md のオープン標準: <https://agents.md/>
6. Agent Skills のオープン標準: <https://agentskills.io/>
8. Ralph プロジェクト: <https://github.com/snarktank/ralph>
