---
title: Curse of Dimensionality
draft: false
date: 2026-02-20
tags:
  - stats/theory
---
The [Curse of Dimensionality](https://en.wikipedia.org/wiki/Curse_of_dimensionality) refers to issues that arise when trying to fit models in high-dimensional spaces (e.g. those with many predictors). The phenomenon generally refers to the idea that as the number of features increases, the input space grows exponentially, which in turn means that the model will require many more samples to achieve a good fit.

As the size of the input space increases, the amount of data needed to "fill" it grows exponentially. This often leads to data sparsity. More specifically, the data tends to migrate toward the edges of the hyperspace, and the center becomes sparser.

This can cause overfitting, and it makes it more difficult to fit models that use distance metrics as part of the fitting process (e.g. [[K Nearest Neighbors]]).

