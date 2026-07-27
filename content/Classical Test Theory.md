---
title: Classical Test Theory
draft: false
date: 2024-11-21
tags:
  - stats/psychometrics
---
## What is Classical Test Theory?

Classical test theory (CTT) is an approach to estimating a latent trait (e.g. math aptitude, attitude toward writing) that uses a measure (test) to estimate a person's amount of that trait. It's often contrasted with [[Item Response Theory]].

The idea of CTT is expressed in the very basic equation:

$$
X = T + \epsilon
$$

Or, a person's score, $X$ on a test is their true score, $T$, plus some error, $\epsilon$. The error is assumed to be normally distributed with a mean of 0.

## Core Concepts

### Item Difficulty
In the CTT paradigm, item difficulty is the proportion of examinees who get the item correct. It's actually a measure of item easiness (since high values indicate that most people get the item correct).

Although there might be reasons to include some very hard or very easy items in a test, it's generally beneficial for items to be around $p = 0.5$. Items with difficulty $p < 0.2$ or $p > 0.8$ probably should be reviewed.

### Item Discrimination
Item discrimination measures how well an item differentiates between high- and low-performing examinees. We typically use the point-biserial correlation as a measure of item discrimination. This is the Pearson correlation between examinees' scores on a single item and their overall score on the test. It can be calculated as:
$$
r_{pb}=\frac{\bar{X}_{1}-\bar{X}_{0}}{S_{X}}\sqrt{p_{j}(1-p_{j})}
$$

where:
- $\bar{X}_1$ is the average score for people who got the item correct;
- $\bar{X}_0$ is the average score for people who got the item incorrect;
- $S_X$ is the standard deviation of the total test scores
- $p_j$ is the item difficulty

*note that when we calculate the average test scores, we should exclude the item for which we are calculating discrimination in these scores. Leaving that item in will bias the estimates.*

Rules of thumb for interpreting item discrimination estimates:

| **Discrimination ($r_{pb}$)** | **Quality Evaluation** | **Action**                                                                                            |
| ----------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------- |
| **$\ge 0.40$**                | Excellent              | Keep item                                                                                             |
| **$0.30 - 0.39$**             | Good                   | Little to no revision needed                                                                          |
| **$0.20 - 0.29$**             | Marginal               | Needs improvement/review                                                                              |
| **$< 0.20$**                  | Poor                   | Eliminate or rewrite                                                                                  |
| **Negative ($< 0.00$)**       | Defective              | **Major red flag:** High scorers are missing it, low scorers are guessing correctly (often miskeyed). |

In CTT, item discrimination tends to peak when item difficulty is around $p = 0.5$, since this provides the maximum variability. If items are extremely hard or extremely easy, the variance ($p(1-p)$) is near zero, which will make the discrimination low.