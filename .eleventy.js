import {
  HtmlBasePlugin,
  IdAttributePlugin,
  InputPathToUrlTransformPlugin,
} from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import Image from "@11ty/eleventy-img";
import pluginNavigation from "@11ty/eleventy-navigation";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import fs from "fs/promises";

import pluginFilters from "./_config/filters.js";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
  // Drafts, see also _data/eleventyDataSchema.js
  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
  });

  // Copy the contents of the `public` folder to the output folder
  // For example, `./public/css/` ends up in `_site/css/`
  eleventyConfig
    .addPassthroughCopy({
      "./public/": "/",
    })
    .addPassthroughCopy("./content/feed/pretty-atom-feed.xsl");

  eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg,njk}");
  eleventyConfig.addWatchTarget("posts");

  // Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
  // Adds the {% css %} paired shortcode
  eleventyConfig.addBundle("css", {
    toFileDirectory: "dist",
  });
  // Adds the {% js %} paired shortcode
  eleventyConfig.addBundle("js", {
    toFileDirectory: "dist",
  });

  // Official plugins
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 },
  });
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed/feed.xml",
    stylesheet: "pretty-atom-feed.xsl",
    templateData: {
      eleventyNavigation: {
        key: "Feed",
        order: 4,
      },
    },
    collection: {
      name: "posts",
      limit: 20,
    },
    metadata: {
      language: "en",
      title: "blog.chobble.com",
      subtitle: "Nix/NixOS, self hosting, and owning your data",
      base: "https://blog.chobble.com/",
    },
  });

  // Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // File extensions to process in _site folder
    extensions: "html",

    // Output formats for each image.
    formats: ["avif", "webp", "auto"],

    // widths: ["auto"],

    defaultAttributes: {
      // e.g. <img loading decoding> assigned on the HTML tag will override these values.
      loading: "lazy",
      decoding: "async",
    },
  });

  // Filters
  eleventyConfig.addPlugin(pluginFilters);

  eleventyConfig.addPlugin(IdAttributePlugin, {
    // by default we use Eleventy’s built-in `slugify` filter:
    // slugify: eleventyConfig.getFilter("slugify"),
    // selector: "h1,h2,h3,h4,h5,h6", // default
  });

  eleventyConfig.addShortcode("currentBuildDate", () => {
    return new Date().toISOString();
  });

  // Features to make your build faster (when you need them)

  // If your passthrough copy gets heavy and cumbersome, add this line
  // to emulate the file copy on the dev server. Learn more:
  // https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

  // eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  eleventyConfig.addFilter("splitlines", (input) => {
    const parts = input.split(" ");
    const lines = parts.reduce((prev, current) => {
      if (!prev.length) {
        return [current];
      }
      const lastOne = prev[prev.length - 1];
      if (lastOne.length + current.length > 19) {
        return [...prev, current];
      }
      prev[prev.length - 1] = lastOne + " " + current;
      return prev;
    }, []);
    return lines;
  });

  eleventyConfig.on(
    "eleventy.after",
    async ({ directories, results, runMode, outputMode }) => {
      const outDir = directories.output;
      const socialPreviewImagesDir = `${outDir}social-preview-images/`;
      const files = await fs.readdir(socialPreviewImagesDir);
      console.log(files);
      if (files.length == 0) return;
      files.forEach(async (filename) => {
        if (!filename.endsWith(".svg")) return;
        const imageUrl = socialPreviewImagesDir + filename;
        await Image(imageUrl, {
          formats: ["jpeg"],
          outputDir: "./" + socialPreviewImagesDir,
          filenameFormat: (id, src, width, format, options) => {
            const outputFilename = filename.substring(0, filename.length - 4);
            return `${outputFilename}.${format}`;
          },
        });
      });
    },
  );
}

export const config = {
  // Control which files Eleventy will process
  // e.g.: *.md, *.njk, *.html, *.liquid
  templateFormats: ["md", "njk", "html", "liquid", "11ty.js"],

  // Pre-process *.md files with: (default: `liquid`)
  markdownTemplateEngine: "njk",

  // Pre-process *.html files with: (default: `liquid`)
  htmlTemplateEngine: "njk",

  dir: {
    input: "content",
    includes: "../_includes",
    data: "../_data",
    output: "_site",
  },
};
