---
title: Python Package Development
draft: false
date: 2024-11-15
tags:
  - python
  - packages
  - dev
---
 
This provides a bare-bones example of the workflow for creating and developing a python package. It is basically the workflow described in [Beuzen & Timbers' Python Packages book](https://py-pkgs.org/03-how-to-package-a-python#) but with some tweaks/some of my notes.

And here's an [example repo](https://github.com/ekholme/demo_py_pkg)

# Step 0: Install Tools

We need the [poetry](https://python-poetry.org/) and [cookiecutter](https://github.com/cookiecutter/cookiecutter) tools to help manage dependencies and set up package templates. We can install these with [pipx](https://pipx.pypa.io/)

```bash
$ pipx install poetry
$ pipx install cookiecutter
```

# Step 1: Create pkg structure with cookiecutter

```bash
#use the python packages book cookiecutter template
$ cookiecutter https://github.com/py-pkgs/py-pkgs-cookiecutter.git
```

Also in this step we probably want to add version control and make a virtual env

```bash
$ git init
#etc -- do a first commit, add a remote, etc.
```

To make a virtual env, I like to use VS Code to do this (via the command palette > Python: Create Virtual Environment)

then activate the venv by:

```bash
$ .venv/Scripts/activate
```

# Step 2: Write python code and add dependencies

Now we can write whatever python code we want (within `/src`). Whenever we need to add a dependency, we can add it via the shell:

```bash
$ poetry add <dependency_name>
```

We'll want to make sure we're doing this in our virtual environment.

# Step 3: Install our pkg and try it out

We can install our in-development package with

```bash
$ poetry install
```

One useful note is that we can change code in the package and we don't need to reinstall it -- it'll just work with the new code

# Step 4: Test code

First, we write tests for our code inside `/tests`. Test files should be prefixed with `test_`.

We want to add `pytest` (for testing) and `pytest-cov` (for test coverage) as dependencies. But our main package doesn't actually depend on these things -- only the testing does. Since they're a development dependency, we can specify this in poetry via:

```bash
$ poetry add --group dev pytest pytest-cov
```

and then to run our tests, we can do (in the shell):

```bash
$ pytest tests/ --cov=<pkg_name>
```

Where the `--cov` flag says we also want to see the test coverage.

# Step 5: Write and render documentation

Some of the boilerplate documentation will be pre-generated via the cookiecutter package we used. We'll definitely want to update the README, though, and possibly some other files.

We'll definitely want to include some docstrings within our functions -- probably using the [numpy docstring standard](https://numpydoc.readthedocs.io/en/latest/format.html#docstring-standard) (AI code assistants seem to be really good at writing these, but I've stopped using them because they make coding less fun).

We also might want to include a vignette showing a worked example of a common workflow in the package. We can create these as Jupyter notebooks within the `docs/` directory.

Finally, we'll want to render the documentation. Given our cookiecutter template, we can do this via the shell:

```bash
#add tools to render documentation
$ poetry add --group dev myst-nb sphinx-autoapi sphinx-rtd-theme
$ cd docs
$ make html
$ cd ..
```

The `make html` command in the above is doing al of the heavy lifting.

Then we can optionally host the documentation on Github Pages or [Read the Docs](https://about.readthedocs.com/?ref=readthedocs.org)

# Step 6: Tag, build, and publish

These probably should be multiple steps, but whatever.

When we make changes, we probably want to tag these as part of a release, via:

```bash
$ git tag
```

The Python Packages book has more info on tagging versions [here](https://py-pkgs.org/03-how-to-package-a-python#tagging-a-package-release-with-version-control)

We can build distributions of our package via:

```bash
poetry build
```

And if we want to publish our package to TestPyPI as a "dry run" before publishing to PyPI:

```bash
$ poetry config repositories.test-pypi \
  https://test.pypi.org/legacy/
$ poetry publish -r test-pypi
$ pip install --index-url https://test.pypi.org/simple/ \
  --extra-index-url https://pypi.org/simple \
  <pkg_name>
```

And then if that works, we can publish to PyPI 

```bash
$ poetry publish
$ pip install <pkg_name>
```