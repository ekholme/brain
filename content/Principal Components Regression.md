---
title: Principal Components Regression
draft: false
date: 2026-01-30
tags:
  - stats/glm
  - stats/unsupervised_learning
---

Principal components regression is an extension of [[Principal Component Analysis (PCA)]]. It takes the components created in PCA and plugs them into a linear regression model (or some other form of regression model).
For instance, after we estimate the $Z$ values (i.e. the PC values), we can plug them into a linear regression, e.g.:

$$
y_{i} = \beta_{1}Z_{1} + \beta_{2}Z_{2} + \dots + \epsilon
$$

The logic behind principal components regression is that, often, only a few principal components can explain most of the variability in the data, and so we can get better results by fitting a model with fewer predictors.

Not surprisingly, PCR performs best when the first few principal components account for most of the variance in the predictors. If we need lots of PCs to get to a sufficient amount of the variance in $X$, then shrinkage methods like [[Regularized Regression#Ridge Regression|ridge regression]] or [[Regularized Regression#LASSO|Lasso]] will work better.

