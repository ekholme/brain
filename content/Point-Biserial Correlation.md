---
title: Point-Biserial Correlation
draft: false
date: 2026-11-18
tags:
  - stats
---
The point-biserial correlation is a special case of [[Pearson's Correlation]] intended for measuring the strength of the relationship between a continuous variable and a binary variable. The formula for calculating it is:
$$
r_{pb} = \frac{\bar{X}_{1}-\bar{X}_{0}}{S_{x}}\sqrt{ p(1-p) }
$$

where:
- $\bar{X}_1$ is the average score on X (the continuous variable) for observations coded as 1 on the binary variable
- $\bar{X}_0$ is the average score on X for observations coded as 0 on the binary variable;
- $S_X$ is the standard deviation of X across all observations
- $p$ is the proportion of observations coded as 1 on the binary variable

Like Pearson's correlation coefficient, $r_{pb}$ ranges from -1 to 1.