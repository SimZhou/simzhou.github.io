---
title: "How Codex Stays Coherent on Long Tasks"
subtitle: "Notes on compact(), handoff summaries, and context compression"
date: 2026-03-12T12:05:06+08:00
lastmod: 2026-03-12T12:05:06+08:00
draft: false
author: "Simon"
authorLink: ""
description: ""

tags: ["AI", "LLM", "Codex", "Agent", "Context Engineering"]
categories: ["AI"]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: ""
featuredImagePreview: ""

toc:
  enable: true
math:
  enable: false
lightgallery: false
license: ""
---
Original article link:  
[https://x.com/Kangwook_Lee/article/2028955292025962534](https://x.com/Kangwook_Lee/article/2028955292025962534)

This is an English repost-style note based on the original X article and the publicly quoted descriptions of it. The main idea is simple: Codex does not merely drop old history when a task gets long. Instead, it appears to perform a controlled handoff.
<!--more-->

## 1. The question

Why does Codex often feel more stable than a plain chat model during long, multi-step tasks?

One plausible answer is that it does not treat long-context overflow as a pure truncation problem. It treats it as a state handoff problem.

## 2. The key idea: `compact()`

According to the article, once the conversation becomes too long, the system can trigger `compact()`.

Rather than feeding the entire raw history back into the main model forever, the system creates a shorter handoff summary that preserves the working state of the task:

- the current goal
- what has already been tried
- what failed
- which constraints still matter
- what the next step should be

That is a very different strategy from naive truncation.

## 3. The flow described in the article

The reverse-engineered flow can be summarized like this:

1. When the context gets too long, the client triggers `compact()`
2. A dedicated compactor model creates a condensed handoff summary of the session
3. That summary is encrypted and returned to the client as a blob
4. On the next `responses.create()` call, the client sends the blob back
5. The server restores the handoff state and combines it with the new request for the main model

In other words, the system preserves continuity by passing forward a compact task state, not by replaying every old token every time.

## 4. Why this matters

This architecture explains several things:

- why Codex can stay coherent across long engineering sessions
- why it often feels more like an agent than a chat transcript
- why it is less likely to lose the thread after many iterations

It also suggests a broader design lesson:

> Long-running agents need explicit context management, not just larger windows.

## 5. Design lessons for agents

Three takeaways stand out.

### 5.1 Context management is a first-class capability

Many agent failures are really memory failures:

- poor handoff
- poor summarization
- poor task-state tracking

### 5.2 Raw history and working memory are different things

Raw history is useful for auditing.  
Working memory is what the system actually needs in order to continue a task well.

### 5.3 A compactor can be a separate model

One of the most interesting implications is architectural:

- one model solves the task
- another model maintains a compressed handoff state

That separation is often cleaner than forcing a single model to do everything.

## 6. Final thought

The most important insight here is not “Codex remembers everything.”

It is closer to this:

> Codex appears to stay coherent because it hands off task state well.

For long-running AI systems, that may matter more than raw context length.

## 7. Source

- Original link: <https://x.com/Kangwook_Lee/article/2028955292025962534>
- Publicly quoted summaries describe:
  - `compact()` being triggered for long sessions
  - a dedicated compactor producing a handoff summary
  - the summary being packaged as a blob and reused later
  - stronger continuity across long tasks as a result

If the full article becomes easier to access later, I may replace this note with a stricter full-text translation / repost.
