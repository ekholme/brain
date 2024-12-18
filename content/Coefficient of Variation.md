---
title: Coefficient of Variation
draft: false
date: 2024-12-18
tags:
  - stats
---
The [coefficient of variation](https://en.wikipedia.org/wiki/Coefficient_of_variation) (CV) is a basically a standardized version of a standard deviation. It's calculated by dividing the standard deviation of a distribution by its mean (or the absolute value of the mean, if $\mu$ is negative):

$$
CV = \frac{\sigma}{|\mu|}
$$

The rationale behind the coefficient of variation is that it makes standard deviations comparable. Typically, measures with larger averages also tend to have larger standard deviations (i.e. the correlation between a measure's mean and its standard deviation is positive), and so if we wanted to compare the variability of two measures, a raw comparison between these standard deviations doesn't tell us much.

For instance, imagine we wanted to know if men or women tend to vary more in terms of height. On average, men are taller, and so the standard deviation of the height distribution for men will be larger than the standard deviation of the height distribution for women. We *could* directly compare these standard deviations, but what we probably care more about is the variability in height *proportional to the average height*. This is what the CV allows us to do.

### A Caveat

The CV only works for *ratio measures*, i.e. those that have meaningful 0 points and equal spacing between items on the measurement scale (e.g. heigh in centimeters, weight in kilograms, etc.). For interval or ordinal measures, the CV probably doesn't have a meaningful interpretation.

