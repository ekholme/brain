---
title: Running R Scripts from the Command Line
draft: false
date: 2025-05-05
tags:
  - programming/cli
  - programming/r
---
Sometimes we want to be able to execute R scripts from the command line. The basic way to do this is (in Powershell) via:

```powershell
Rscript.exe my_script.R
```

in some cases, we might be able to omit the `exe` extension and just run:

```bash
Rscript my_script.R
```

## Parameterized Scripts

A more flexible approach involves passing values from the command line script to the R script. To process command line input in [[R]], we want the `commandArgs()` function:

```R
args <- commandArgs(trailingOnly = TRUE)

for (i in seq_len(length(args))) {
	print(args[i])
}
```

The above will take all of the command line args and print them out. The `trailingOnly` argument tells R to only process the arguments after the name of the executable (`Rscript.exe`) and the file name (`my_script.R`). So if we ran the code:
```powershell
Rscript.exe my_script.R "hello"
```

it would only print `"hello"`

To facilitate this from the shell side, we want to define our inputs as variables, then pass these to the `Rscript` command. Here's how this looks in Powershell:

```powershell
$var1 = 2024
$var2 = "hello"

Rscript.exe my_script.R $var1 $var2
```

One thing to note is that `$var1` in this example will be coerced to a string. If we want to treat it as a numeric variable, we'd need to coerce it to numeric in R.

