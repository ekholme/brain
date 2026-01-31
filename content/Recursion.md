---
title: Recursion
draft: false
date: 2025-03-03
tags:
  - programming/algorithms
  - programming/julia
---
Recursion is a technique in programming where a function calls itself in its own definition. This approach is useful for breaking down complex problems into a series of self-similar problems.

A recursive function typically has two "cases":
- A base case, which essentially provides the function with a stopping point; and
- A recursive case, which is where the function calls itself with a slightly modified input

The way it works is that the recursive function will continue to call itself (with slightly modified input) until it hits the base case. During these repeated calls, it generates a [call stack](https://en.wikipedia.org/wiki/Call_stack). Once it hits the base case, the call stack is "unwound" in reverse order.

Two example use cases for recursion are calculating the factorial of a number and walking file directories.

## Factorial

Here's an example of a recursive function that calculates a factorial (in Julia):

```julia
function factorial(x::Int64)
    if x < 0
        error("x must be non-negative")
    elseif x == 0
        return 1
    else
        return x * factorial(x - 1)
    end
end

#usage
factorial(5)
```

The base case in this instance is `x == 0`, where it will return 1. Otherwise, it will proceed to the recursive case, where it multiplies the input `x` by the output of `factorial(x - 1)`, which will keep recursing until it hits the case where `x == 0`.

## Directory Walking

Another example involves walking a directory (also written in Julia):

```julia
function walk_directory(path::String)
    for item in readdir(path, join=true)
        if isdir(item)
            println("Directory: ", item)
            walk_directory(item) # Recursive call for subdirectories
        else
            println("File: ", item)
        end
    end
end

#usage -- start in current directory
walk_directory(".")
```

This will look at item in the supplied `path`. If the item is a directory, it will continue walking down that directory. If the item is a file, it will stop.

## Other Uses

Recursion can be useful for tasks that involve traversing trees, certain "divide and conquer" algorithms (e.g. the [Merge Sort Algorithm](https://www.geeksforgeeks.org/merge-sort/))