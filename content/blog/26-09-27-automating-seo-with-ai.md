---
title: Automating SEO with AI
description: How I grade every page of a website with a cheap judge model, then send AI agents to improve the worst ones
date: 2026-09-27
tags:
  - webdev
  - search engine optimisation
  - ai
draft: false
eleventyExcludeFromCollections: true
noindex: true
---

I've been automating the SEO work behind my [site audits](https://www.chobble.com/services/seo-audits/), and the model economics have got silly enough to be worth a post.

The job splits in two: grade every page of a site, then rewrite the worst ones. For the grading I use Jev, the first of [TypeSafe](https://typesafe.ai/)'s "System One" models. It doesn't generate text at all - you POST it a page's extracted content plus a set of questions (a true/false, a score against a rubric, a choice from a list) and it answers all of them in one pass, each with a calibrated probability and a confidence score. No hallucination, because the output space is closed. Input is about $0.04 per million tokens and output is free, so my last sweep - 580 pages, one call each - cost single-digit cents.

The rewrites are done by ordinary LLM agents: [GLM 5.3 Flash](https://docs.neuralwatt.com/) via Neuralwatt, at $0.15 in and $0.50 out per million tokens, or the "flex" variant at 35% off for lower priority. Flex is slower under load, which interactive chat hates and overnight batches don't notice. A full research-and-draft run on one page costs about a penny.

The intelligence sits in files, not prompts: a voice doc, content rules, and a few dozen rubric checks (EEAT, searcher intent, concrete facts vs filler) that weight-sum into a 0-100 score per page. Agents get a fresh context per page and a restricted toolset, drafts get re-graded with the same rubric before upload, and a human approves every diff. I'm not publishing the rubric - writing it per site is the paid work.

Anyway: whole sites graded for cents, rewritten for pennies, with the checking still done by a person. If you want to build your own version, point a judge at [OpenCode Zen](https://opencode.ai/zen) and your writers at [Neuralwatt](https://docs.neuralwatt.com/) or [OpenRouter](https://openrouter.ai).

If you'd rather I did it for you, [get in touch](https://www.chobble.com/contact/) - the lighter version is my [SEO audits](https://www.chobble.com/services/seo-audits/) service.
