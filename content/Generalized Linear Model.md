---
title: Generalized Linear Model (GLM)
draft: false
date: 2025-04-28
tags:
  - stats/glm
  - stats/linear_model
---
[Generalized linear models (GLMs)](https://en.wikipedia.org/wiki/Generalized_linear_model) are statistical models that are, as the name suggests, generalizations of the ordinary linear model where
$$
Y=\beta_{0}+\beta_{1}x_{1}+\dots+\beta_px_{p}=X\beta
$$

One of the assumptions of the linear model is that each $y_i$ is drawn from a normal distribution, so what we're actually predicting in the equation above is:
$$
E(Y|X)=X\beta
$$

where $E(Y|X)$ is the mean of the normal distribution.

GLMs allow us to fit models that are linear in their predictors but where the assumptions of an ordinary linear model may not be appropriate, including this assumption of normality but also other assumptions. For instance, linear models assume a linear relationship between predictors and response values across the entire domain of $X$, but this obviously can lead to implausible predicted responses. Or linear models can lead to predicted probabilities above 1 or below 0, if we try to use them to predict probabilities.

GLMs address this issue by allowing us to assume the dependent variables are drawn from arbitrary distributions (limited to those in the exponential family) rather than only a normal distribution. This works by specifying some link function that transforms the mean of the dependent variable to be a linear function of the predictors. 

If we denote this function as $\eta$, then we can write a GLM as:
$$
\eta(Y|X)=X\beta
$$

Sometimes, rather than transforming the dependent variable, we want to transform the independent variables, so we can use the inverse link function instead:
$$
(Y|X)=\eta^{-1}(X\beta)
$$
## Examples

The link functions for the linear, logistic, and Poisson regression are:

### Linear
$$
\eta(\mu) = \mu
$$
i.e. the identity function

### Logistic
$$
\eta(\mu)=\log\left( \frac{\mu}{1-\mu} \right)
$$
i.e. the logit (sigmoid) function
### Poisson
$$
\eta(\mu)=\log(\mu)
$$
i.e. the log link
