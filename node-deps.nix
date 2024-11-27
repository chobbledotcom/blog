# node-deps.nix
{ pkgs ? import <nixpkgs> {} }:

let
  packageJSON = pkgs.writeTextFile {
    name = "package.json";
    text = builtins.toJSON {
      name = "veganprestwich-co-uk";
      version = "1.0.0";
      type = "module";
      dependencies = {
        "@11ty/eleventy" = "^3.0.0";
        "@11ty/eleventy-img" = "^5.0.0";
        "@11ty/eleventy-navigation" = "^0.3.5";
        "@11ty/eleventy-plugin-rss" = "^2.0.2";
        "@11ty/eleventy-plugin-syntaxhighlight" = "^5.0.0";
        "@zachleat/heading-anchors" = "^1.0.1";
        "cross-env" = "^7.0.3";
        "fast-glob" = "^3.3.2";
        "luxon" = "^3.5.0";
        "zod" = "^3.23.8";
        "zod-validation-error" = "^3.3.1";
      };
    };
  };

  nodeModules = pkgs.mkYarnModules {
    pname = "veganprestwich-co-uk-deps";
    version = "1.0.0";
    packageJSON = packageJSON;
    yarnLock = ./yarn.lock;
    yarnFlags = ["--frozen-lockfile"];
  };
in
{
  inherit packageJSON nodeModules;
}
