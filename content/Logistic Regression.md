---
title: Logistic Regression
draft: false
date: 2025-08-04
tags:
  - glm
  - stats
  - linear_model
  - classification
---
[Logistic Regression](https://en.wikipedia.org/wiki/Logistic_regression) is a statistical technique for predicting a binary outcome given a set of independent variables. It is a [[Generalized Linear Model]] that extends linear regression via a link function. In the case of logistic regression, the link function is the logit (sigmoid) function:
$$
\sigma(z) = \frac{1}{1+e^{-z}}
$$

where $z = X\beta$

In a logistic regression, we're predicting the probability, $p$, of an outcome, so the equations end up being:
$$
\text{logit}(p) = \ln\left( \frac{p}{1-p} \right)
$$
then
$$
\ln\left( \frac{p}{1-p} \right) = X\beta
$$
then
$$
p = \frac{1}{1+e^{-(X\beta)}}
$$
From this model, we can either generate probabilistic predictions, or we can assign predictions to `yes/no` categories by comparing the predicting probabilities to some threshold. Usually, we'll just use `p = .5` as the threshold, where cases with a predicted probability of greater than or equal to .5 are assigned to `yes`, and cases with a predicted probability of less than .5 are assigned to `no`, but this threshold can be set at any value.

## Model Fitting

The model coefficients for a logistic regression are typically estimated using [[Maximum Likelihood Estimation|maximum likelihood estimation]].

## Implementation in R

We can fit a logistic regression in [[R]] using the `glm()` function, like so:

```r
model <- glm(y ~ x1 + x2, data = my_data, family = binomial(link = "logit"))
```