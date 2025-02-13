---
title: Classification
draft: false
date: 2025-02-10
tags:
  - stats
---
In statistics, [classification](https://en.wikipedia.org/wiki/Statistical_classification) refers to using a model to try to estimate what class, or group, an observation might belong to. In classification models, the outcomes are discrete/categorical variables, whereas in regression models, the outcomes are continuous variables.

Some common classification models include:
- Logistic regression
- Multinomial logistic regression
- Linear discriminant analysis (LDA)
- Classifier variants of random forest and boosted tree models

## Logistic Regression

I'll use logistic regression in these notes to illustrate some more general ideas of classification models, such as model accuracy, sensitivity, and specificity

Logistic regression is a generalization of linear regression that constraints the outcome to be  $0 \leq p(X) \leq 1$

To do this, we use the logistic (or sigmoid) link function:


$$
p(X) = \frac{e^{\beta_{0} + \beta_{1}x + \dots}}{1 +e^{\beta_{0} + \beta_{1}x + \dots} }
$$
With some algebra, we can simplify this to *odds*:
$$
\frac{p(X)}{1-p(X)} = e^{\beta_{0}+\beta_{1}x+\dots}
$$

which we can then convert to log-odds (or logit):
$$
\log(\frac{p(X)}{1-p(X)})=\beta_{0}+\beta_{1}x + \dots
$$
So, logistic regression gives us a model that is linear in its inputs.

## Classifying Outcomes

We can use the probabilities produced by a logistic regression model (or some other classifier) to assign an observation to a class (e.g. `Yes` or `No`). The naive way to do this is by using the threshold $p > .5$. This threshold will minimize the error rate, but it doesn't take into account any other costs associated with classifying something as a `Yes` or `No`. For instance, if it is considerably costlier to classify something as a `Yes`, and we are willing to accept more false negatives, we might use a threshold of $p > .75$.

### Confusion Matrix


RESUME HERE

|       | No  | Yes | Total |
| :---: | :-: | :-: | :---: |
|  No   |     |     |       |
|  Yes  |     |     |       |
| Total |     |     |       |

*See p 148 of ISLR (159 of pdf)*

### Sensitivity and Specificity

TODO

### ROC

TODO