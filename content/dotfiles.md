---
title: dotfiles
draft: false
date: 2026-09-15
tags:
  - programming
  - linux
---
Dotfiles are files used to customize and configure aspects of a [[Linux]] machine (macOS apparently, too, but I don't use Macs). Typically, a given piece of software will have its own "dotfile" that defines custom configuration parameters for that piece of software. For instance, `neovim` has its own config files, `claude` has its own config files, etc.

In a standard Linux setup, these will mostly live in `~/.config`, although some -- such as `.bashrc` or `.zshrc` -- live in the home directory.

Often, users will customize their own dotfiles, store them in a [[Git]] repo, and symlink them back into the `.config` directory. This allows users to keep all of their configs in a centralized repo with version management, which makes the configurations portable. Tools like `stow` help manage symlinks and automate their generation