---
title: R Package Maintenance
draft: false
date: 2025-01-15
tags:
  - programming/r
  - meta/stub
---
*This note is currently a stub*

## Bumping Package Versions

To (somewhat) automate managing package versions, [usethis](https://usethis.r-lib.org/) provides a [use_version](https://usethis.r-lib.org/reference/use_version.html?q=use%20version#null) function that will appropriately update the `DESCRIPTION` file in an [[R]] package. The basic syntax is:

```r
devtools::use_version("minor")
#could be "major", "minor", or "patch"
```