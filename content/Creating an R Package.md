---
title: Creating an R Package
draft: false
date: 2024-12-12
tags:
  - R
  - software_dev
---

*These notes just describe how to create a package -- they won't describe the whole development workflow of writing code, testing, building, etc.*

The [usethis](https://usethis.r-lib.org/) package heavily scaffolds creating and modifying components of an [[R]] package.

## Create the Package

Navigate to the directory we want the package to live in, then run the following R code:

```R
usethis::create_package("pkg_name")
```

This will create a pretty bare-bones package, including `DESCRIPTION` and `NAMESPACE` files.

## Adding Other Components

`{usethis}` contains helper functions to add other components we might want to use in our package. These functions are all prefixed with `use_**`, e.g. `use_make()` will create a [[Make|makefile]], `use_mit_license()` will add an MIT license to the package, etc.

Here's [a reference for these functions](https://usethis.r-lib.org/reference/index.html#package-setup), but here are the ones I find most useful:

- `use_r("file_name")` -- creates an R file
- `use_test("file_name")` -- creates a test file for "file_name"
- `use_readme_rmd()` -- creates a `README.rmd` file. This is my default, but I'll sometimes use `use_readme_md()` if I don't need to execute R code when I generate my readme.
- `use_testthat()` -- sets up testing via [testthat](https://testthat.r-lib.org/)
- `use_mit_license()` -- adds the MIT license to the project
- `use_pkgdown` or `use_pkgdown_github_pages()` -- creates a [pkgdown](https://pkgdown.r-lib.org/) docs site.
- `use_package("pkg_name")` -- depend on another package
- `use_dev_package("pkg_name", remote)` -- depend on a development package

## Other Readings

- [R Packages](https://r-pkgs.org/)
