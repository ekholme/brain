---
title: Linear Discriminant Analysis
draft: false
date: 2025-02-13
tags:
  - stats
---
[Linear Discriminant Analysis](https://en.wikipedia.org/wiki/Linear_discriminant_analysis) (LDA) is a [[Classification|classification]] model. The basic idea of LDA is that it assumes, for each class $k$, that $f_k(X)$ is normal (in the case of $p$ = 1) or multivariate normal (if $p > 1$).

That is,
$$
X \sim \mathcal{N}(\mu_{k}, \Sigma)
$$
In LDA, the mean vectors $\mu_k$ differ for each class, but we assume the same covariance matrix $\Sigma$ across *all classes*.

To estimate $\mu_k$, we simply take the sample means of each predictor in each class $k$.

To estimate $\Sigma$, we take the weighted average of the sample covariance matrices for each of the $k$ classes.

Once we have estimate of these parameters, we assign an observation $X=x$ to the most likely class, i.e. the class for which
$$
\delta_{k}(x) = x^T\Sigma^{-1}\mu_{k} - \frac{1}{2}\mu^T_{k}\Sigma^{-1}\mu_{k} + \log \pi_{k}
$$

is the largest, where $\pi_k$ is the prior probability (base rate) for class $k$.