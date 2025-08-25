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

## Transactions

Transactions ensure that any writes to the database are atomic -- meaning either the whole thing succeeds or the whole thing fails. This prevents a part of the write from succeeding and another part failing, which can mess up data quality. If an interaction with the database needs to write to 2 different tables, and only 1 of those writes succeeds, then we can end up with data quality issues. In this scenario, if we wrap our database interactions in a transaction, the first write would be "rolled back" if the second one failed.

In [[Go]], database transactions take a context and a pointer to transaction options, e.g.

```go
//i've only ever passed nil to the options
tx, err := db.BeginTx(ctx, nil)
```

And we can "use" it by deferring the rollback. So a function that would write to a database using a transaction would look something like this:

```go
func writeDB(db *sql.DB, ctx context.Context, s *MyStruct) error {
	tx, err := db.BeginTx(ctx, nil)
	
	if err != nil {
		return err	
	}
	
	
	
	defer tx.Rollback() //won't actually do anything if the entire write succeeds
	
	//logic to write to db goes here
	
	// 2. Commit the transaction if everything succeeded 
	if err := tx.Commit(); err != nil { 
		return err 
	} 
	// If tx.Commit() succeeds, the deferred tx.Rollback() will effectively 
	// do nothing since the transaction is already closed. 
	return nil
}
```