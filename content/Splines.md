---
title: Splines
draft: false
date: 2025-04-22
tags:
  - stats
  - glm
---
Regression splines are a flexible class of basis functions that extend polynomial regression and piecewise constant regression.

Piecewise polynomials allow the functions to be discontinuous at the knots, but we can constrain the functions to be continuous. We can also constrain the first and second derivatives to be continuous, which makes the function very smooth. These constraints are also beneficial because they free up degrees of freedom (by reducing the allowable complexity).

## Cubic Spline

A *cubic spline* is an example of a piecewise polynomial with continuity in the function as well as continuity in the first and second derivatives (so a total of 3 constraints). A cubic spline with $K$ knots uses a total of $4+K$ degrees of freedom.

In general, we can represent splines as basis functions, where a cubic spline with $K$ knots could be modeled as
$$
y_{i} = \beta_{0}+\beta_{1}b_{1}(x_{i})+\beta_{2}b_{2}(x_{i}) + \dots+\beta_{K+3}b_{K+3}(x_{i}) + \epsilon_{i}
$$
The most direct way to represent a cubic spline this way is to start off with a basis for a cubic polynomial (i.e. $x, x^2, x^3$), and then add one *truncated power function* per knot. A truncated power basis function can be defined as:
$$
h(x, \xi) = (x-\xi)^3_{+} = \begin{cases}
(x-\xi)^3 \text{ if } x>\xi \\
0 \text{ otherwise}
\end{cases}
$$

Essentially, to fit a cubic spline with $K$ knots, we perform least squares regression with an intercept and $K+3$ predictors -- $X, X^2, X^3, h(X, \xi_{1}), h(X, \xi_{2}), \dots, h(X, \xi_{K})$ -- where the $\xi$ terms are the knots.

### Natural Cubic Spline

One issue with splines is that they have high variance at the outer ranges of $X$. A *natural spline* addresses this by forcing the function to be linear at the boundaries (smaller than the smallest knot, larger than the largest knot).

We tend to choose the number of knots in the model via cross-validation. And we often just let whatever statistical software we're using choose the location of the knots, which is typically done uniformly -- i.e. if we have 3 knots, we'd place them at the 25th, 50th, and 75th percentiles of $X$.
## Smoothing Splines

A smoothing spline takes a slightly different approach to fitting a smooth curve to a set of data.

The goal is to have little error, i.e.
$$
RSS = \sum_{i=1}^n(y_{i}-g(x_{i}))^2
$$
should be small.

The approach that smoothing splines use for estimating $g$ is basically the same approach that [[regularized regression]] uses in that it calculates the RSS and then adds a penalty term. So the way we estimate $g$ is by minimizing:
$$
\sum_{i=1}^n(y_{i}-g(x_{i}))^ + \lambda \int g''(t)^2dt
$$
where $\lambda$ is a non-negative tuning parameter. The function $g$ that minimizes this is a *smoothing spline*.

The first part of this equation is just the residual sum of squares (i.e. the loss). The second part is the penalty term. By penalizing the integral of the second derivative (i.e. the sum of the rate of change of the rate of change over the range of $t$), we encourage the function to be less wiggly, with higher $\lambda$ values producing curves that are closer to linear. If we set $\lambda = \infty$, then we just get a linear regression. If $\lambda = 0$, on the other hand, we get a curve that perfectly interpolates all of the points in $X$.

In other words, $\lambda$ controls the [[Bias Variance Tradeoff|bias-variance tradeoff]]  (as is the case in regularized regression). And as is the case in regularized regression, we can choose $\lambda$ by using some sort of cross-validation strategy.

The function $g(x)$ that ends up minimizing the loss function above is actually a natural cubic spline with knots at $x_1, ..., x_n$.

While it might seem like this will have far too many degrees of freedom (estimating a knot at each $x_{i}$), we end up with far fewer *effective degrees of freedom* because many of the parameters are heavily constrained/shrunken.
