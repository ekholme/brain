---
title: Install Software in Linux
draft: false
date: 2025-02-25
tags:
  - linux
  - shell
---
This is a generic guide for how to download and install something in Linux.
## Using apt

The easiest way to install something is to use the `apt` package manager. The general workflow here is to do the following:

```zsh
sudo apt update && sudo apt upgrade
sudo apt install package_name
```

The problem with this approach is that `apt` goesn’t always have the latest version of a piece of software.

## Install manually

To install something manually through the shell, we use a combination of `wget`, `tar` and `mv`. These do the following:

- `wget` downloads files;
- `tar` provides utilities to work with tarballs
- `mv` moves (and also renames) files

So imagine we want to install Go 1.24 (the current version at the time of writing). We could do the following:

```zsh
VERSION=1.24.0
OS=linux
ARCH=amd64

cd $HOME
wget https://storage.googleapis.com/golang/go$VERSION.$OS-$ARCH.tar.gz
tar -xvf go$VERSION.$OS-$ARCH.tar.gz
sudo mv go /usr/local
```

This does the following:

- The first few lines set variables that we’ll use later.
- Change our current directory (`cd`) to whatever our home directory is
- Downloads the tarball with Go 1.24 from the internet.
- extracts (`x`) in verbose mode (`v`) the specified file (`f go$VERSION.$OS-$ARCH.tar.gz`)
- moves (`mv`) the extracted file to the `/usr/local` directory

We probably then want to ensure that this is in our path, which we can do by fiddling with our `~/.bashrc` or `~/.zshrc` file (or whatever file is relevant for the shell you use). We want to look for (or add) something like this:

```zsh
#some other stuff in your ~/.zshrc file
export GOROOT=/usr/local/go 
export PATH=$PATH:$GOROOT/bin
```

et voila, you now have go installed. And this logic applies to any other software, too.
