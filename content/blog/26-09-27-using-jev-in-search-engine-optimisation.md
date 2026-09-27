---
title: Using Jev in Search Engine Optimisation
description: Using Jev in search engine optimisation - how I scan and grade every page of a website for a few cents, then fix the worst pages with cheap AI agents
date: 2026-09-27
tags:
  - webdev
  - search engine optimisation
  - ai
draft: false
---

The interesting bit of my recent [SEO work](https://www.chobble.com/services/seo-audits/) has been using Jev in search engine optimisation. Jev is a new model from [TypeSafe](https://typesafe.ai/), built for judging things rather than writing them, and it's cheap enough that I can scan every page of a client's website with it - 580 pages in my last job - for a few cents.

Doing that with normal LLMs gets expensive fast, because every question you ask a chat model bills output tokens, and a judgement on every page of a big site means hundreds of calls. Jev doesn't generate text at all: you send it a page's content plus a list of questions, each with a fixed answer shape - a true/false, a score against a scale you define, or a pick from a list - and it answers every question in one go, each with a probability and a confidence score. It can't make things up, because it can only answer in the shapes you gave it. Input costs about $0.04 per million tokens and output is free.

The catch is that it's only as good as your questions. Mine ask about the things that matter for search - does the copy show real experience of the thing, does the page answer what someone searching for it actually wants, is it concrete facts or filler - and each answer has a weight, so every page comes out with a score out of 100 and I can put the whole site in order, worst first. Writing good questions for a site is slow and I'm not publishing mine, because that's the real work here - the model bill is nothing.

The rewrites are ordinary LLM agents on cheap open-weights models: [GLM 5.3 Flash](https://docs.neuralwatt.com/) through Neuralwatt, which has a "flex" option at 35% off where your requests wait when their servers are busy. That's no good if you're sitting there waiting for a reply, but fine for a batch of rewrites left running overnight. Each page costs about a penny to research and redraft, and a person checks every change before it goes live.

If you want to try Jev yourself, it's on [OpenCode Zen](https://opencode.ai/zen) with pay-as-you-go credits.

This is the process I run on customer sites that ask me for SEO help. A lot of SEO is sold on a monthly retainer with the method kept vague, so clients end up feeling tied to the company forever; I'd rather show my workings, both because it demonstrates the work is real and not just pages fed in and out of a chatbot, and because I'd rather people kept paying me because the results are good than because they feel trapped. I charge an [hourly rate](https://www.chobble.com/prices/) for this, same as everything else I do, so my incentive is to get the most out of every hour I'm paid for - building things like this - rather than to keep anyone confused about where the money goes. My guess is that most people reading this would still rather not build it themselves, which is fine. If you want it done on your site, get in touch about my [SEO audits](https://www.chobble.com/services/seo-audits/), or [contact me](https://www.chobble.com/contact/) for a personalised quote.
