---
title: ggsql
draft: false
date: 2026-04-20
tags:
  - data_science/data_viz
---
[ggsql](https://ggsql.org/) is a data visualization tool that brings the [[Grammar of Graphics]] to [[SQL]]. It's a stand-alone tool that interfaces with SQL databases and allows users to create visualizations directly in a SQL query, without needing to pass the data into [[R]], [[Python]], or some other programming language.

Here's an example of the syntax:
```sql
-- Regular query
SELECT * FROM ggsql:penguins
WHERE island = 'Biscoe'
-- Followed by visualization declaration
VISUALISE bill_len AS x, bill_dep AS y, body_mass AS fill
DRAW point
PLACE rule
  SETTING slope => 0.4, y => -1
SCALE BINNED fill
LABEL
  title => 'Relationship between bill dimensions in 3 species of penguins',
  x => 'Bill length (mm)',
  y => 'Bill depth (mm)'
```
