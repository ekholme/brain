---
title: Mean Squared Error (MSE)
draft: false
date: 2026-01-14
tags:
  - loss_function
  - stats
---
[Mean Squared Error (MSE)](https://en.wikipedia.org/wiki/Mean_squared_error) is one of the most common [[Loss Functions|loss functions]] for numerical problems. It represents the average (squared) error in a regression problem, where the error is the distance from the actual value $y_i$ to the predicted value $\hat{y}_i$.

MSE is given by:
$$
MSE = \frac{1}{N}\sum_{i=1}^N(y_{i}-\hat{y}_{i})^2
$$
One feature of MSE is that, due to the error values being squared, larger errors are penalized more (i.e. they contribute more to the overall MSE) than are smaller errors.

Note that since errors can be in the positive or negative direction (i.e. under-estimates or over-estimates), we need some way to incorporate the *magnitude* of the error into the loss function without accounting for the sign. Squaring the errors is a convenient way to do this. Another approach entails taking the absolute value.