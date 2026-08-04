---
title: Cronbach's Alpha
draft: false
date: 2026-08-04
tags:
  - stats/psychometrics
  - psychometrics/reliability
---
[Cronbach's alpha](https://en.wikipedia.org/wiki/Cronbach%27s_alpha) is a reliability coefficient and a measure of internal consistency of a test/scale. The formula for alpha is:
$$
\alpha = \frac{k}{k-1}\left( 1-\frac{\sum_{i=1}^k\sigma^2_{y_{i}}}{\sigma^2_{X}} \right)
$$
where
- $k$ is the number of items in the test/scale;
- $\sigma^2_{y_{i}}$ is the variance of each item; and
- $\sigma^2_{X}$ is the variance of the total (observed) scores

## Assumptions

1. **Tau Equivalence.** Alpha assumes that items in a test are tau equivalent, i.e. that they all measure the underlying trait equally well. Applying factor-analytic terms, this would assume that items have equal factor loadings. If this assumption is violated (which is almost always true in the real world), then alpha will underestimate reliability.
2. **Uncorrelated Errors.** Alpha assumes that errors between items are uncorrelated. The only correlation between items on the scale should be attributable to the underlying construct being measured. Residual correlations will inflate alpha.

Because these assumptions are rarely met in the real world, particularly the assumption of tau-equivalence, we should prefer alternative measures of reliability, such as [[McDonald's Omega]]