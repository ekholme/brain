---
title: Variadic Functions
draft: false
date: 2024-12-05
tags:
  - go
  - programming
---
A [variadic function](https://en.wikipedia.org/wiki/Variadic_function#) is a function that can take any number of arguments. A common use case for this is a function that can print out multiple things at once, and in fact [[Go]]'s `fmt.Println()` function is a good example of this. It's function signature is:

```go
fmt.Println(a ...interface{})
```

The `...{interface}` piece here denotes that `Println` can take any number of arguments of type empty interface (i.e. anything). So this would work just fine:

```go
func main() {
name := "Eric"
age := 36

fmt.Println("Hello,", name, "you are", age, "years old")
}
```

## Passing a Slice to a Variadic Function

If we want to pass a slice to a variadic function -- i.e. if we want the function to accept each element of the slice as an input argument -- we need to unpack it (I'm not sure if "unpack" is real Go terminology, but it's the language I'm familiar with). We unpack it by adding a trailing `...`

So, for example:
```go
func sum(nums ...int) int {
	total := 0

	for _, num := range nums {
		total += num
	}
}

func main() {
	x = []int{1, 2, 3}

	s := sum(x...) //we add ... after x to unpack it
}
```

A common use case for this is appending a slice to another slice. We would need to unpack the second slice, e.g.:

```go
x := []int{1, 2, 3}
y := []int{4, 5, 6}

//appends y to x
x = append(x, y...)
```