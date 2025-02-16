---
title: I made an Eleventy & Nix static site template
description: Clone my repository to get an Eleventy site built on NixOS quick sharp
date: 2025-02-16
tags:
  - webdev
  - nixos
---

I've had to create a new Eleventy site on NixOS a bunch of times lately, so I figured I make a template to save myself repeating the same steps over and over.

Hopefully this will come in helpful for anyone else who's attempting to build Eleventy (or any other npm-based site generator) on NixOS.

The source code for the template I made is here: [git.chobble.com/chobble/empty-eleventy-nix-site](https://git.chobble.com/chobble/empty-eleventy-nix-site)

To get started just run `git clone https://git.chobble.com/chobble/empty-eleventy-nix-site`, then `cd` to the directory, run `direnv allow` or `nix develop`, and then `serve` to get a server running locally.

You can also run `nix-build` to reproducibly build the site using Nix - I call this from my [NixOS site builder](/blog/24-12-02-site-builder-updates/) which powers the Chobble server.

To quote its `README.md`:

---

This template should let you get started with the Eleventy static site builder on NixOS / Nix, really easily.

Featuring Nix'y features like:

- [direnv](https://direnv.net/) support via `flake.nix` - run `direnv allow`
- or run `nix develop` if you don't have direnv
- `nix-build` support using `flake-compat`
- `serve` shell script to run Eleventy and SASS locally
- `build` shell script to build the site into `_site`

And Eleventy features like:

- Canonical URLs
- A directory to store favicon cruft
- A `_data/site.json` metadata store
- An `collection.images` collection of the files in `src/images`

## Changing Packages

If you want to change the packages in `packages.json`, here's the steps:

- Remove all `nodeModules` lines from `node-deps.nix` and `flake.nix`
- Use `direnv reload` or `nix develop` to get a dev shell
- Add the new packages to `node-deps.nix` and run `direnv reload` to re-build `packages.json`
- Run `yarn -l` to create a new `yard.lock`
- Re-add the `nodeModule` lines to `node-deps.nix` and `flake.nix`

## Upgrading Packages

This is a little fiddlier:

- Remove all `nodeModules` lines from `node-deps.nix` and `flake.nix`
- Copy the generated `package.json` to your clipboard
- Delete `package.json` to remove the symbolic link
- Paste your clipbard back into a new `package.json`
- Run `yarn upgrade` to create a new `yarn.lock` and update `package.json`
- Copy those new version numbers from `package.json` to `node-deps.nix`
- Re-add the `nodeModule` lines to `node-deps.nix` and `flake.nix`

..I do intend to make those steps simpler some day. If you've got ideas of how I could, please contact me!
