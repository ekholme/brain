---
title: Bootstrapping
draft: false
date: 2024-11-15
tags:
  - stats
  - algorithms
  - julia
  - resampling
---
 
## What is Bootstrapping

[Bootstrapping](https://en.wikipedia.org/wiki/Bootstrapping_(statistics)) is a method for estimating the properties of some quantity -- like its expected value, its variance, etc -- using resampling with replacement.

Basically the idea is that, when we have a sample, we can estimate quantities (e.g. the mean) from that sample. But we know that the sample isn't going to be a perfect representation of the population, and that if we obtained data from multiple samples, our estimate of the mean (or whatever other quantity) would differ. Bootstrapping gives us a tool to estimate this variability in our quantity of interest without having to collect multiple samples.

It can be a nice approach for obtaining (more) stable estimates with small data sets, with datasets that are non-normal, or with data where outliers might bias the estimates. A benefit of bootstrapping is that it makes no assumptions about the distribution of your data, hence its robustness to outliers, small data, non-normality, etc.
## How It Works

Bootstrapping works by resampling *with replacement* from a sample, estimating the quantity of interest, and then repeating this process lots of times -- often 1,000 or more. After all of these repetitions, we then have a distribution of the quantity of interest, so we can get a sense of its expected value as well as its standard error. This approach lends itself well to constructing confidence intervals, too.

The general process is:

1. If you have a dataset *x* (vector, matrix, whatever) with *i* observations, resample *i* observations with replacement from *x*. Note that you don't have to retain *i* samples in your new sample, but it's kind of the default approach.
2. Estimate your quantity of interest (e.g. mean, quantile, regression coefficient, whatever) on your resampled dataset.
3. Repeat the process *n* times, where *n* is a fairly large number (usually at least 1,000).
4. Use your *n* estimates as the distribution of your quantity. You can use this to calculate the mean, standard error, confidence intervals, etc.
## Implementation
Below is a basic demonstration (in Julia) of bootstrapping to estimate various percentiles of a distribution.

```julia
using Distributions
using Random

Random.seed!(0408)

#generate some data
u = Uniform(0, 1)
n = 1_000
v = rand(u, n)

#define the percentiles I'm interested in
qs = [0.1, 0.25, 0.5, 0.75, 0.9]

# write a function to bootstrap these quantiles
function boot_quants(x::Vector{Float64}, quants::Vector{Float64}, nboot::Int)
    qlen = length(quants)
    x_size = length(x)
    outvec = [Vector{Float64}(undef, qlen) for _ in 1:nboot]

    for i ∈ eachindex(outvec)
        s = sample(x, x_size, replace=true)
        outvec[i] = quantile(s, quants)
    end

    m = hcat(outvec...)'

    return m
end

# run the function
res = boot_quants(v, qs, n)

#estimate the expected value of each quantile
#but note that we could construct confidence intervals or estimate other quantities as well if we wanted
ev_quantiles = mean.(eachcol(res))

```