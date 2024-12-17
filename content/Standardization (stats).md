---
title: Standardization (statistics)
draft: false
date: 2024-12-17
tags:
  - stats
  - feature_engineering
---
[Standardizing](https://en.wikipedia.org/wiki/Standard_score) is a statistical approach that centers the mean of a distribution at 0 and scales the standard deviation of a distribution to 1. It's synonymous with "z-scoring."

Mathematically, this looks like:

$$
z_{i} = \frac{(x_{i} - \mu)}{\sigma}
$$

This approach is useful for a few reasons, particularly when we standardize variables before including them in statistical models.

First, it puts all of the coefficients on the same scale, and so we can (sort of) directly compare the magnitude of effects. This is useful both for coefficients in the same model(s) and for comparing effects from across different research studies. I say that we can "sort of" compare these effects because we still need to take into account uncertainty in our estimates (e.g. we shouldn't necessarily conclude that $\beta_{1} = .12$ has a larger effect than $\beta_2 = .10$, since there will be uncertainty in these estimates). Another caveat is that, if we're comparing across studies, the models we're comparing may include different controls/combinations of variables, which can make comparison more tricky.

Second, sometimes standardized effects can be easier to interpret than unstandardized effects. This might be the case for Likert scales, for instance. But there are also obvious cases where the unstandardized variable has an intuitive meaning (dollars, age, pounds of bodyweight, etc.), and standardizing makes it less interpretable.

Third, if we're using a [[Regularized Regression|regularized regression model]], ensuring the variables are all on (roughly) the same scale will also ensure that they are penalized similarly.

