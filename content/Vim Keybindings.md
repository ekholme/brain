---
title: Vim Keybindings
draft: false
date: 2025-10-14
tags:
  - vim
---
This is  a non-comprehensive list of Vim keybindings.

## Open a File (from normal mode)

`:edit file_name`, e.g. `:edit funcs.py`

## Close a File (from normal mode)

`:q`

## Search and Jump Between Matches

Start a search while in Normal Mode by using `/pattern`, then pressing `Enter`.

Jump between matches with `n` (next) or `N` (previous)
## Find and Replace

To find a replace all instances of a pattern in a file:

`:%s/pattern/replacement/g`

## Indent

To indent multiple lines at once, highlight all of the desired lines, then use `>`