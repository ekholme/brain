---
title: Bayes Classifier
draft: false
date: 2025-01-21
tags:
  - stats
  - bayesian
---
The [Bayes Classifier](https://en.wikipedia.org/wiki/Bayes_classifier) is a classifier that simply assigns an observation to the most likely class (the class with the highest probability), given some predictor values:
$$
Pr(Y = j|X = x_{o})
$$
In a binary classification problem, the Bayes classifier corresponds to predicting TRUE if
$$
Pr(Y=1|X=x_{o}) > 0.5
$$
where $x_0$ is a vector of predictors for a given observation.

One maybe not obvious wrinkle is that estimating the parameters of the Bayes Classifier doesn't require Bayesian methods.

## Naive Bayes

The [Naive Bayes Classifier](https://en.wikipedia.org/wiki/Naive_Bayes_classifier) is a flavor of the Bayes Classifier that assumes all predictors are independent of one another.

