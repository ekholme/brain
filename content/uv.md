---
title: uv
draft: false
date: 2025-07-01
tags:
  - python
---
[uv](https://docs.astral.sh/uv/) is a python package and project manager, written in Rust. It's really fast and, from my limited usage, feels really good.

## Project Workflow

To create a new project:

1. Create the directory for the project, navigate there, and initialize the project with `uv init`, e.g.:

```bash
mkdir my-project
cd my-project
uv init
```

2. `uv` will automatically create a `venv` and a `uv.lock` file when we run a `uv` command now, so run something like `uv run main.py` to create the venv. 
3. Activate the virtual environment (in Windows, this is via something like `.venv\Scripts\Activate.ps1`)

Then, install packages as appropriate, via:
`uv add package-name`, e.g. `uv add polars`

We can install local packages with something like:
`uv pip install path/to/my/package`

## Versions

`uv` also provides [tooling for versioning](https://docs.astral.sh/uv/guides/package/#updating-your-version)

You can check the version of your project with `uv version`

And you can bump versions with:

```bash
uv version --bump minor
```

where we can use `major`, `minor`, `patch`, etc. to update the version


