---
title: Pytest Fixtures
draft: false
date: 2025-03-24
tags:
  - python
  - testing
---
A [fixture](https://docs.pytest.org/en/stable/explanation/fixtures.html) in [Pytest](https://docs.pytest.org/en/stable/index.html) helps provide reliable, consistent context for running tests on our code. Most often, this means providing either some sort of known dataset to run our tests against or a database with known schema, configuration. But it could be any other object that we use to test our functions.

Fixtures are basically just functions that we declare with the decorator `@pytest.fixture`, e.g.:

```python
@pytest.fixture
def database_connection():
	conn = ... #setup database connection
	yield conn #allow the test to use the connection
	conn.close() #close the connection after the tests run
```

We could then use this in a test:

```python
def test_db_query(database_connection):
  cursor = database_connection.cursor()
  ... #logic to test database query
```

We could also create a fixture dataset that we then use in our tests, e.g.:

```python
import pytest
import polars as pl

@pytext.fixture
def sample_data() -> pl.DataFrame: #hint that the function will return a polars df
	data = {
		"student_id":[1,2],
		"test_score":[90, 100],
		"classroom": ['A','B']	
	}
	return pl.DataFrame(data)
```

Which we then use in tests:
```python
def test_data(sample_data: pl.DataFrame):
	#say we wanted to test a 'recode' function:
	x_recoded = recode(sample_data)
	#then add logic to test recoded data
```

## Why Use Fixtures?

1. Fixtures handle setup and teardown automatically. By using `yield`, we can return something and then handle teardown afterwards. See the database example above. We can `yield` a connection that gets used in our tests, then close this connection automatically after all of the tests are run
2. Fixtures help with dependency injection. Test functions can depend on fixtures, and we can pass these fixtures into the test functions as arguments to automatically get their return values.
3. Separates test logic from dependencies. By injecting dependencies into the test functions, the test functions themselves can be more focused on the actual test logic and less on setting up/tearing down dependencies.
4. Fixtures can be shared across multiple tests. This reduces code duplication and potential inconsistency, since the fixtures are defined in a single place.
