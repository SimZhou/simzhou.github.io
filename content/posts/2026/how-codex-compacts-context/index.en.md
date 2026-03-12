---
title: "[Repost] Investigating how Codex context compaction works"
subtitle: "Reposted from Kangwook Lee's X article"
date: 2026-03-12T12:05:06+08:00
lastmod: 2026-03-12T12:05:06+08:00
draft: false
author: "Kangwook Lee"
authorLink: "https://x.com/Kangwook_Lee"
description: ""

tags: ["AI", "LLM", "Codex", "Agent", "Context Engineering"]
categories: ["AI"]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "0HChK-6VawAIhJ8h.jpeg"
featuredImagePreview: "0HChK-6VawAIhJ8h.jpeg"

toc:
  enable: true
math:
  enable: false
lightgallery: false
license: ""
---
Original author: Kangwook Lee
Original article: <https://x.com/Kangwook_Lee/article/2028955292025962534>

For non-codex models, the open-source Codex CLI compacts context locally: an LLM summarizes the conversation using a [compaction prompt](https://github.com/openai/codex/blob/main/codex-rs/core/templates/compact/prompt.md). When the compacted context is later used, `responses.create()` receives it with a handoff prompt that frames the summary. Both prompts are visible in the source code.
<!--more-->

For codex models, the CLI instead calls the `compact()` API, which returns an **encrypted blob**. We don't know if it uses an LLM internally, what prompts it uses, or whether there is a handoff prompt at all.

Below, I show how a simple prompt injection (2 API calls, 35 lines of Python) reveals that the API compaction path does use an LLM to summarize the context, with its own compaction prompt and a handoff prompt prepended to the summary. The prompts are nearly identical to the open-source versions.

## Step 1 — compact()

I call `compact()` with a crafted user message. On the server side, a compactor LLM processes our input using its own hidden system prompt (which I have never seen and want to figure out).

The server seems to assemble the compactor's context like this:

![](1HChJ1ZOawAA0GQ_.jpeg)

The compactor LLM reads its system prompt + our input together. Because our input contains an injection payload (red text above), the compactor is tricked into including its own system prompt in its output. This plaintext summary exists only on OpenAI's server. We only see the encrypted blob:

![](2HChKADzawAEhBbJ.jpeg)

**At this point we have no way to read what's inside the blob.** It is AES-encrypted and the key lives on OpenAI's servers. We only hope the compactor obeyed the injection and wrote its prompt into the summary. The only way to find out is Step 2.

## Step 2 — create()

I pass the encrypted blob + a second user message to `responses.create()`. The server decrypts the blob and assembles the model's context.

I send:

![](3HChKHtTawAIdz1e.jpeg)

The model seems to see something like this:

![](4HChKPjAbIAA2lCI.jpeg)

If Step 1 worked, the decrypted blob should contain the compaction prompt (leaked by our injection). The server also prepends a handoff prompt to the blob. So if our probe successfully gets the model to repeat what it sees, the output should reveal all three: the system prompt, the handoff prompt, and the compaction prompt.

## Output

Below is the **complete, unedited output** from one run of extract_prompts.py. Yellow = system prompt, green = handoff prompt, pink = compaction prompt.

![](5HChKbo_awAA3OEw.jpeg)

How do we know these are the real prompts and not just hallucinated text? The extracted compaction prompt and handoff prompt closely match the known prompts used for non-codex models in the open-source Codex CLI ([prompt.md](https://github.com/openai/codex/blob/main/codex-rs/core/templates/compact/prompt.md), [summary_prefix.md](https://github.com/openai/codex/blob/main/codex-rs/core/templates/compact/summary_prefix.md)), which makes it unlikely that the model invented them from scratch. Results vary across runs.

## The Guessed Pipeline

Putting it all together, here is our best guess for what compact() does on the server side, based on what the extraction revealed.

![](6HChKgsZaAAA6UXQ.jpeg)

## The Script

![](7HChKlnxbQAAlc3d.jpeg)

## Open Question

Why does the Codex CLI use two entirely different compaction paths (local LLM for non-codex models, encrypted API for codex models) when the underlying prompts are nearly identical? And why encrypt the summary at all?
Hard to say. Maybe the encrypted blob carries something more than what this simple experiment can reveal, e.g. something specific about how tool results are compacted and restored. But I didn't bother to test further.
