---
title: Cross Validation
draft: false
date: 2025-02-25
tags:
  - stats/resampling
  - stats/model_assessment
---
*Note: much of this is notes from my reading of [ISLR](https://www.statlearning.com/)*

[Cross validation](https://en.wikipedia.org/wiki/Cross-validation_(statistics)) is an improvement over the simple training-set/validation-set approach to assessing model performance. In the basic train/validation set approach, we split our sample once, fit a model on the training set, and assess its performance on the validation set. The two biggest drawbacks of this approach are:

1. The estimate of the test error rate can vary depending on what observations are included in the training vs validation sets.
2. When we split the data, we're reducing our number of training observations, and in doing so potentially fitting a worse model. This can, in turn, overestimate the error in the validation set.

## Leave One Out Cross Validation

*Leave one out cross validation* (LOOCV) is basically the opposite approach. A model is fit on all of the sample observations except $i$, then the test error is assessed on observation $i$. The model is then re-fit on all observations except $i+1$, etc. In a sample of $n$ observations, this results in $n$ models being fit and $n$ assessments of error. The test error estimate ends up just being the average of the $n$ error estimates.

This approach has less bias than the train/validation approach, but it can be computationally expensive with large $n$.

## K-Fold Cross Validation

*k-Fold Cross-Validation* is usually a more tractable approach that involves splitting the data into $k$ "folds" (subsets) of approximately equal size. A model is fit on all $k-1$ folds, then the test error is estimated on the held-out fold. This process is then repeated $k$ times. And the final test error estimate is, once again, just the average of the $k$ error estimates.

In practice, $k$ is typically set to 5 or 10.

Another benefit of k-fold cross validation is that, although LOOCV produces very unbiased estimates of test error, the test error estimate has higher variance than does the test error resulting from k-fold. So, the k-fold approach will produce slightly more biased test error estimates, but there will be considerably less variance in these estimates.