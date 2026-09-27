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

The interesting bit of my recent [SEO work](https://www.chobble.com/services/seo-audits/) has been a new model called Jev, from [TypeSafe](https://typesafe.ai/). It's built for judging things rather than writing them, and it's cheap enough that I can scan every page of a client's website with it - 580 pages in my last job - for a few cents.

Doing that with normal LLMs gets expensive fast, because every question you ask a chat model bills output tokens, and a judgement on every page of a big site means hundreds of calls. Jev doesn't generate text at all: you send it a page's content plus a list of questions, each with a fixed answer shape - a true/false, a score against a scale you define, or a pick from a list - and it answers every question in one go, each with a probability and a confidence score. It can't make things up, because it can only answer in the shapes you gave it. Input costs about $0.04 per million tokens and output is free.

The catch is that it's only as good as your questions. Mine ask about the things that matter for search - does the copy show real experience of the thing, does the page answer what someone searching for it actually wants, is it concrete facts or filler - and each answer has a weight, so every page comes out with a score out of 100 and I can put the whole site in order, worst first. Writing good questions for a site is slow and I'm not publishing mine, because that's the real work here - the model bill is nothing.

The rewrites are ordinary LLM agents on cheap open-weights models: [GLM 5.3 Flash](https://docs.neuralwatt.com/) through Neuralwatt, which has a "flex" option at 35% off where your requests wait when their servers are busy. That's no good if you're sitting there waiting for a reply, but fine for a batch of rewrites left running overnight. Each page costs about a penny to research and redraft, and a person checks every change before it goes live.

If you want to try Jev yourself, it's on [OpenCode Zen](https://opencode.ai/zen) with pay-as-you-go credits. Or I can do the whole thing for your site - the lighter version is my [SEO audits](https://www.chobble.com/services/seo-audits/) service, and you can [get in touch](https://www.chobble.com/contact/) from there.
