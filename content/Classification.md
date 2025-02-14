---
title: Classification
draft: false
date: 2025-02-14
tags:
  - stats
---
In statistics, [classification](https://en.wikipedia.org/wiki/Statistical_classification) refers to using a model to try to estimate what class, or group, an observation might belong to. In classification models, the outcomes are discrete/categorical variables, whereas in regression models, the outcomes are continuous variables.

Some common classification models include:
- Logistic regression
- Multinomial logistic regression
- [[Linear Discriminant Analysis]] (LDA)
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

We can use the probabilities produced by a logistic regression model (or some other classifier) to assign an observation to a class (e.g. `Yes` or `No`) based on some threshold. The most straightforward way to do this is by using the threshold $p > .5$, at least for a binary classification problem. This threshold will minimize the error rate, but it doesn't take into account any other costs associated with classifying something as a `Yes` or `No`. For instance, if it is considerably costlier to classify something as a `Yes`, and we are willing to accept more false negatives, we might use a threshold of $p > .75$.

### Confusion Matrix

A confusion matrix provides us with a tabular way to look at predictions vs ground truth in training data. The columns in the table represent the ground truth -- `Yes` and `No` in this case, and the rows represent the predictions.

The diagonals show correct predictions, while the off-diagonals show incorrect predictions.

The table below is taken from [Introduction to Statistical Learning](https://www.statlearning.com/), p. 148, and represents 10k predictions from an LDA model attempting to predict whether people would default on a loan.

|       |  No  | Yes | Total |
| :---: | :--: | :-: | :---: |
|  No   | 9644 | 252 | 9896  |
|  Yes  |  23  | 81  |  104  |
| Total | 9667 | 333 | 10000 |


### Sensitivity and Specificity

The confusion matrix above can also give us some additional information about *sensitivity* and *specificity*.

**Sensitivity** refers to the percentage of truths that are correctly identified -- in this case, this would be the percentage of people who defaulted that the model correctly identifies:
$$
\frac{81}{333} = 0.243
$$

**Specificity** refers to the percentage of "falses" or "no's" that are correctly identified -- in this case, this would be the percentages of people who did not default that the model correctly identifies:
$$
\frac{9644}{9667} = 0.997
$$

Most classification models, by default, try to maximize overall accuracy -- the percentage of observations correctly classified. In cases such as this one, where defaulting is infrequent (only ~3% of the total observations were defaults in this dataset), the best strategy for maximizing overall accuracy is to predict mostly `No Default`. Which means the model will probably have a high specificity and a low sensitivity.

One way to address this is to change the threshold for which we assign an observation to `Yes` or `No`. If we want better sensitivity, we can lower the threshold. Or if we want better specificity, we can raise the threshold.

Generally, there's a tradeoff between sensitivity and specificity, such that working to improve one will often worsen the other. 
### ROC Curve

The ROC Curve is a way to visualize the tradeoff between sensitivity and specificity. It shows the false positive rate (the x axis) plotted against the true positive rate for all possible thresholds. The ideal ROC Curve hugs the left and the top of the plot.

![](https://commons.wikimedia.org/wiki/File:Roc_curve.svg#/media/File:Roc_curve.svg)

The area under the curve (AUC) provides a summary of model performance across all possible thresholds. A perfect AUC is 1.0. An AUC of 0.5 means that the model performs no better than randomly guessing.