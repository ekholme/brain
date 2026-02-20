---
title: Logging in Python
draft: false
date: 2026-02-19
tags:
  - programming/python
  - logging
---
The `logging` module in [[Python]] is designed to be easy to use. It does many things implicitly, using a `root logger` that we can configure early in a script by doing something like this:

```python
import logging

#ensure the log directory exists
os.makedirs("logs", exist_ok=True),

logging.basicConfig(
	filename = "logs/mylog.log",
	level = logging.INFO, #sets the minimum lvl of message to be logged 
	format = "%(asctime)s - %(levelname)s - %(message)s",
	filemode = "w" #overwrite log file on each run
)
```

After we configure our `root logger`, this gets called implicitly whenever we log something in a function using functionality from the `logging` module. For example:

```python
def my_logged_func(x, y):
	try:
		return x + y
	except Exception as e:
		logging.error(f"Error running my_logged_func: {e}")
		return "Error: could not run function"
```

Even though we don't explicitly pass any sort of logger to `my_logged_func()`, since we've already configured our (global) root logger previously, any call to a logging method (e.g. `logging.info()`, `logging.error()`) will implicitly send messages to the root logger.

With larger applications, we might use named loggers for different modules to give more granular control over logging behaviors for different pieces of the application, but the global root logger approach is fine for smaller apps.