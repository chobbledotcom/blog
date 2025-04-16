---
title: Introducing the "Chobble Template"
description: An Eleventy template you can use to build a site
date: 2025-03-28
tags: webdev
---

Last month I made [an Eleventy and Nix static site template](/blog/25-02-16-template-for-eleventy-site-with-nix/) - a barebones template built with Nix, which I thought I'd use as a the basis for the websites I build for [Chobble](https://chobble.com).

But after using it for a few sites I noticed I was building the same type of components over and over - everyone wants a news section, a tiered navigation, social media links, a contact form, and responsive images - and I always want to push the site to Neocities, to use [MVP.css](https://andybrewer.github.io/mvp/) and [Turbo](https://turbo.hotwired.dev/), and to add the same few Eleventy plugins.

So, I've made the [Chobble Template](https://git.chobble.com/chobble/chobble-template) which I'm going to use as the basis for my websites going forwards. It's a flexible (but opinionated) framework for building lots of types of static websites, featuring things like:

- A news system with an archive page and RSS feed
- A product-listing system with categories and galleries
- A contact form using Formspark and Botpoison
- A reviews / testimonials system
- A "team" page with staff profiles
- Social media links with SVG icons from [Hugeicons](https://icon-sets.iconify.design/hugeicons/)
- Per-page header images and CSS styles
- A slightly-tweaked MVP.css
- A responsive design via `@media` breakpoints
- Tiered navigation from Eleventy's navigation plugin
- An XML sitemap
- A [Forgejo action](https://git.chobble.com/chobble/chobble-template/src/branch/main/.forgejo/workflows/neocities.yaml) to build and upload to Neocities

You can see it in action at [example.chobble.com](https://example.chobble.com).

The template will adjust itself based on the content available - if there's no products, news posts, or team members, it hides that bit from the navigation and doesn't generate pages for them.

In the future I imagine it containing other neat features like:

- JSON-LD structured data
- Per-product contact forms
- Stripe payment links
- Nice audio and video embeds
- Scripts to fetch and embed Google / Checkatrade / etc reviews
- Better caching for even faster builds

This will let me treat "static website builds" more like the kind of large-scale projects I'm used to. Each site be based on the monolithic template which does everything, but only the relevant pages will be rendered so build times will stay fast.

The template means I can go from "nothing" to "empty site live on a test domain" in just a few minutes - I just add a new site to my Neocities account, generate an API key, clone the template, and add the key to its secrets. Easy peasy!

Like all of my other code, the template is licensed as AGPL3, so you can either use it as a basis for your own project, or else [employ me](https://chobble.com) to do that for you.

Because I charge a flat hourly fee the template will either reduce the cost of building a straightforward website - or allow me to spend more time on frills and fancy aesthetics, which is what clients are really bothered about.

The link again to the template is [here](https://git.chobble.com/chobble/chobble-template) - and if you do end up using it, it'd be sweet is you could [drop me a message](https://chobble.com/contact/) - I'd love to see it in action.
