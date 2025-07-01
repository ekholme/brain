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

1. Create a `pyproject.toml` file in the project root. Add something like the following to it:

```toml
[project]
name = "my-project"
version = "0.1.0"
requires-python = ">=3.11"
```

2. Create a virtual environment via: `uv venv`
3. Activate the virtual environment (in Windows, this is via something like `.venv\Scripts\Activate.ps1`)

Then, install packages as appropriate, via:
`uv add package-name`, e.g. `uv add polars`

