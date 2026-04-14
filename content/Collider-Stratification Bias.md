---
title: Collider-Stratification Bias
draft: false
date: 2026-04-14
tags:
  - methodology/causal_inference
---
Collider-stratification bias is a type of bias induced in [[Causal Inference|causal analysis]] when you condition on a collider.

The image below shows three variables: X, Y, and a collider.

![](https://upload.wikimedia.org/wikipedia/commons/c/c1/Collider%28statistics%29.png)

In this diagram, X and Y both *cause* the collider. The relationship between X and Y is unknown and is the estimate of interest (the extent to which X causes Y). If we fit a model that controls for the collider, our estimate of the effect of X on Y will be biased. 

It's helpful to think about this temporally. If X and Y both *cause* the collider, they must happen *before* the collider. Given this, the collider can't cause X or Y. But it will be correlated with both.

Here's an image that shows what this might look like in a plot (where `q` is the collider variable):
![](https://www.r-causal.org/chapters/04-dags_files/figure-html/fig-collider-scatter-1.png)