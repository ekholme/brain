---
title: Common Table Expressions
draft: false
date: 2025-04-23
tags:
  - sql
---
[Common Table Expressions](https://www.geeksforgeeks.org/cte-in-sql/) are temporary, named results (tables) that we can generate using SQL. They're useful in that they help break down potentially complex queries into smaller, modular components that can be used in other parts of a larger query.

## Syntax

Generally, the syntax for a CTE is something like this:

```sql
WITH tbl (col1, col2) AS (
  SELECT col1,
  col2
  FROM other_tbl
  WHERE ...
)

SELECT *
from tbl;
```

This isn't a very useful example, but it shows that we can create the CTE using the `WITH` clause, then defining the name of the CTE (`tbl` in this case) as well the names of the columns in this CTE.