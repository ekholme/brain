---
title: sudo
draft: false
date: 2026-05-20
tags:
  - linux
  - programming/cli
---
`sudo` is shorthand for **SuperUser DO** and it allows users on [[Linux]] systems to execute a command as if they were the superuser (i.e. as root). We prefix other commands with `sudo` to give them permission to run with elevated privileges, e.g.: `sudo pacman -S neovim` will install [[Neovim]] on an [[Arch Linux]] system.

When we run a command with `sudo`, we're then prompted to enter our password before the command executes. This is a security feature, since it prevents malware from running commands as root. 