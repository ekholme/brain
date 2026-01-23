---
title: Local Regression
draft: false
date: 2025-03-20
tags:
  - stats/regression
  - programming/r
---
*Local regression* involves fitting a flexible, non-linear function by computing the fit at a target point, $x_0$, using only the nearby training observations. We assign weights $K_{i_{0}}$ to the nearby observations for each value of $x_0$.

When we fit a local regression, we can make a few choices about the weighting function or whether to fit a linear model, a quadratic model, etc at each step. The most important choice we make is the span, $s$. The span defines the proportion of points used to compute the local regression at $x_0$. Small $s$ leads to more wiggly models, whereas larger $s$ invokes a more global fit.

Span is a hyperparameter, kinda like $\lambda$ in regularized regressions, and we can tune it via cross-validation to help choose the best value.

## Local Regression Algorithm

The algorithm for fitting a local regression with 1 predictor is:

1. Limit the data to the fraction $s$ of points that are closes to $x_0$.
2. Assign weights $K_{i0} = K(x_{i}, x_{0})$ to each point in the neighborhood. The weights of the points farthest from $x_0$ should be the smallest, and the weights of the points closest to $x_i$ should be the largest. Any points outside of the neighborhood will have a weight of 0.
3. Fit a weighted least squares regression of $y_i$ on $x_i$ using these weights. This regression should minimize the function:

$$
\sum_{i=1}^n = K_{i_{0}}(y_{i}-\beta_{0}-\beta_{1}x_{i})^2
$$

4. The fitted value at $x_0$ is given by $\hat{f}(x_{0}) = \hat{\beta_{0}} + \hat{\beta}_{1}x_{0}$ 

## Generalizations

Local regression can be generalized in different ways. One way involves fitting a model that is global in some variables but local in others. We can also fit a local regression with multiple local predictors, but if $p$ is much larger than 3, it can be hard to find observations suitably close to $x_0$ in this high-dimensional space. [[K Nearest Neighbors|KNN]] has a similar problem.

## R

Local regressions can be fit in [[R]] using the `loess()` function:

```r
fit <- loess(wage ~ age, data = Wage)
```

The model is specified via a formula, as is common in most of R's statistical modeling functions.