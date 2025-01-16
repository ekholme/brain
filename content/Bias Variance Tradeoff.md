---
title: Bias Variance Tradeoff
draft: false
date: 2025-01-16
tags:
  - stats
---
 
The expected test MSE for a given value, $x_i$, can always be decomposed into the sum of 3 quantities:
- the variance of $\hat{f}(x_{i})$,
- the squared bias of $\hat{f}(x_{i})$,
- the variance of the error $\epsilon$

Or:
$$
E(y_{i} - \hat{f}(x_{i}))^2 = Var(\hat{f}(x_{i})) + [Bias(\hat{f}(x_{i}))]^2 + Var(\epsilon)
$$

To minimize test MSE (the left of the equation), we want a technique that has both low bias and low variance.

In this parlance, *variance* refers to the amount by which $\hat{f}$ would change if estimated with different data. More flexible methods have higher variance

*Bias* refers to the error associated with using a model that is too simple. More flexible methods have lower bias.

As a general rule, when we use flexible methods, variance will increase and bias will decrease. And when we use restrictive methods, bias will increase and variance will decrease. The goal of modeling is to find a method/model (for your problem/data set) that has low bias and low variance.