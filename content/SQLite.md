---
title: SQLite
draft: false
date: 2024-11-11
tags:
  - databases
  - sqlite
  - sql
---

## What is SQLite?

[SQLite](https://www.sqlite.org/index.html) is basically a small, self-contained database that can be embedded in other applications. It's useful for applications or devices that don't need or want to connect to an external database like [[Postgres]] or some cloud offering.

SQLite is nice for lots of reasons -- it's easy to install (see below), it's typically just something you link into your application via a library, it's minimalistic but also feature-rich (e.g. it has CTEs, full-text search, JSON compatibility). It reminds me of [[DuckDB]] is a lot of ways, but DuckDB is more intended for analytic, column-oriented workflows whereas SQLite is more intended for row-oriented operations.

That said, one of SQLite's strengths (that it's bundled with the server) is also one of its weaknesses. That is, if the application server explodes, so does the database. Pre-iCloud phones are a useful analogy. Before there were cloud backups for your phone, if you fell into a pool, all of your data on the phone was probably lost. So I guess don't throw your SQLite-powered application server into a pool...

## Installing SQLite

The easiest way to install sqlite -- and the way you'll do it on the vast vast majority of systems -- is via `apt`:

```bash
#sudo apt update && sudo apt upgrade
sudo apt install sqlite
```

Then verify the installation via:

```bash
sqlite3 --version
```

## Creating a Database

There are a few ways to create a database. The most straightforward is as follows:

```bash
sqlite3 demo.db
```

This will open `demo.db` if it exists or create it if it doesn't.

But you can also open the `sqlite` application from the shell, then create a database from there:

```bash
sqlite3
.open demo.db
```

*Note that just running the `sqlite3` command without any arguments will connect to an in-memory database. So we're first opening an in-memory database, then saying "actually I want to connect to demo.db instead"*

Another way is to use a language with an SQLite3 library to do that, e.g. Python:

```python
import sqlite3

con = sqlite3.connect('demo.db')
```

## Create and Manage Tables

You create tables just like you would with any other SQL database (e.g. Postgres). That is, it uses the same SQL statements. So to create a table, we could run

```bash
sqlite3
```

then run the following code in the terminal:

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT
    username TEXT UNIQUE,
    email TEXT UNIQUE
);
```

A better approach, though, is to save the above to a `.sql` file, then run this file from the shell, so you don't have to type a long SQL statement into the terminal. If that statement is saved in `my_file.sql`, then we could run:

```bash
sqlite3 demo.db < path/to/my_file.sql
```

### Check Existing Tables

To see what tables exist in an sqlite database, run:

```bash
sqlite3 demo.db
.tables
```

### Check the Schema of a Table

To see the schema of a table:

```bash
sqlite3 demo.db
.schema tablename
```

## Other Readings

- [Ben Johnson's "Im All-In on Server-Side SQLite"](https://fly.io/blog/all-in-on-sqlite-litestream/)