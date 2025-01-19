---
title: Adding social preview images to my Eleventy blog
description: Thanks to Matthew Paul for the guide
date: 2025-01-19
tags: webdev
---

I just followed [this excellent guide by Matthew Paul](https://www.mathew-paul.nz/posts/eleventy-html-validation/) to add social media preview images to this blog - and it worked great!

[Here is the commit which did it](https://git.chobble.com/chobble/blog/commit/c09b3d099d10ea866f0a86335d2b4d70994accc4) - I tweaked Mat's guide a bit because my blog is set up with ESM rather than CommonJS - hopefully if you're also using an ESM setup then you can find some inspiration here.

My blog is based on this template: [https://github.com/11ty/eleventy-base-blog](https://github.com/11ty/eleventy-base-blog)

Here's the final image for this post:

<img eleventy:ignore
alt="'Social media preview images' blog post preview image"
src="/social-preview-images/25-01-19-social-preview-images.jpeg">

Very satisfying!
