---
title: Updates Chobble Tickets
description: On recent updates to my ticket sales platform
date: 2026-03-30
tags:
  - web dev
  - tickets
draft: false
---

One month-ish ago I announced [Chobble Tickets](https://tickets.chobble.com), an open source ticket selling platform I made to host on Bunny's Edge Scripts at very low cost (or I can host for you).

I've been adding features since, partly based on feedback from the ten or so customers that have signed up so far, and partly based on my ideas for what the platonic ideal of a "fully free and unencumbered" ticket sales platform would look like.

Much of this work has been along the lines of making the system easier for others to host and build on. I made a "builder" interface that can launch new sites, so the system is now self-replicating. I rejigged the encryption so it's more performant, and easier to customise. I've refactored tonnes of endpoints and routing code to distill key paths to a few solid patterns.

And I've made much more of the system customisable and programmable too. Users can now customise their:

- Google/Apple Wallet pass signing info
- Email provider
- Domain name & custom domain name
- Booking questions
- Booking fee

And they can enable a public API or create keys for a private one. I read [this article about malleable software](https://www.inkandswitch.com/essay/malleable-software/) which has inspired me to keep pushing towards making Tickets more tool-like and flexible, and to give as much control to users as I can and to trust them with it.

I also created a (work in progress) site at [tickets.chobble.com](https://tickets.chobble.com) which describes the system and gives it an honest comparison to many of the other options out there. I don't want to try and persuade anyone to use Chobble Tickets if there's a better fit for them out there (either open source or otherwise).

The feedback from my early users has been great - users of varying technical ability have found it easy to do the things they need, and I have already saved some users hundreds of pounds versus paying one of the big platforms like Eventbrite.

If you do ticketed events and you'd like to try a new, open source, simple, very low cost option, check out Chobble Tickets with the links below.

- [Github](https://github.com/chobbledotcom/tickets/)
- [Details on my site](https://tickets.chobble.com)
- [Sign up for hosting with me](https://tix.chobble.com/ticket/register)
