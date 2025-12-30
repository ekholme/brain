---
title: try (cli tool)
draft: false
date: 2025-12-30
tags:
  - programming
  - cli
---
[try](https://github.com/tobi/try-cli) is a cli tool that helps you manage coding experiments.

You can use the `try` tool to create and/or fuzzy search for coding experiments. For instance, typing `try julia` will search the "tries directory" (which can be configured as part of `try`) for any experiment including the word "julia." We can then pick the directory we want, or we can create a new directory.

"Tries" are automatically date stamped, and the most recent experiments will surface at the top of the list when searching. E.g (*example take from the GH repo*):

```
$ try pool
→ 2025-11-28-redis-connection-pool    2h ago, 18.5
  2025-11-03-thread-pool              3d ago, 12.1
  2025-10-22-db-pooling               2w ago, 8.3
  + Create new: pool
```
