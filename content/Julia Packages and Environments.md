---
title: Julia Packages and Environments
draft: false
date: 2024-12-17
tags:
  - programming/julia
---
## Installing Packages: The Typical Approach

Most often, if we want to install a [[Julia]] package, we install it via the REPL

```julia
] #the ] command enters the Pkg REPL
add PackageName
```

This will install `PackageName` from the [Julia Package Registry](https://github.com/JuliaRegistries/General). If we want to install multiple packages, we just write them out with a space between them

```julia
]
add PackageName OtherPackageName
```

## Installing Unregistered Packages

If a package isn't registered, we can just add the URL of the Git repository:

```julia
pkg> add https://github.com/OWNER/REPO.jl
```

## Installing a Local/In-Development Package

If you want to install a local, in-development package, use `dev` instead of `add`

```julia
pkg> dev MyPkg
```

This assumes that `MyPkg` is in the `~/.julia/dev` directory, but we can change this via the environment variable `JULIA_PKG_DEVDIR`

## Creating an Environment

By default, Julia installs packages to your global/default environment, which is denoted by the Julia version name. It's usually better practice to have a dedicated environment for each project (to help better manage dependencies).

To create an environment, use the `activate` command from the Pkg REPL. First, navigate to your project directory

```bash
cd path/to/MyPkg
```

Then `activate` the project from the Julia Pkg REPL:

```julia
]
activate .
```

You'll get a message saying that project has been activated, but you won't see any new files yet. The Pkg REPL prompt will change, though, to look like:

```julia
(MyPkg) pkg>
```

And then when you `add` a package, Julia will create a `Project.toml` and `Manifest.toml` file in the project root.

## Installing a Project's Dependencies

If we use someone else's project (e.g. if we clone a repo from Github), we want to be able to ensure we have all of the dependencies as well. Julia's `instantiate` handles this for us. So once we navigate to a project we've cloned a project:

```bash
git clone https://github.com/OWNER/MyPkg.jl.git
cd MyPkg.jl
```

And activated it locally:

```julia
]
pkg> activate .
```

We can `instantiate` it to install any dependencies:

```julia
(MyPkg) pkg> instantiate
```
