---
title: Linear Regression
draft: false
date: 2026-02-10
tags:
  - stats/linear_model
  - stats/glm
---
Linear regression is a fundamental approach to both prediction and inference in statistical applications. It is one of the most basic models we can fit in a [[Supervised Learning|supervised learning]] context, and it is the basis for more advanced [[Generalized Linear Model|generalized linear models]].

Linear regression works by estimating the outcome variable as a linear combination of weighted input variables, e.g.
$$
y = \beta_{0} + \beta_{1}x_{1} + \beta_{2}x_{2} + \dots + \epsilon 
$$

or, in matrix notation
$$
\mathbf{y} = \mathbf{X}\mathbf{\beta} + \epsilon
$$
In the case where there is one predictor variable, this amounts to modeling the relationship between $y$ and $x$ as a straight line.

## Benefits

Although linear regression is a very simple model (relatively speaking), it still has several potential benefits and reasons why you might choose it over more complex models.

First, and probably most importantly, linear models are very easy to interpret. The $\beta$ parameters we estimate in linear regression models can be interpreted as the "effect" of the given predictor on the outcome after controlling for the effects of all other predictors. This interpretability makes linear models particularly compelling for estimating causal effects (although causal claims obviously require much more than a statistical model).

Linear regression is also useful in cases where we have a small sample size, where there's a low signal-to-noise ratio, or where we have sparse data.

## Bias and Variance

Linear regression is a high-bias/low-variance model (see the [[Bias Variance Tradeoff]]).  This means that the amount of structural error (caused by underfitting) is relatively high (*high bias*). On the other hand, the function $\hat{f}(x)$ is will change very little when exposed to new data, making the model very stable (*low variance*).

## Estimation

Least squares is one of the most common methods for estimating the $\beta$ parameters of a linear regression. This approach estimates the $\beta$ coefficients to minimize the residual sum of squares (RSS), e.g.:
$$
RSS(\beta) = \sum_{i=1}^N\left( y_{i}-\beta_{0}-\sum_{j=1}^px_{ij}\beta_{j} \right)
$$

or, in matrix notation,
$$
RSS(\beta) = (\mathbf{y} - \mathbf{X}\beta)^T(\mathbf{y}-\mathbf{X}\beta)
$$

Since this is a quadratic function, we can minimize it by taking the first derivative and setting it equal to 0:
$$
\mathbf{X}^T(\mathbf{y}-\mathbf{X}\beta) = 0
$$

which we can rewrite as:
$$
\hat{\beta} = (\mathbf{X}^T\mathbf{X})^{-1}(\mathbf{X}^T\mathbf{y})
$$

## Assumptions

Linear regression models assume the following:

1. **Linearity:** The relationship between $y$ and $X$ is linear in its parameters.
2. **Independence:** All observations are independent.
3. **Homoskedasticity:** Constant error variance. Another way to frame this is that errors are uncorrelated with the predictors.
4. **Normality:** Errors are normally distributed.