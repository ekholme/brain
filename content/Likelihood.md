---
title: Likelihood
draft: false
date: 2024-12-12
tags:
  - stats
  - probability
---
In statistics, a [likelihood](https://en.wikipedia.org/wiki/Likelihood_function), or likelihood function, provides a quantitative measure of how well a statistical model explains a given set of data. It does this by calculating the probability of seeing that data under various parameter values of the model. This approach can help us estimate parameters of a model, as is the case in [[Maximum Likelihood Estimation]].

Likelihood is basically the inverse of probability. Consider the following function:

$$
f(x | \theta)
$$
If we think of this as a function of $x$ with $\theta$ fixed, then this is a typical probability function. It will tell us the probability of some outcome as a function of a random variable, $x$ and fixed model parameters, $\theta$.

On the other hand, if we think of it as a function of $\theta$ with $x$ fixed, it is a likelihood function. That is, it will tell us about the likelihood of the data given some fixed $x$.

The likelihood function in this case is often written as
$$
L(\theta|x)
$$

One simple way to think about likelihood is as follows:

*Given that X happened, what is the likelihood that Model Y is true?*

And if we adopt this explanation of likelihood/likelihood functions, we can see that this offers us a tool for comparing models and selecting the best model with a given set of data.