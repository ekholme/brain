---
title: Lazyvim
draft: false
date: 2025-12-15
tags:
  - vim
---
 
[Lazyvim](https://www.lazyvim.org/) is a Neovim setup that provides a lot of default functionality to help make Neovim into more of a fully-fledged IDE.

## Keybindings

This is a non-exhaustive set of keybindings.

*Note that the default keybinding for `<leader>` is Space*

### Navigating Files

To jump between open files (*buffers*) and the file explorer, we can use either:

- `Ctrl+w+h` to move left to the file explorer, or
- `<leader>e`, which will toggle and jump to the file explorer

We can also use `Space-Space` to open the Telescope file picker, where we can use fuzzyfind to look for a file by name.

To shift between open files, we can use `Shift-h` or `Shift-l`. Or we can use `Space-Space` to 

### Line Diagnostics

To view warnings (or errors) associated with a given line, we can use `<leader>cd`, which will open the message in a floating window. If we press `<leader>cd` again, it will move the cursor to that floating window so we can scroll or copy the message.

We can also move between diagnostics (errors or warnings) by using `]d` to jump to the next diagnostic or `[d` to jump to the previous diagnostic. We can use `]w` or `[w` if we only want to jump between errors 