---
title: Dataclass (Python)
draft: false
date: 2026-11-19
tags:
  - programming/python
---
In [[Python]], a `dataclass` is a class decorated with `@dataclass`. It's similar to a regular old class, but it automatically generates some boilerplate special methods, including `__init__` (initialization), `__repr__` (string representation), and `__eq__` (equality testing), based on the class's type-annotated attributes.

The point of a `dataclass` is to store and pass structured data. It's probably best to think of a dataclass as a special case of a more general python class. The reason it can automatically generate boilerplate special methods is because it is a narrower version of a class that makes some assumptions about its purpose.

Here's an example demonstrating some of the boilerplate stuff that dataclasses abstract away:
```python
from dataclasses import dataclass

# 1. Using @dataclass
@dataclass
class UserData:
    username: str
    email: str
    is_active: bool = True


# 2. Equivalent Regular Python Class
class UserRegular:
    def __init__(self, username: str, email: str, is_active: bool = True) -> None:
        self.username = username
        self.email = email
        self.is_active = is_active

    def __repr__(self) -> str:
        return (
            f"UserRegular(username={self.username!r}, "
            f"email={self.email!r}, is_active={self.is_active!r})"
        )

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, UserRegular):
            return NotImplemented
        return (
            self.username == other.username
            and self.email == other.email
            and self.is_active == other.is_active
        )
```

## Example

Here's a minimal example using data classes to implement a student test:

```python
from dataclasses import dataclass, field
from datetime import datetime, timezone

@dataclass(frozen=True)
class Question:
    """Question on a test."""

    id: str
    text: str

@dataclass(frozen=True)
class Answer:
    """An answer to a question inside a test"""

    question: Question
    correct: bool   

@dataclass
class Test:
    """A test for students"""

    test_id: str
    student_name: str
    answers: list[Answer] = field(default_factory=list)
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))

    def add_answer(self, question: Question, correct: bool) -> None:
        self.answers.append(Answer(question=question, correct=correct))

    @property
    def score(self) -> int:
        return sum(answer.correct for answer in self.answers) 

def main() -> None:
    # create some questions and answers
    q1 = Question("1", "is a dog a mammal?")
    q2 = Question("2", "is a lizard a mammal?")

    test = Test(test_id="test1", student_name="Jay Gatsby") 

    test.add_answer(q1, True)
    test.add_answer(q2, False)

    print(test)
    print(f"Test Score: {test.score}") 

if __name__ == "__main__":
    main()
```