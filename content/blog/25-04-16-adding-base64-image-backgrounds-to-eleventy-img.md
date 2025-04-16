---
title: Adding base64 placeholder background images to eleventy-img
description: Add a low-quality webp placeholder image to the HTML of your site
date: 2025-04-16
tags:
  - eleventy
  - webdev
---

> **Just want to skip straight to the source code? [Click here](https://git.chobble.com/chobble/chobble-template/src/commit/32c60a0066ec620630109a2db56c3e0d8b7306fc/src/_lib/image.js)**

> **See this in action at [example.chobble.com](https://example.chobble.com)**

The [Chobble Template](/blog/25-03-28-chobble-template/) is an Eleventy static website template which uses the official [eleventy-img](https://github.com/11ty/eleventy-img) plugin to generate `srcset` attributes for `img` image tags, with `webp` and `jpeg` formats, at various sizes.

The official plugin can either catch `<img>` tags in the source code, or I can use an `image` shortcode in my Liquid files - this means it works for images I use as part of the template, as well as images that my clients embed in pages (as Markdown).

This is _awesome_. Generating nice thumbnails and image tags is always a painful bit of web development, and the plugin lets me outsource a lot of that thinking.

But the default setup is missing a feature I think is pretty neat - **adding a background-image CSS style of a base64-encoded low quality image placeholder (LQIP) and setting the aspect-ratio of the image**.

![A screenshot of the Chobble Example template before any images have loaded - in their place are low quality, blocky placeholders](/blog/img/low-quality-image-placeholders.png)

Having `background-image` with a LQIP and `aspect-ratio` filled into the page's HTML brings some nice advantages:

- Removes "Layout Shift" as the page loads because the boxes where images go are already the right size.
- Pages load with a low quality image which is replaced by the high-quality one as soon as it's available, which makes them feel fast.

This is especially beneficial when using [Turbo](https://turbo.hotwired.dev/) which lets static websites feel like single-page apps by preloading links when you hover over them. Since the LQIP is part of the page's HTML, it's instantly there.

Anyway, the source code for this is [here](https://git.chobble.com/chobble/chobble-template/src/branch/main/src/_lib/image.js), and below are some notes about how it works / things I ran into while building it.

### It wraps the image in a div and adds the styles to that

I originally wanted to apply the background image to the `img` tag itself, which works - as in, it applies the style, but it doesn't sort things properly and introduces some quirks:

- Before the image tag starts loading, nothing is visible
- It messes with semi-transparent borders because the background image shows through them

So I resorted to applying the style to a `<div>`, which brings its own quirks:

- Sometimes those images are inside `<p>` tags, which is fine - but a `<div>` block-level element inside a `<p>` isn't - so I wrote some code to bust those divs out.
- Each place I styled `img` needed to be updated to work with `.image-wrapper`

### It doesn't customise the webp encoding at all

I originally had a hacky solution working which created the thumbnails by calling `cwebp`, the command line webp encoder, and then creating a JSON file to use as Eleventy data. This ran inside of a batch script at compile time. It worked, and let me customise the webp encoding as much as I liked, but it was brittle - it added more dependencies to the project, meant I had to run a bash script before build, didn't work during development, etc.

The current approach just goes with whatever the `@11ty/eleventy-img` plugin does - which, really, is fine for 32 pixel wide placeholders.

### The quality of the placeholders could be higher

Static websites are generally pretty lightweight, and the Chobble Template is no exception to that. This gives a fair bit of bandwidth headroom for doing things to improve the user experience - like having your LQIPs be a couple of kilobytes larger. I opted for 32 pixels wide, but 64 would still be quite small in the source code and might look a fair bit better.

### It contains a HTML-transformer and an Image shortcode

You can install my code by coping it to your project and including it in your `.eleventy.js` like such:

```js
module.exports = async function (eleventyConfig) {
  const { transformImages, imageShortcode } =
    require("./src/_lib/image");

  eleventyConfig.addAsyncShortcode("image", imageShortcode);

  eleventyConfig.addTransform(
    "processImages",
    async (content, path) => {
        if (!path || !path.endsWith(".html")) return content;
        return await transformImages(content);
    });
})
```

The shortcode and the image transformer ultimately call the same code - `processAndWrapImage` - a method which calls the official Eleventy image plugin to create the various encodings for the image, including the LQIP, and then wraps those in a div with the class `image-wrapper`.

### The script assumes that all of your images live in /src/images

You'll need to update it if yours live elsewhere. But you'll probably need to update the script anyway - it makes a fair few assumptions about widths, formats, etc which won't apply to your site.
