---
title: Vim Keybindings
draft: false
date: 2025-10-14
tags:
  - vim
---
This is  a non-comprehensive list of Vim keybindings.

## Open a File (from normal mode)

`:e file_name`, e.g. `:e funcs.py`

## Close a File (from normal mode)

`:q`


## Save a file

To save a file, use `:w` in normal mode.

To save and quit, use `:wq`

To save and quit all, use `:wqa`

To save the current file as "my_new_file.txt": `:w my_new_file.txt`

## Search and Jump Between Matches

Start a search while in Normal Mode by using `/pattern`, then pressing `Enter`.

Jump between matches with `n` (next) or `N` (previous)

## Jump to a Line Number

Type `:LINE_NUMBER` and hit enter, e.g. `:70` to go to line 70
## Find and Replace

To find a replace all instances of a pattern in a file:

`:%s/pattern/replacement/g`

## Indent

To indent multiple lines at once, highlight all of the desired lines, then use `>`

## Moving Between Panes

To move between panes, we can use `Ctrl + w + h` to move left or `Ctrl + w + l` to move right
