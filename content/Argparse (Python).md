---
title: Argparse (Python)
draft: false
date: 2026-11-19
tags:
  - programming/python
---
In [[Python]], the `argparse` module allows us to build command line interfaces and parse command line arguments in python scripts. The basic `argparse` pattern involves:

1. Creating a parser (`ArgumentParser`);
2. Defining arguments (`add_argument`); and
3. Parsing the arguments (`parse_args`)
## Example

Here's a very basic example:

```python
import argparse 

def my_sum(x: int, y: int) -> int:
    return x + y

def main() -> None:
    parser = argparse.ArgumentParser(description="Demo argument parser")

    parser.add_argument("--x", type=int, default=1, help="first value to add")
  
    parser.add_argument("--y", type=int, default=2, help="second value to add")

    args = parser.parse_args()

    z = my_sum(args.x, args.y)

    print(f"Summed {args.x} and {args.y} to get: {z}") 

if __name__ == "__main__":
    main()
```

And we can then run this via the command line:

```bash
#assuming we're using uv
uv run src/my_script.py # use default values

uv run src/my_script.py --x 2 --y 3 # supply non-default values
```