---
title: "Investigating how Codex context compaction works"
subtitle: "Reposted from Kangwook Lee's X article"
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
Original author: Kangwook Lee  
Original article: <https://x.com/Kangwook_Lee/article/2028955292025962534>

This page is a repost-style version prepared from my locally saved `article.html`. The screenshots / diagrams from the X article are omitted here for now, while the structure and prose are preserved as closely as possible.
<!--more-->

For non-codex models, the open-source Codex CLI compacts context locally: an LLM summarizes the conversation using a compaction prompt. When the compacted context is later used, `responses.create()` receives it with a handoff prompt that frames the summary. Both prompts are visible in the source code.

For codex models, the CLI instead calls the `compact()` API, which returns an encrypted blob. We don't know if it uses an LLM internally, what prompts it uses, or whether there is a handoff prompt at all.

Below, I show how a simple prompt injection (2 API calls, 35 lines of Python) reveals that the API compaction path does use an LLM to summarize the context, with its own compaction prompt and a handoff prompt prepended to the summary. The prompts are nearly identical to the open-source versions.

## Step 1 — compact()

I call `compact()` with a crafted user message. On the server side, a compactor LLM processes our input using its own hidden system prompt, which is exactly what I wanted to figure out.

The server seems to assemble the compactor's context in a way roughly like the diagram shown in the original article.

The compactor LLM reads its system prompt and our input together. Because our input contains an injection payload, the compactor is tricked into including its own system prompt in its output. This plaintext summary exists only on OpenAI's server. We only see the encrypted blob.

At this point, we have no way to read what's inside the blob. It is AES-encrypted and the key lives on OpenAI's servers. We can only hope the compactor obeyed the injection and wrote its prompt into the summary. The only way to find out is Step 2.

## Step 2 — create()

I pass the encrypted blob plus a second user message to `responses.create()`. The server decrypts the blob and assembles the model's context.

I send a second probing message.

The model then seems to see something like the context layout shown in the original article.

If Step 1 worked, the decrypted blob should contain the compaction prompt leaked by our injection. The server also prepends a handoff prompt to the blob. So if our probe successfully gets the model to repeat what it sees, the output should reveal all three:

- the system prompt
- the handoff prompt
- the compaction prompt

## Output

The original article then shows the complete, unedited output from one run of `extract_prompts.py`. Yellow marks the system prompt, green marks the handoff prompt, and pink marks the compaction prompt.

How do we know these are real prompts rather than hallucinated text?

Because the extracted compaction prompt and handoff prompt closely match the known prompts used for non-codex models in the open-source Codex CLI, specifically:

- `prompt.md`
- `summary_prefix.md`

That makes it much less likely that the model invented them from scratch. Results still vary across runs.

## The Guessed Pipeline

Putting it all together, the article gives a best-effort guess for what `compact()` does on the server side, based on what the extraction revealed.

## The Script

The original article includes a screenshot of the script used for the experiment.

## Open Question

Why does the Codex CLI use two entirely different compaction paths:

- local LLM compaction for non-codex models
- encrypted API compaction for codex models

when the underlying prompts are nearly identical? And why encrypt the summary at all?

Hard to say.

Maybe the encrypted blob carries something more than what this simple experiment can reveal, for example something specific about how tool results are compacted and restored. But the original article stops there.

## Note

What makes this article interesting is that it turns a product-level intuition into a concrete systems story:

- compaction prompt
- handoff prompt
- encrypted blob
- two-stage recovery

That suggests Codex's long-task continuity is not just about having a large context window. It is also about how task state gets compacted and handed off.
