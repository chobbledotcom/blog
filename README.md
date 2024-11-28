# blog.chobble.com

Based on the [Eleventy Base Blog](https://github.com/11ty/eleventy-base-blog)

To build locally, install Nix and then run:

- `nix-build` to run [default.nix](https://git.chobble.com/chobble/blog/src/branch/master/default.nix) and output the site to your Nix store

- `nix-shell` to run [shell.nix](https://git.chobble.com/chobble/blog/src/branch/master/shell.nix) and get a shell where you can run `serve` to host the site on localhost, or `yarn` commands to mix up the packages. Remember to copy the contents of the modified `package.json` to `node-deps.nix` after you run `yarn` commands!
