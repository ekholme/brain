---
title: Dependency Injection
draft: false
date: 2026-06-17
tags:
  - programming/go
  - programming/r
---
Dependency injection refers to passing a piece of code all of the "things" it needs to perform a given task rather than asking that code to create all of those things itself.

## Advantages

Without using dependency injection, we end up tightly coupling our components to specific implementations. This makes it difficult to refactor and test our code. By using dependency injection we get:

1. **Loose coupling:** Components/functions only care about what a dependency does, not how it does it
2. **Testability:** We can swap out large or complex dependencies (e.g. databases) for mocks when testing.
3. **Clarity:** Function/type definitions explicitly state what dependencies they need

## A Go Example

In Go, we typically see dependency injection go hand-in-hand with [[Go Interfaces|interfaces]]. We might define a function or method that accepts an interface, define a type that implements that interface, then inject the dependency via a constructor.

```go
type UserRepo interface {
  Save(user string) error
}

type SQLiteRepo struct {
	ConnectString string
}

func (s *SQLiteRepo) Save(user string) error {
	//logic to save to the db
	return nil
}

type UserService struct {
	repo UserRepo
}

func NewUserService(r UserRepo) *UserService {
	return &UserService{repo: r}
}

func main() {
	//create the dependency
	db := &SQLiteRepo{ConnectString: "myConnectString"}
	
	//inject the dependency into the service
	userService := NewUserService(db)
}
```