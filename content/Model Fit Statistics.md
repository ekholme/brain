---
title: Model Fit Statistics
draft: false
date: 2025-03-07
tags:
  - stats/model_assessment
---
Model fit statistics give us an indication of how well our statistical model fits our data. There are lots of different fit statistics depending on the type of model, but here are a few:

## Regression

### $R^2$

$R^2$ represents the proportion of the variation in the dependent variable that is explained by the model. Since it's a proportion, it ranges from 0 to 1, with higher values indicating better fit. The formula for $R^2$ is:
$$
R^2 = 1- \frac{\sum_{i}(y_{i}-\hat{y}_{i})^2}{\sum_{i}(y_{i}-\bar{y})^2}
$$

which is 1 - (residual sum of squares) / (total sum of squares)

### RMSE

The root mean squared error (RMSE) represents the average amount of error per observation. Since it represents the *amount* of error, lower values are better. The formula is:
$$
RMSE = \sqrt{\frac{1}{n}\sum(\hat{y}_{i}-y_{i})^2}
$$

## AIC and BIC

Akaike Information Criteroin (AIC) and Bayesian Information Criterion (BIC) are fit statistics that take model complexity into account. Essentially, they add in a penalty for more complex models -- similar to how [[Regularized Regression|regularized regression]] penalizes model coefficients.

It's helpful to penalize complexity if we're going to be assessing our models without using some sort of train/test split or cross-validation. This is because adding complexity will *always* improve model fit/accuracy/whatever on the training data, although this added complexity does not necessarily mean the model will perform better on unseen data.

### AIC

The AIC is defined for models fit by maximum likelihood and is given by:
$$
AIC = \frac{1}{n}(RSS + 2d\hat{\sigma}^2)
$$
where $RSS$ is the residual sum of squares, $d$ is the number of predictors in the model, and $\hat{\sigma}^2$ is the error variance.

### BIC

BIC is given by:
$$
BIC = \frac{1}{n}(RSS + \log(n)d\hat{\sigma}^2)
$$

The main difference here is that instead of using $2d\hat{\sigma}^2$ like AIC does in its penalty, BIC uses $\log(n)d\hat{\sigma}^2$. In practice, this will more-heavily-penalize models with more predictors. In other words, it places a higher priority on parsimony. 

### Adjusted $R^2$

Adjusted $R^2$ adjusts the $R^2$ statistic -- which will always increase when more variables are added -- to penalize model complexity. The formula is:
$$
Adjusted R^2 = 1 - \frac{\frac{RSS}{n-d-1}}{\frac{TSS}{n-1}}
$$

Where $n$ is the number of observations and $d$ is the number of predictors in the model.
## Accuracy

Accuracy is probably the most straightforward way to assess model quality for [[classification]] problems. It represents the percentage of cases where the predicted class is the true class, and it can be used in binary classification or in problems with multiple outcome classes.

The formula for accuracy is:
$$
\text{Accuracy} = \frac{\text{Correct Predictions}}{\text{Total Predictions}}
$$


## Structural Equation Modeling

TODO

