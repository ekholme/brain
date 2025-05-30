---
title: Gini Index
draft: false
date: 2025-05-28
tags:
  - stats
---
When building classifier decision trees, the Gini index is a metric used to determine the best way to split data at a given node. It is given by:
$$
G = \sum_{k=1}^K\hat{p}_{mk}(1-\hat{p}_{mk})
$$
where $\hat{p}_{mk}$ is the probability of observations in the $m$th region that are class $K$.

The Gini index will be small if all $\hat{p}_{mk}$ are close to 1 or 0. The Gini index is also sometimes referred to as a measure of *node purity*, since a small value indicates that the node mostly contains observations from a single class.