---
title: Maximum Likelihood Estimation
draft: false
date: 2024-12-12
tags:
  - algorithms
  - stats
  - math
---
## What is Maximum Likelihood Estimation?

[Maximum Likelihood Estimation](https://en.wikipedia.org/wiki/Maximum_likelihood_estimation) is a way to estimate some parameter(s) of a probability distribution, given a set of data. The gist of MLE is, like the name suggests, that the best estimate of a given set of parameters is the one that maximizes a [[Likelihood|likelihood]] function. 

We often use it to estimate parameters of statistical models.

## How it Works -- Linear Regression

For any given model, we can construct a [[Likelihood|likelihood]] function that basically tells us, given the observed data, how good is the model. I.e. how well do the parameters of this model fit. In the case of a (multiple) linear regression, these would be our $\beta$ coefficients.

The process works like this:

1. Estimate some starting $\beta$ parameters. These starting values don't have to be perfect, because the point of the process is to optimize them. 

2. Estimate $\hat{y}$ for our starting betas, e.g.
$$
\hat{y} = X*\beta
$$

3. For each observation, calculate the residual:
$$
\varepsilon_{i} = \hat{y}_{i}-y_{i}
$$

4. Assume a distribution for the residuals. In a linear regression, we assume that the residuals will be normally distributed with $\mu = 0$ and some $\sigma$. The value of $\sigma$ will depend on the scale of your data, but if the data is standardized, then 1 is reasonable.
5. For each residual, calculate the probability density function under the assumed distribution. We usually just get the computer to do this for us, since any stats software will have these PDFs already. But, FWIW, the normal PDF is:
$$
f(\varepsilon_{i}) = (1 / \sqrt{ 2\pi \sigma^2 } )* \exp(-\varepsilon_{i}^2 / 2\sigma^2)
$$
6. Calculate the loglikelihood by summing the probabilities of the likelihoods. We use the loglikelihood rather than the regular likelihood because calculating the likelihood requires taking the product of all of the residuals, whereas the loglikelihood only requires summing, since $log(a*b) = \log(a) + \log(b)$. Doing this much multiplication, especially with small probabilities, can be computationally unstable.
$$
\log(L) = \sum \log(f(\varepsilon_{i}))
$$
7. Next, in practice, we often want to take the negative loglikelihood, since many optimizers seek to *minimize* a loss function, and taking the minimum negative loglikelihood is equivalent to taking the maximum likelihood.

This is how we calculate the loglikelihood given a model (a set of parameters) and a dataset. We can then use some optimizer/optimizing algorithm to find the minimum negative loglikelihood and return the parameters ($\beta$s, in this case) that yield this value.

## Worked Example

Here's [a link to a worked example, in Julia](https://leakybrain.ericekholm.com/stats/mle_lm).