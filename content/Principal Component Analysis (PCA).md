---
title: Principal Component Analysis
draft: false
date: 2025-03-25
tags:
  - stats
  - unsupervise_learning
---
[Principal Component Analysis (PCA)](https://en.wikipedia.org/wiki/Principal_component_analysis) is a technique for reducing the dimensions of a matrix, $X$. The first principal component ($Z_1$) is the linear combination that captures the most variance in the data; the second principal component ($Z_2$) is the linear combination that captures the next most variance in the data, subject to the constraint that $Z_2$ is orthogonal to (uncorrelated with) $Z_1$, etc.

The plot below shows an example of 2-dimensional data, with the lines demonstrating the directions of the principal components.

![Image from Wikipedia](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/GaussianScatterPCA.svg/800px-GaussianScatterPCA.svg.png)

You can have as many principal components as there are predictors in a dataset, but one of the goals of PCA is to reduce the dimensions of the data, so we typically want fewer components than there are predictors.

Imagine we have 2-dimensional data. $Z_1$ would be the linear combination that, if we projected the 2-dimensional data onto a line, would maximize the variance of $Z_1$. We can describe this projection via weights (or loadings). For instance, to get $Z_1$, we could do:
$$
Z_{1} = \phi_{11}(x_{1i}-\bar{x_{1}}) + \phi_{21}(x_{2i}-\bar{x}_{2}) 
$$

where the $\phi$ values are the loadings.

We tend to use PCA when we have many highly-correlated predictors $p$, and so reducing the number of predictors in the model to $M$ where $M \ll p$  can reduce the variance of the model.

One thing to keep in mind is that PCA is a *dimension reduction technique*, it is not a *feature selection technique*. This is because, when we construct the principal components, every feature in our dataset, $X$, contributes to these components.

When estimating principal components, it's helpful for all predictors in $X$ to be standardized.

## Principal Components Regression

We could stop at just reducing the dimensions of $X$ and use PCA as an exploratory technique, but we often proceed to plug these PCs into some sort of model, such as a linear regression model. For instance, after we estimate the $Z$ values (i.e. the PC values) as shown above, we can plug them into a linear regression, e.g.:

$$
y_{i} = \beta_{1}Z_{1} + \beta_{2}Z_{2} + \dots + \epsilon
$$

The logic behind principal components regression is that, often, only a few principal components can explain most of the variability in the data, and so we can get better results by fitting a model with fewer predictors.

Not surprisingly, PCR performs best when the first few principal components account for most of the variance in the predictors. If we need lots of PCs to get to a sufficient amount of the variance in $X$, then shrinkage methods like ridge regression or LASSO will work better.