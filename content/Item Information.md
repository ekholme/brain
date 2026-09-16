---
title: Item Information
draft: false
date: 2026-09-16
tags:
  - stats/psychometrics
  - stats/irt
---
In [[Item Response Theory]], Item Information quantifies the precision with which a given item measures a test-taker's latent ability, $\theta$.

In [[Classical Test Theory]], we assume that items are equally precise across all test-takers. In contrast, measures precision as a function of ability. And item information tells you where along a continum of ability a given item functions best (i.e. where it provides the most information).

Item Information is inversely related to standard error.

Item information is also *additive*, so we can get test information by just summing all of the item information scores, i.e.:
$$
I_{test}(\theta) = \sum_{i=1}^NI_{i}(\theta)
$$
