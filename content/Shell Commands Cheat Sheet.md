---
title: Shell Commands Cheat Sheet
draft: false
date: 2025-05-05
tags:
  - shell
---

## List Files
List the files in a directory with `ls`

```bash
ls
```

Or

```bash
ls path/to/dir
```

## Change Directory

Change the directory you're in with `cd`

```bash
cd other_directory
```

```bash
cd path/to/directory
```

Or go back up one level with `..`

```bash
cd ..
```
## Remove Files

Basic use of `rm`:

```bash
rm file.txt
```

To force delete of something that is write-protected:
```bash
rm -f file.txt
```

To recursively delete all files/subdirectories, use the `-r` option
```bash
# assume my_directory has multiple files in it
rm -r my_directory
```