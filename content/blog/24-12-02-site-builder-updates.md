---
title: Nix Site Builder Updates
description: More useful, more stable
date: 2024-12-02
tags:
  - nixos
  - business
---

An update on my efforts to get everything in place to run a libre / ethical / transparent web development agency. I took it easy for a couple of weeks but I'm trying to ramp up the pace now.

I've spent a lot of time working on [nixos-site-builder](https://git.chobble.com/chobble/nixos-site-builder/) over the last few days. I'll use this alongside [chobble-server](https://git.chobble.com/chobble/chobble-server) for each Chobble-hosted site, where they will perform their duties:

- Hosting the Git repositories
- Building sites via `nix build` (or just `cp`)
- Serving over HTTPS via Caddy
- Pushing to Neocities and other hosts
- Uploading to SFTP servers
- Push-mirroring Git repos elsewhere as a backup
- Alerting on failures

As I've migrated sites over to this server ([these ones](https://git.chobble.com/hosted-by-chobble)) I've improved the site builder script to add features like:

- A `site` command ([file](https://git.chobble.com/chobble/nixos-site-builder/src/branch/main/lib/mkSiteCommands.nix)) with:
  - `site list` to list sites by domain alongside their `systemd` service names
  - `site status example.com` for `systemctl status <that service>`
  - `site restart example.com` for `systemctl restart <that service>`
- Only replacing the site if the `nix-build` command works ([commit](https://git.chobble.com/chobble/nixos-site-builder/commit/b6f7734d556ed14f1c55c6cc4df08ab1d14cd445))
- Building and pushing to Neocities via a `host` and `apiKey` option
- More tests

Using NixOS for the setup / builds will (eventually) mean everything is documented in a useful way for other would-be hosters whether they use NixOS or not. I might also add build scripts for other setups - and test them in VMs in NixOS. It will also help me learn Nix - cool!

I also started using [Bunny CDN](https://bunny.net/) on the [Vegan Prestwich](https://www.veganprestwich.co.uk) site. It's totally unneccessary there, but I'm doing it to get familiar with Bunny who seem like a great choice for a CDN host, which I'll need at some point. Turns out it was dead easy! You just set Bunny to mirror from an origin host (I chose the `www`-less version but will change this eventually) and then you set a `CNAME` DNS record to the `*.b-cdn.net` Bunny domain you'll see when you create a "[Pull Zone](https://dash.bunny.net/cdn)".

You can't set `CNAME` records for your root domains which means if you want Bunny to cache the full site including HTML in the [most optimal](https://bunny.net/blog/how-aname-dns-records-affect-cdn-routing/) way you need to ideally host the site at `www`, and then you need to figure out the `www-less` to `www` redirect yourself somehow. I've set `<link rel="canonical">` tags for now, but really should do a 301 redirect to the `www` instead. Soon!

Next up I'm thinking of installing [Goatcounter](https://www.goatcounter.com), which [I can set up to parse my Caddy logs](https://www.apalrd.net/posts/2023/studio_website/#goatcounter-service) to give me privacy-protecting lightweight analytics, which I'll need eventually so may as well figure out. Parsing the logs will give way less fidelity than running the Goatcounter Javascript, which itself will give way less than running some big corpo spyware like Google Analytics, but that suits me great.

I'm also taking tentative steps towards running my Ruby on Rails app on NixOS as a systemd service, and thinking about emails, versioning, and database backups - and how long I can go without dealing with them.

On the business side I've done a lot of thinking about how pricing should work. My goal is to be radically transparent - which means that I won't do any of the common tricks of the trade:

- Adding my own margin to off the shelf templates, outsourced labour, etc.
- Being opague about the actual cost of hosting and support.
- Charging for small changes to the site that the client could do.

But I still need to earn a wage, so I need to figure out an hourly rate that lets me do that, and think of a way to provide attentive support and guidance that doesn't leave me working for free.

I'm currently thinking of charging about £200 per hour, and £100 for charities. Those feel like high numbers but I think that's probably what's neccessary to cover my costs for now.

And Support-wise I'm thinking something like, you can either:

- Get two hours of free support each month for some low cost, like £20
- Don't pay for support, sort the hosting out yourself and only pay me ad-hoc when needed

Both options would be totally fine by me, but if I could get 100 customers paying £20 a month for support that'd be an awesome baseline income.

Anyway, that's enough for today. Over and out!
