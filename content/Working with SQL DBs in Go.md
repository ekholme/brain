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

- [DB.QueryContext()](https://pkg.go.dev/database/sql#DB.QueryContext) for `SELECT` queries that return multiple rows;
- [DB.QueryRowContext()](https://pkg.go.dev/database/sql/#DB.QueryRowContext) for `SELECT` queries that return a single row;
- [DB.ExecContext()](https://pkg.go.dev/database/sql/#DB.ExecContext) for queries that don't return any rows (e.g. `INSERT`)

The idiomatic way to execute these queries is with the "context-aware" variants listed above, but there are also variants that don't accept a context, e.g. `DB.Query()`

## DB.ExecContext()

The function signature is:

```go
func (db *DB) ExecContext(ctx context.Context, query string, args ...any) (Result, error)
```

where `args` are placeholder arguments passed to the query.

## DB.QueryContext()

The function signature is

```go
func (db *DB) QueryContext(ctx context.Context, query string, args ...any) (*Rows, error)
```
where `args` are placeholder arguments passed to the query.

## DB.QueryRowContext()

The function signature is

```go
func (db *DB) QueryRowContext(ctx context.Context, query string, args ...any) *Row
```
where `args` are placeholder arguments passed to the query.

For some reason I'm not quite sure of, the `*Row` struct has an error field in it, so this method *can* return an error -- it's just in the row struct?

