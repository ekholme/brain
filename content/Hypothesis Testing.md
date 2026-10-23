---
title: Hypothesis Testing
draft: false
date: 2026-10-23
tags:
  -
---
Hypothesis testing -- or null hypothesis significance testing (NHST) -- is a statistical approach for asserting a claim is true by testing whether we can, with some degree of certainty, reject what is essentially the complement of the claim we want to make.

One of the most common forms of this is revolves around claiming some intervention has an effect. To do this, we pose a null hypothesis that the actual effect is 0, i.e. $\beta_1 = 0$. We then conduct some statistical analysis to test this hypothesis. Commonly, these tests are conducted using a frequentist approach. We might fit a linear regression model and get *p-values* for each of our betas. These *p-values* represent the probability of observing a parameter estimate at least this extreme, assuming the null hypothesis is true. Lower *p-values* provide stronger evidence to reject the null hypothesis. If there's only a 0.001% probability of observing our effect assuming the null is true, then we can reasonably claim that the intervention is effective.

This framework can be generalized to tons of statistical models and parameter estimates and is not limited to linear regressions.

In the NHST realm, we technically never accept the alternative hypothesis (that our intervention works); rather, we reject the null hypothesis. This may be true statistically, but in practice, papers will write up results as if they prove the alternative hypothesis.

There are plenty of problems with and criticisms of this approach. One relates to the "Big World/Small World" problem (per Richard McElreath). The estimates correspond to the "small world" of the model you've defined. We want to apply them to the "big world" (i.e. the real world). There's no guarantee that we can generalize from the small world to the big world -- there's no guarantee that our model appropriately represents the real world. 
