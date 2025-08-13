---
title: Python main function
draft: false
date: 2025-08-05
tags:
  - python
---
Unlike languages like [[Go]], the `main()` function isn't a special, built-in part of [[Python]]. Instead, it's a convention that people use to execute code. It's typically paired with an `if __name__ == "__main__":` block, that looks like this:

```python
if __name__ == "__main__":
	main()
```

Although `main()` isn't special in python, the `__name__` variable is. If we run a script *directly* (e.g. by running `python my_script.py` or `uv run my_script.py`), then the python interpreter sets the `__name__` variable for that script to `__main__`. Whereas if we import `my_script.py` from another script, the `__name__` variable will be set to its module name (e.g. `my_script` in this case).

This is a useful pattern because it lets us define logic that will only be executed if a python script is run directly. For example, imagine the following script:

```python
#my_script.py
def hello(name):
	return f"Hello, {name}"

def main():
	nm = "Eric"
	x = hello(nm)
	print(x)

if __name__ == "__main__":
	main()
```

If we ran `python my_script.py` directly, we'd get `"Hello, Eric"`, like we would expect. But if we had another script that imported this script, we could access the `hello()` function without executing the `main()` function:

```python
#another_script.py
from my_script import hello

print(hello("Kendall"))
```

