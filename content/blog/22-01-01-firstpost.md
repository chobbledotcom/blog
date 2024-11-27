---
title: First Post!
description: My plan for the near future
date: 2024-11-27
tags: business
---

I haven't had a blog in about 20 years. Exciting!

I ([Stefan](https://stefn.co.uk)) am a web developer with 17+ years experience. I've worked at [Bandcamp](https://bandcamp.com) for the last 5.5 of those but am now starting my own business. It's called [Chobble](https://chobble.com) - a nonsense word.

The business will make and sell web software - static sites and Ruby on Rails projects, mostly. I am a big fan of the free and open source world, and so I want everything I make to be freedom-respecting, and to be totally transparent about the business, my costs, and the code I write.

This is a very different approach from most web agencies who instead want to lock you in to using their platform and want you to rely on them for everything, so you need to start from scatch if you move.

I think that sucks, and want to give my customers full control of the things I make for them. I also want my code to be useful for people who aren't my customers. I want a visitor to my site to be able to be able to learn the full workings of how to create and host their own website, and they can choose to pay me to help them or not.

I've got a good bit of work to do yet - make a proper website, think of services and pricing, get my server settings ironed out, etc etc.

But I've made a good start -

- Created a NixOS VPS with [Gandi](https://gandi.net)
- Installed the Git forge '[Forgejo](https://forgejo.org/)' onto it at [git.chobble.com](https://git.chobble.com/)
- Wrote a Nix flake, [`nixos-site-builder`](https://git.chobble.com/chobble/nixos-site-builder) to clone and host static sites
- Wrote `default.nix` build scripts for three sites:
  - [Vegan Prestwich](https://git.chobble.com/chobble/vegan-prestwich) which uses Eleventy
  - [This blog](https://git.chobble.com/chobble/blog) which also uses Eleventy
  - [Chobble.com landing page](https://git.chobble.com/chobble/chobble) which uses Jekyll
- Used the `nixos-site-builder` to host all three sites on the VPS

I've also started working on a fairly big Ruby on Rails project on my local machine, which I'll share details of once it's ready for a public alpha launch.

Some of the near-term upcoming jobs on my list are:

- Documenting the NixOS VPS setup process
- Finishing the Chobble website with services, pricing, case studies
- Write a NixOS flake to host the Ruby on Rails site

And then in the longer term, some vaguer goals:

- Social media presence
- Automated backups
- Static site builds on Neocities / Nekoweb / Github Pages
- CDN from Bunny
- Discussion forum

Alright - for a first blog post I don't think is too terrible. Ciao!
