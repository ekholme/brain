---
title: Relational Databases
draft: false
date: 2025-06-23
tags:
  - sql
  - databases
---
A [relational database](https://en.wikipedia.org/wiki/Relational_database) (RDB) is a database that stores data in a set of interrelated tables, with each table comprising rows (observations) and columns (variables). RDBs are probably the most common type of database used today.

Each table in an RDB is meant to model some sort of entity. For example, imagine a student information system. We might have a `Student` table where each row represents a student, and each column represents information about that student (e.g. student id number, first name, race, home address). We might have a `Courses` table where each row represents a course offered, and each column represents information about that course (e.g. whether it's a year-long or semester-long course, its weighting, what content area (ELA, math, etc.) it's classified as, etc.). And we might have a `Student_Schedule` table where a row represents a course a student has taken. The columns in this table might simply be `id`, `school_year`, `student_id`, `course_id`.

The key feature of RDBs is that the tables in the database are *related* to one another. Given this, relational database systems provide functionality for *joining* tables to one another (e.g. `LEFT JOIN`, `INNER JOIN`, etc). Using the previous example, we could join either the `Student` table or the `Courses` table to the `Student Schedule` data to pull together more information. Modeling our data this way, and relying on joins to pull in related data from other tables, is critical because it allows for data to be deduplicated.

## Keys

Keys are another key feature of RDBs. There are 2 types of keys.

**Primary Keys** uniquely identify each row in a table. That is, a primary key should correspond to one row and one row only. Sometimes there is an existing column in a table that can serve this purpose (e.g. a `user_id` in a table of users), but often we create a surrogate key to fill this role (e.g. an integer that's autoincremented each time a user registers). Some database systems use composite keys, where 2 or more attributes within a table uniquely identify a record. For example, if we have a `Student` table that's updated annually, the composite key might be `student_id` & `school_year`.

**Foreign Keys** are columns in one table that refer to primary keys in another table. For example, in the earlier example with the `Student_Schedule` table, the `student_id` column in our `Student_Schedule` table might be a foreign key, assuming it's the primary key in the `Student` table.