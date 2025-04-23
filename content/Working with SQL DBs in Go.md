---
title: Working with SQL DBs in Go
draft: false
date: 2025-02-27
tags:
  - sql
  - go
  - databases
---
[[Go]]'s [database/sql](https://pkg.go.dev/database/sql) package -- part of the standard library -- provides a [DB](https://pkg.go.dev/database/sql#DB) struct that allows us to interact with SQL (relational) databases.

There are 3 methods available for executing queries:

- [DB.Query()](https://pkg.go.dev/database/sql/#DB.Query) for `SELECT` queries that return multiple rows;
- [DB.QueryRow()](https://pkg.go.dev/database/sql/#DB.QueryRow) for `SELECT` queries that return a single row;
- [DB.Exec()](https://pkg.go.dev/database/sql/#DB.Exec) for queries that don't return any rows (e.g. `INSERT`)

## DB.Exec()

