---
title: Normal Curve Equivalent (NCE)
draft: false
date: 2026-01-16
tags:
  - stats
---
A [Normal Curve Equivalent](https://en.wikipedia.org/wiki/Normal_curve_equivalent) is a standardized score on a scale of 1-99 that is often used in education. NCEs have several desirable properties, including:

- Scores are on an equal-interval scale (e.g. the distance from 5-10 is the same as the distance from 50-55);
- The 1st, 50th, and 99th NCEs are equivalent to the 1st, 50th, and 99th percentiles for a given set of scores;
- The shape of the distribution of NCEs follows that of a normal distribution

The formula for calculating an NCE is:
$$
NCE = 70770 + \text{qnorm}(.99)\times z 
$$

or approximately
$$
50 + 21.063\times z
$$
