---
title: Case When (SQL)
draft: false
date: 2025-04-23
tags:
  - programming/sql
---
 Case When expressions in SQL allow users to iterate through conditions and return results depending on which condition evaluates to `TRUE`. When a condition evaluates to `TRUE`, the logic breaks for the current observation and a result is returned (i.e. if the first condition evaluates to `TRUE` for row 1, the second condition will not be evaluated for row 1). This is essentially just like a chain of `IF ELSE` statements.
## Syntax

The syntax for `CASE WHEN` statements looks like this:

```sql
CASE
  WHEN col1 = 'foo' THEN 'bar'
  WHEN col2 = 'baz' THEN 'buzz'
  ELSE 'fizz'
END AS new_col 
```

