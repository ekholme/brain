---
title: Passing Dots (R)
draft: false
date: 2026-04-30
tags:
  - programming/r
---
In [[R]], variadic functions accept an ellipsis (`...`) as a way to collect arguments that aren't matched by the parameters of the top-level function. Typically, these then get "passed" to nested functions. For example:

```R
my_mean <- function(x, ...) {
	mean(x, ...)
}
```

Which we could then execute as:

```R
x <- 1:10
my_mean(x, trim = .2)
```

## Unquote Splice

This pattern can get tricky if we're trying to pass dots down multiple levels of nesting. One common case where we want to do this is when we use something like `purrr::map()` to iterate over a function, `f()`, and we want to pass dots to `f()`, e.g.:
```R
# note that the following code won't work
x <- 1:10
y <- c(1:19, NA_real_)
z <- list(x, y)

iter_mean <- function(l, ...) {
	purrr::map(l, ~mean(.x, ...))
}

iter_mean(z, trim = .2)
```

The issue here is that using `...` inside an anonymous function defined with `~` doesn't work (I'm not exactly sure why -- I suspect it has something to do with calling environments). But we can work around this by putting the dots in a list, then constructing and executing a function call using some `rlang` utilities such as `exec()` and `!!!` (the "unquote-splice" operator), e.g.:

```R
# this does work
library(rlang)
x <- 1:10
y <- c(1:19, NA_real_)
z <- list(x, y)

iter_mean <- function(l, ...) {
	dots <- list(...)
	
	purrr::map(
		l,
		~ rlang::exec(mean, .x, !!!dots)	
	)
}
```

## See Also
- [[Variadic Functions in Go]]