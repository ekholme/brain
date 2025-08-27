---
title: Go Interfaces
draft: false
date: 2025-08-26
tags:
  - go
---
In [[Go]], interfaces define a set of method signatures. Interfaces are types themselves, but they are used to define what other types (such as structs) can do.

A concrete type that implements all of the methods of an interface "satisfies" that interface.

Interfaces are useful because they let us write functions that can accept a general interface type rather than a specific concrete type, which makes code more flexible. The cost of this is that it can also make the code more abstract.

## Example

Here's an example demonstrating the concept. We can define a `Shape` interface that has a single method: `Area()`, which requires no arguments and returns a `float64`. We can then define concrete types (structs) for `Circle` and `Rectangle`. Since both have an `Area()` method that accept no arguments and return a `float64`, they satisfy the `Shape` interface, which means we can pass either a `Circle` or `Rectangle` to the `printArea()` function (which takes a `Shape` as its one argument).

```go
package main

import "fmt"

// Define the Shape interface
type Shape interface {
    Area() float64
}

// Define a struct for a Circle
type Circle struct {
    Radius float64
}

// Implement the Area method for Circle
func (c Circle) Area() float64 {
    return 3.14159 * c.Radius * c.Radius
}

// Define a struct for a Rectangle
type Rectangle struct {
    Width  float64
    Height float64
}

// Implement the Area method for Rectangle
func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

// A function that works with any type that satisfies the Shape interface
func printArea(s Shape) {
    fmt.Printf("The area is: %f\n", s.Area())
}

func main() {
    circle := Circle{Radius: 5}
    rectangle := Rectangle{Width: 10, Height: 5}

    // Both Circle and Rectangle satisfy the Shape interface, so they can be passed to printArea
    printArea(circle)
    printArea(rectangle)
}
```

## A Less Contrived Example

Here's a slightly less contrived example that also illustrates the concept of dependency injection. Imagine a case where we need to interact a database, and we have concrete services that handle database interactions for various data models, `Foo` and `Bar`:

```go
//defining some data models
type Foo struct {
	x string
}

type Bar struct {
	y    string
	foos []*Foo
}

//defining some services to interact with the database w/r/t these data models
type FooService struct {
	db *sql.DB
}

type BarService struct {
	db *sql.DB
}

//write methods
func (fs FooService) CreateFoo(f *Foo) {
	//implementation details
}

func (bs BarService) CreateBar(b *Bar) {
	//implementation details
}

```

One thing we need to consider here is that our `Bar` data model includes a slice of `Foo`s. So when write a `Bar` to our database using the `CreateBar` method, we'll probably end up calling the `CreateFoo` method to write each of `Bar`'s constituent `Foo`s to the database. Or at least that's one approach. It could look something like this:

```go
func (bs BarService) CreateBar(b *Bar) {
	//code to write `Bar` to the db
	//etc.
	
	//code to loop through and write Foo's to db
	fs := FooService{db: bs.db}
	
	for _, foo := range b.foos {
		fs.CreateFoo(foo)	
	}
}
```

Our issue then ends up being how do we ensure atomicity of the entire `CreateBar` operation if we choose to loop through multiple iterations of `CreateFoo` within the method call?

We want to use a [database transaction](https://go.dev/doc/database/execute-transactions) (i.e. `*sql.Tx`) to solve this issue, which groups multiple operations together and only succeeds if all of the constituent operations succeed. But our code doesn't currently allow this.

Interfaces to the rescue, though! We can implement a `querier` interface, then refactor our `FooService` struct to take a `querier` rather than a `*sql.DB`:

```go
type querier interface {
	ExecContext(ctx context.Context, query string, args ...any) (sql.Result, error)
	QueryContext(ctx context.Context, query string, args ...any) (*sql.Rows, error)
	QueryRowContext(ctx context.Context, query string, args ...any) *sql.Row
}

type FooService struct {
	db querier
}
```

This works because both `*sql.Tx` and `*sql.DB` implement the methods defined by our `querier` interface. So we can resolve our atomicity issue by beginning a database transaction in the `CreateBar()` method, then passing this transaction to `FooService`, e.g.:

```go
func (bs BarService) CreateBar(b *Bar) {
	ctx := context.Background()
	
	tx, err := bs.db.BeginTx(ctx, nil)
	//handle error
	
	defer() tx.Rollback()
	
	//code to write Bar to the db
	//etc
	
	//create a FooService using the transaction	
	txFS := FooService{db: tx}
	
	for _, foo := range b.foos {
		txFS.CreateFoo(foo)	
	}

	//etc
}
```

## Interface Composition

ADD THIS