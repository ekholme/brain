---
title: Poisson Regression
draft: false
date: 2025-04-28
tags:
  - glm
  - stats
  - linear_model
---
[Poisson regression](https://en.wikipedia.org/wiki/Poisson_regression) is a regression used to model count data (i.e. when the dependent variable is a count of some occurrence). Poisson regression falls in the family of [[Generalized Linear Model|generalized linear models]] (GLMs). The canonical link function for Poisson regression is logarithm

## Poisson Distribution

Poisson regressions assume that the dependent variable is drawn from a Poisson distribution. The probability mass function for the Poisson distribution is:
$$
\frac{\lambda^ke^{-\lambda}}{k!}
$$

One of the features of the Poisson distribution is that the mean and the variance are both $\lambda$, i.e. they are equal. 

## Equation

The equation for a Poisson regression is given by:
$$
\log(E(Y|X)) = \beta' x
$$

where $\beta$ is a vector of coefficients and $x$ is a vector of predictor variables.

There are a few other ways to write this. The idea is the same as with any other linear model -- we're estimating the expected value of $Y$ conditioned on some $X$. To make the above clear that we're modeling $\lambda$ in a Poisson regression, we could write it as:
$$
\log(\lambda(X_1, \dots, X_{p})) = \beta_{0}+ \beta_{1}X_{1}+\dots+\beta_{p}X_{p}
$$

Or equivalently
$$
\lambda(X_{1},\dots,X_{p})= e^{\beta_{0}+ \beta_{1}X_{1}+\dots+\beta_{p}X_{p}}
$$

The parameters can be estimated using [[Maximum Likelihood Estimation]], where the likelihood equation is given by:
$$
\ell(\beta_{0}, \beta_{1}, \dots,\beta_{p}) = \prod_{i=1}^n\frac{e^{-\lambda(x_{i})}\lambda(x_{i})^{y_{i}}}{y_{i}!}
$$

## Implementation in R

Like other GLMs, we can fit a Poisson regression in [[R]] via the `glm()` function, e.g.
```r
mod <- glm(y ~ x1 + x2, data = my_data, family = poisson)
```
