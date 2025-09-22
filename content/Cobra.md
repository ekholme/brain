---
title: Cobra
draft: false
date: 2025-09-22
tags:
  - go
  - cli
---
[Cobra](https://github.com/spf13/cobra) is a tool for creating CLI tools in [[Go]].

## Framework

Cobra creates CLI tools that are based on **commands**, **args**, and **flags**. The pattern for creating tools using Cobra is generally:
`APPNAME COMMAND ARG --FLAG`

For example, if we're using Hugo, we might see:
```bash
hugo server --port=1313
```

Where 'server' is a command and 'port' is a flag. As another example, we might clone a URL with git via:
```bash
git clone URL --bare
```

In this instance, 'clone' is a command, 'URL' is an arg (we'd supply a real url here), and '--bare' is a flag.

## Usage

Cobra provides the `cobra-cli` program to help bootstrap applications to help develop Cobra applications. To generate the scaffolding for a new app using Cobra, we can run:

```bash
cobra-cli init [app]
```

And we can provide flags to this as well, e.g.

```bash
cobra-cli init [app] --author "Eric Ekholm eric.ekholm@gmail.com" --license mit
```

For more info on how to work with the `cobra-cli` tool, see its [README](https://github.com/spf13/cobra-cli/blob/main/README.md)