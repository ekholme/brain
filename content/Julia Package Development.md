---
title: Julia Package Creation
draft: false
date: 2025-07-31
tags:
  - programming/julia
---
## Creating a Package

Creating a package in [[Julia]] is pretty straightforward, thanks to [PkgTemplates.jl](https://juliaci.github.io/PkgTemplates.jl/stable/). It's probably easiest to create the package interactively. To do this, just open a Julia REPL, then run:
```julia
using PkgTemplates
Template(interactive=true)("MyPkg")
```

And then follow the prompts to set up the package.
## Testing

To test functionality in a Julia package, create a file named `runtests.jl` within the `test/` directory. The test entrypoint *must* be named `runtests.jl`. The directory might look like this:

```

MyPackage/
├── Project.toml
├── src/
│   └── MyPackage.jl
└── test/
    └── runtests.jl
```


Within the `runtests.jl` file, define test sets to run tests. Each test set can comprise multiple tests. The file might look like this:

```julia
using Test
using MyPackage

@testset "MyPackage.jl Tests" begin
	@testset "Basic Arithmetic" begin
		@test MyPackage.add_numbers(2, 3) == 5	
		@test MyPackage.add_numbers(-1, 1) == 0	
	end
	
	@testset "Error Handling" begin
		@test_throws DomainError MyPackage.sqrt(-5)	
	end
end
```