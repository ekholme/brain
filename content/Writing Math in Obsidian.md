---
title: Writing Math in Obsidian
draft: false
date: 2024-11-19
tags:
  - obsidian/math
  - latex/math
---
I am currently using the [Obsidian Latex Suite](https://github.com/artisticat1/obsidian-latex-suite) community plugin to write math equations. It offers a bunch of convenient [snippets](https://github.com/artisticat1/obsidian-latex-suite/blob/main/src/default_snippets.js) to make writing out equations and math notation faster.

To enter math mode, you just type "dm" into the Obsidian editor, and then you'll enter into a math text chunk, e.g. "\$$ \$$".

One of the cool things about this plugin is that it intuits what you want to write and replaces various values with the appropriate LaTex. So like if I write "beta" in a math block, it will replace it with
$$
\beta
$$

And if I write "x/y" in a math block, it will replace it with:
$$
\frac{x}{y}
$$

 And it'll do what you expect with something like "yhat" as well:
$$
\hat{y}
$$
It's a pretty sweet tool!

## Useful Links
- [Video Demo](https://www.youtube.com/watch?v=AaCVP7zqOMU)