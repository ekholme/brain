---
title: Boosted Trees
draft: false
date: 2025-06-04
tags:
  - machine_learning
  - stats/tree_based_models
---
[Boosting](https://en.wikipedia.org/wiki/Gradient_boosting) is another ensemble method where we use multiple trees to predict some outcome. Unlike random forests or bagging, though, boosting requires trees to be grown sequentially.

In the boosting algorithm, we fit a tree to predict some outcome, $y$. We then take the residuals and fit another tree to predict those residuals. We repeat this process -- continuing to predict residuals -- until we fit $B$ trees, where $B$ is a user-specified hyperparameter.

Boosting models have 3 tuning parameters:
1. $B$, the number of trees to be fit. Note that unlike random forests, boosted tree models can overfit if $B$ is too large.
2. $\lambda$, the learning rate (or penalty). This scales down the contribution of each tree to the overall prediction. Typical values are 0.01 or 0.001. Smaller values of $\lambda$ generally mean we'll need  more trees to get good predictions.
3. $d$, the number of splits each tree is allowed. Because boosted trees work sequentially, we can use a small $d$ and still get good predictions, since each tree effectively contains the information in previous trees. A model comprised entirely of stumps ($d$ = 1) can be very strong if $B$ is large enough.