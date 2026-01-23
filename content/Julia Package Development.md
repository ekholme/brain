---
title: Julia Package Creation
draft: false
date: 2025-07-31
tags:
  - programming/julia
---
## Creating a Package

Creating a package in [[Julia]] is pretty straightforward, thanks to [PkgTemplates.jl](https://juliaci.github.io/PkgTemplates.jl/stable/). It's probably easiest to create the package interactively. To do this, just open a Julia REPL, then run:
```julia
using PkgTemplates
Template(interactive=true)("MyPkg")
```

And then follow the prompts to set up the package.