---
title: Chobble Tickets
description: A low cost and open source ticket-selling platform
date: 2025-02-27
tags:
  - web dev
  - tickets
draft: false
---

[Chobble Tickets](https://chobble.com/tickets) is an open source ticket selling platform I made (and can host for you).

The ticket-selling world is one of rentier capitalism. The sales platforms add their own fees onto every sale, on top of the unavoidable payment processing fees. At a minimum, this works out to about 70p of inescapable costs on every sale.

This seems like total bullshit to me! The actual computational and storage costs resulting from that sale probably never amount to more than 5p. It doesn't really make much odds to the sales platform whether you make 1 sale or 1,000 - you only ever cost them any measurable amount of money when you take up a human's paid time.

Chobble Tickets has been designed to be hosted on "edge" scripts - Bunny CDN's, specifically. These are compiled single-file JavaScript sites which are only active when processing a request, and which scale up and down (to zero hosts!) over Bunny's CDN, and which can connect to databases which also scale up and down automatically.

All of that means that it's a great fit for building an app which:

- Doesn't cost anything when it's not in use
- Can deal with huge surges in traffic
- Responds quickly to everyone on the planet

Pretty cool stuff! And a great fit for ticket sales which come in bursts.

I'm selling hosting for **£50/year** with no cut of your ticket sales, which should be more than enough to cover the actual costs to me but still much cheaper than any other option out there.

Support (beyond bug fixes) and customisation will be paid, and I hope I'll earn my income by tweaking it or its email templates for bigger clients.

The system already has a bunch of neat features like QR code check-ins, a public-facing site, email receipts, webhooks, iframe embeds, event groups,recurring events, holidays, custom branding.. And more I've forgotten.

Here are all the relevant links:

- [Github](https://github.com/chobbledotcom/tickets/)
- [Details on my site](https://chobble.com/tickets)
- [Sign up for hosting with me](https://tix.chobble.com/ticket/register)
