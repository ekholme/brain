---
title: Variance Inflation Factor (VIF)
draft: false
date: 2025-09-08
tags:
  - stats/model_assessment
---
The [Variance Inflation Factor (VIF)](https://en.wikipedia.org/wiki/Variance_inflation_factor) is a metric that can be used to diagnose multicollinearity in regression models. The VIF can be estimated for each beta coefficient in a model, and it represents the extent to which a given coefficient is inflated due to multicollinearity. The formula for estimating VIF is:
$$
VIF_{j} = \frac{1}{1-R^2_{j}}
$$
where $R^2_j$ is the $R^2$ value for the regression of $X_j$ on all other predictors in the model. For instance, if we have
$$
y = \beta_{0} + \beta_{1}X_{1} + \beta_{2}X_{2} + \dots + \beta_{k}X_{k} + \epsilon
$$
then we could estimate the VIF for $\beta_1$ via
$$
X_{1} =\beta_{0} + \beta_{2}X_{2} + \dots + \beta_{k}X_{k} + \epsilon  
$$
then taking the $R^2$ from that model and plugging it into the VIF formula above. 

## Why does this matter?

If the predictors in a model are highly correlated, it makes the beta coefficients unstable. Or, put differently, it means they have *high variance* (see e.g. the [[Bias Variance Tradeoff]]). High VIFs also mean the standard errors of coefficients will be larger.

Finally, a high VIF makes your model hard to interpret. Typically, we interpret coefficients from a regression model by assuming that the coefficient represents the "effect" of the predictor while holding all other predictors constant. But if variables are highly correlated, it's difficult to interpret one while holding everything else constant, since they all move together.

## Interpretation

The lower bound for the VIF is 1, which corresponds to a variable being completely uncorrelated with others.

A VIF < 5 is generally acceptable. A VIF between 5 and 10 is probably cause for some concern and warrants addressing. A VIF greater than 10 signifies very high multicollinearity.

## Ways to Address Multicollinearity

We can address multicollinearity in multiple ways, including feature selection (e.g. using [[Regularized Regression|regularized regression]]) or dimension reduction (e.g. [[Principal Component Analysis (PCA)|PCA]]) methods.