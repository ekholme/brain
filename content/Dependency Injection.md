---
title: Dependency Injection
draft: false
date: 2026-06-17
tags:
  - programming/go
  - programming/r
---
Dependency injection refers to passing a piece of code all of the "things" it needs to perform a given task rather than asking that code to create all of those things itself.

More concretely, imagine an [[R]] function that needs to query a database. Instead of having the function create a connection to a database, e.g.:

```r
query_func <- function(query) {
  con <- connect_to_db()
  
  x <- DBI::dbGetQuery(con, query)
  
  x
}
```

We would prefer passing a connection into the function:

```r
query_func <- function(con, query) {
  x <- DBI::dbGetQuery(con, query)
  
  x
}
```

*This note is a stub -- resume here*