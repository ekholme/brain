---
title: Regularized Regression
draft: false
date: 2024-12-16
tags:
  - stats
  - linear_model
---
*Shrinkage methods* -- or regularization methods -- can considerably reduce the variance in coefficient estimates. The two most popular regularization techniques are *ridge regression* and the *lasso*
## Ridge Regression

When models are fit with OLS, they're fit to maximize the following equation:
$$
RSS = \sum_{i=1}^n(y_{i-\beta_{0}-\beta_{j}x_{ij}})^2
$$

Ridge regression attempts to minimize a slightly different quantity:
$$
RSS + \lambda \sum_{j=1}^p\beta^2_{j}
$$

where $\lambda \geq 0$  is a tuning parameter. When $\lambda = 0$, there is no penalty applied. When $\lambda \to \infty$ , the $\beta$ estimates will approach 0. The modeler is responsible for choosing the appropriate value of $\lambda$, and usually the best way to do this is through cross-validation -- comparing the cross-validated loss of models fit with different values of $\lambda$.

*Note that the shrinkage penalty is not applied to the intercept term!*

To conceptualize the *amount* of parameter shrinkage, we can use 
$$
\lvert \lvert \hat{\beta}^R_{\lambda} \rvert  \rvert _{2} / \lvert \lvert \hat{\beta} \rvert  \rvert_{2} 
$$

where $\lvert \lvert \hat{\beta} \rvert  \rvert_{2}$ refers to the l2 norm of a vector, which is define as:
$$
\lvert \lvert \beta \rvert  \rvert_{2} = \sqrt{\sum_{j=1}^p\beta_{j}^2}
$$

This ratio is just the ratio of the regularized coefficient norms to the unregularized coefficient norms. We'll get a value of 1 when $\lambda = 1$, since the "penalized" coefficients will be the same as the non-penalized coefficients, yielding a ratio of 1.

Ridge regression coefficient estimates are dependent on the scale of the predictor variables. So, we should apply ridge regression to standardized predictors.

### Why Does This Help?

The benefits of ridge regression are due to the [[Bias Variance Tradeoff]] -- shrinking the parameters toward 0 increases the bias but decreases the variance. Selecting an appropriate value of $\lambda$ will ideally result in a model that optimizes this tradeoff so that bias increases *slightly* while variance decreases *significantly*.

## LASSO

TODO