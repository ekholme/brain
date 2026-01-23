---
title: K Nearest Neighbors
draft: false
date: 2025-01-23
tags:
  - stats/algorithms
---
The [K Nearest Neighbors algorithm](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) is a non-parametric algorithm used in regression and classification models.

The idea is that, given a positive integer $K$, we can predict the outcome (class, numeric value, whatever) of an observation, $x_0$, by using the $K$ data points nearest to those of $x_0$. So, for example, if we want to estimate whether a person will default on a loan, and we can do so by looking at the historical records of the $K$ people who are most similar to them and seeing if those people defaulted on a loan.

In a classification setting, the mathematical notation for the KNN model is:
$$
Pr\left( Y = j|X=x_{0}\right) = \frac{1}{K}\sum_{i\subset N_{0}}I(y_{i} = j)
$$
where $N_{0}$ are the $K$ closest data points to $x_0$.

"Nearest" in the algorithm requires some way to operationalize distance between data points. There are different approaches, but a straightforward one for continuous metrics is [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance).

Another point is that the value of $K$ in these models is a hyperparameter that requires tuning. In general, smaller values will increase model variance (and probably lead to overfitting), whereas larger values will lead to underfitting.

