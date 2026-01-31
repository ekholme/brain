---
title: Writing to a Database with Go and SQLite
draft: false
date: 2025-01-28
tags:
  - programming/go
  - programming/sql
  - database/relational_db
  - database/sqlite
---
Below is a very basic snippet that shows how to write to an [[SQLite]] database using [[Go]].

One note about the code snippet below -- in it, I'm using the [modernc.org/sqlite](https://pkg.go.dev/modernc.org/sqlite) package rather than the (more popular) [mattn/go-sqlite3](https://pkg.go.dev/github.com/mattn/go-sqlite3) package. This is because the former doesn't require CGO or a gcc compiler, which makes it easier to set up. That said, both implementations are compatible with the `database/sql` base package, so switching should just be a drop-in replacement

## Setup

First, set up a demo database by running the following SQL script (`my_script.sql`):

```sql
CREATE TABLE person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

It can be run via:

```bash
sqlite3 demo.db
.read my_script.sql
```

## Go Program

Then the following Go program will write a record into the `person` table in `demo.db`

```go
package main

import (
    "database/sql"
    "fmt"

    _ "modernc.org/sqlite"
)

  

func main() {

    db, err := sql.Open("sqlite", "./demo.db")

    if err != nil {
        panic(err)
    }  

    stmt, err := db.Prepare("INSERT INTO person (name) VALUES (?)")
  
    if err != nil {
        panic(err)
    }

    _, err = stmt.Exec("Eric")

    if err != nil {
        panic(err)
    }
 
    fmt.Println("Successfully wrote record to db")

}
```

The basic flow here is:

- Connect to the database via `sql.Open`, which takes two arguments -- the driver and the connection string
- Prepare a statement using the `db.Prepare()` method, which lets you create a statement using `?` as placeholders for arguments to be passed in later.
- Execute the statement/query via `stmt.Exec()`, which passes values to the `?` placeholders in the result from `db.Prepare()`