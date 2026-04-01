---
title: Structs (Julia)
draft: false
date: 2026-04-01
tags:
  - programming/julia
---
Structs in [[Julia]] provide users with ways to define their own data types. Users can then define functions that accept these user-defined types as appropriate.

Julia provides two different types of structs: a `struct` and a `mutable struct`. They can be defined as follows:

```julia
struct Dog
	name::String
	age::Integer
end

mutable struct DogTwo
	name::String
	age::Integer
end
```

When a struct is defined, Julia also automatically provides a constructor function where each field of the struct is an argument to the constructor, e.g.:

```julia
dog1 = Dog("Nala", 9)
dog2 = DogTwo("Darcy", 3)
```

But we can also create our own constructor functions as well, e.g.:

```julia
function Dog(name::String, age::AbstractFloat)
	age_f = Int(floor(age))
	return Dog(name, age_f)
end
```

The difference between a `struct` and a `mutable struct` is that fields in a struct *cannot* be modified after they're defined, whereas fields in a `mutable struct` can.

```julia
dog1 = Dog("Nala", 9)
dog2 = DogTwo("Darcy", 3)

# this will error
dog1.age = 10

# this will work
dog2.age = 4
```

I tend to pretty much always use mutable structs because they tend to make more sense for my workflows, and I'd prefer the ability to change field values if necessary. But I assume there's a performance benefit to using a regular `struct`
## Further Reading
- [Julia Manual Section on Types](https://docs.julialang.org/en/v1/manual/types/)