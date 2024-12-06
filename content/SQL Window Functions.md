---
title: SQL Window Functions
draft: false
date: 2024-12-06
tags:
  - sql
---
From the [[Postgres]] introduction to window functions:

> A _window function_ performs a calculation across a set of table rows that are somehow related to the current row. This is comparable to the type of calculation that can be done with an aggregate function. But unlike regular aggregate functions, use of a window function does not cause rows to become grouped into a single output row — the rows retain their separate identities. Behind the scenes, the window function is able to access more than just the current row of the query result.

In other words, we can perform some aggregations while still retaining the number of rows in our original data. It also means that we don't need to include all of the columns in our table in a `GROUP BY` clause.

For instance, imagine we have a table with student testing information:

```sql
CREATE TABLE student_tests (
  [id] INT,
  [student_id] INT,
  [admin_date] DATETIME,
  [test_name] VARCHAR(100),
  [test_score] INT
)
```

If we wanted to just get the average scores for each test, we could do a normal `GROUP BY` query:

```sql
SELECT test_name,
AVG(test_score) as avg_test_score
FROM student_tests
GROUP BY test_name
```

And this would work just fine. But imagine we also want to see each student's test score, but we also want a column in our results that contains the average test score (so we can compare each student to the average score, for instance). We could join our average score table back to our original table:

```sql
WITH avg_tbl (test_name, avg_test_score) AS (
SELECT test_name,
AVG(test_score) as avg_test_score
FROM student_tests
GROUP BY test_name
)

SELECT *
FROM student_tests
LEFT JOIN avg_tbl
ON avg_tbl.test_name = student_tests.test_name
```

Or we could use a a window function with a `PARTITION BY` clause, which is more succinct:

```sql
SELECT student_id,
test_name,
test_score,
AVG(test_score) OVER(PARTITION BY test_name) AS avg_test_score
FROM student_tests
```

Window functions always contain an `OVER` clause directly following the function's name and arguments. This defines how the rows are subset when being processed. 

This is similar to a grouped mutate in [[R]] and dplyr:

```r
x |>
  group_by(test_name) |>
  mutate(avg_test_score = mean(test_score))
```

## Window Functions with ORDER BY

This can be especially helpful if we need to generate in-group row numbers or if we need to order stuff within a group. Imagine if we wanted to order our test scores by the date a person took the test, so we can label their first attempt, second attempt, etc.

```sql
SELECT student_id,
test_name,
ROW_NUMBER() OVER(PARTITION BY test_name, student_id ORDER BY admin_date) AS attempt_number,
test_score,
AVG(test_score) OVER(PARTITION BY test_name) AS avg_test_score
FROM student_tests
```

