---
title: Hiding Adrian Chiles' posts on theguardian.com
description: Take 20 seconds to improve your life
date: 2024-12-05
tags:
---

You can use [uBlock Origin](https://github.com/gorhill/uBlock) (the *essential* ad-blocking browser extension) to filter web page elements on the text they contain, by using their pseudo-selector, `:has-text(/foo/)`

This means you can easily hide Adrian Chiles' posts from The Guardian homepage, by copying the following line to "My Filters" within the uBlock Origin dashboard:

`www.theguardian.com##div>div:has-text(/Adrian Chiles/)`

Easy!
