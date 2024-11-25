---
title: Make and Makefiles
draft: false
date: 2024-11-25
tags:
  - make
  - makefile
  - software_dev
---
 
## What is Make
`make` is a tool that helps automate the build of software. It allows you to provide aliases to execute various steps in a build workflow, and it also lets you specify dependencies between steps.

## Makefiles
`Makefiles` contains sets of instructions that define targets, dependencies, and commands executed by `make`.

For example, a Go Makefile might look like this (taken from my [[FlexCreek Running Notes|FlexCreek app]]):

```Makefile
.PHONY: build-app run clean

build-app:
    go build -o bin/flexcreek ./cmd/flexcreek.go 

run: build-app
    @./bin/flexcreek

clean:
    @rm -rf bin
```

In the first line, `.PHONY` declares targets that aren't files.

The lines after that define targets, dependencies, and commands. So, for instance, the `run` line defines `run` as a target/step, `build-app` as a dependency for `run` (i.e. the app needs to be built before it can run), and `@./bin/flexcreek` is the command to run (i.e. run the `flexcreek` executable in `/bin`).