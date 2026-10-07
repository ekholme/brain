---
title: Item Information
draft: false
date: 2026-09-16
tags:
  - stats/psychometrics
  - stats/irt
---
In [[Item Response Theory]], Item Information quantifies the precision with which a given item measures a test-taker's latent ability, $\theta$.

In [[Classical Test Theory]], we assume that items are equally precise across all test-takers. In contrast, IRT measures precision as a function of ability. And item information tells you where along a continuum of ability a given item functions best (i.e. where it provides the most information).

Item Information is inversely related to standard error, i.e.
$$
SE(\theta) = \frac{1}{\sqrt{ I(\theta) }}
$$

Item information is tied to the metric of $\theta$. This means that item information is directly comparable across items on the same scale. For instance, an item with $I(0) = 1.0$ provides four times as much precision at $\theta = 0$ as an item with $I(0) = 0.25$.

Item information is also *additive*, so we can get test information by just summing all of the item information scores, i.e.:
$$
I_{test}(\theta) = \sum_{i=1}^NI_{i}(\theta)
$$
Because item information is additive, test information is directly comparable across tests. Test information is a function of both *item quality* and *test length.* A shorter test can outperform a longer test (i.e. provide more information) if its items have higher discrimination ($a$) parameters for a given $\theta$. One obvious corollary here is that this only applies to 2PL and 3PL items. Assuming items are equally-discriminating, longer tests will yield more test information. 
## Item Information Function
The Item Information Function is a curve that plots the item information across a range of values of $\theta$.

